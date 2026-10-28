
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Hostel

class HostelAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.hostel = Hostel.objects.create(
            name="Sunrise Hostel",
            location="Eldoret",
            price=5000,
            gender="Mixed",
            rooms="Both",
            availability=5,
            distance="1 km",
            amenities=["WiFi", "Water"],
            description="A comfortable student hostel."
        )

    def test_hostel_list(self):
        response = self.client.get("/api/hostels/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Sunrise Hostel")

    def test_hostel_detail(self):
        response = self.client.get(f"/api/hostels/{self.hostel.id}/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Sunrise Hostel")


class RegistrationAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_registration(self):
        response = self.client.post(
            "/api/hostels/register/",
            {
                "username": "student_test",
                "email": "student@example.com",
                "password": "StrongTestPassword123!"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(
            User.objects.filter(username="student_test").exists()
        )

class AuthenticationAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="profile_student",
            email="profile@example.com",
            password="StrongTestPassword123!"
        )

    def test_user_login(self):
        response = self.client.post("/api/hostels/login/",
            {
                "username": "profile_student",
                "password": "StrongTestPassword123!"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.data)

    def test_profile_requires_authentication(self):
        response = self.client.get("/api/hostels/profile/")

        self.assertEqual(response.status_code, 401)

    def test_authenticated_student_can_view_profile(self):
        from rest_framework.authtoken.models import Token

        token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {token.key}"
        )

        response = self.client.get("/api/hostels/profile/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data["username"],
            "profile_student"
        )

from datetime import date, timedelta

class BookingAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.student = User.objects.create_user(
            username="booking_student",
            email="booking@example.com",
            password="StrongTestPassword123!"
        )

        self.owner = User.objects.create_user(
            username="hostel_owner",
            email="owner@example.com",
            password="StrongTestPassword123!"
        )

        self.hostel = Hostel.objects.create(
            owner=self.owner,
            name="Booking Test Hostel",
            location="Eldoret",
            price=5000,
            gender="Mixed",
            rooms="Both",
            availability=3
        )

        from rest_framework.authtoken.models import Token
        token, created = Token.objects.get_or_create(
            user=self.student
        )
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {token.key}"
        )

    def test_booking_creation_reduces_availability(self):
        response = self.client.post(
            "/api/hostels/bookings/",
            {
                "hostel": self.hostel.id,
                "full_name": "Test Student",
                "email": "booking@example.com",
                "phone": "0712345678",
                "national_id": "12345678",
                "gender": "Male",
                "university": "Test University",
                "registration_number": "TEST001",
                "room_type": "Single",
                "move_in_date": (
                    date.today() + timedelta(days=7)
                ).isoformat(),
                "payment_method": "Bank",
                "payment_reference": "TEST-REF-001"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 201)

        self.hostel.refresh_from_db()
        self.assertEqual(self.hostel.availability, 2)

    def test_student_can_cancel_pending_booking(self):
        from .models import Booking

        booking = Booking.objects.create(
            student=self.student,
            hostel=self.hostel,
            room_type="Single",
            move_in_date=date.today() + timedelta(days=7)
        )

        response = self.client.patch(
            f"/api/hostels/bookings/{booking.id}/cancel/"
        )

        self.assertEqual(response.status_code, 200)

        booking.refresh_from_db()
        self.hostel.refresh_from_db()

        self.assertEqual(booking.status, "Rejected")
        self.assertEqual(self.hostel.availability, 4)


class OwnerBookingAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.owner1 = User.objects.create_user(
            username="owner_one",
            password="StrongTestPassword123!"
        )
        self.owner2 = User.objects.create_user(
            username="owner_two",
            password="StrongTestPassword123!"
        )
        self.student = User.objects.create_user(
            username="booking_student_two",
            password="StrongTestPassword123!"
        )

        self.hostel1 = Hostel.objects.create(
            owner=self.owner1,
            name="Owner One Hostel",
            location="Eldoret",
            price=5000,
            gender="Mixed",
            rooms="Both",
            availability=3
        )

        self.hostel2 = Hostel.objects.create(
            owner=self.owner2,
            name="Owner Two Hostel",
            location="Eldoret",
            price=6000,
            gender="Mixed",
            rooms="Both",
            availability=3
        )

        from rest_framework.authtoken.models import Token
        token, created = Token.objects.get_or_create(user=self.owner1)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")

    def test_owner_can_view_own_bookings(self):
        response = self.client.get("/api/hostels/owner/bookings/")

        self.assertEqual(response.status_code, 200)

    def test_owner_cannot_manage_another_owners_booking(self):
        from .models import Booking

        booking = Booking.objects.create(
            student=self.student,
            hostel=self.hostel2,
            room_type="Single"
        )

        response = self.client.patch(f"/api/hostels/bookings/{booking.id}/manage/", {"status": "Approved"}, format="json")

        self.assertEqual(response.status_code, 403)

        booking.refresh_from_db()
        self.assertEqual(booking.status, "Pending")
