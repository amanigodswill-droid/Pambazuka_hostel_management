
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
