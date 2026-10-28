from django.urls import path
from .views import hostel_list, hostel_detail, register_user, login_user, student_profile, create_booking, cancel_booking, manage_booking, create_hostel, manage_hostel, request_password_reset, reset_password, owner_bookings

urlpatterns = [
    path("", hostel_list, name='hostel-list'),
    path("<int:pk>/", hostel_detail, name='hostel-detail'),
    path("register/", register_user, name='register-user'),
    path("login/", login_user, name='login-user'),
    path("profile/", student_profile, name='student-profile'),
    path("bookings/", create_booking, name='create-booking'),
    path("bookings/<int:pk>/cancel/", cancel_booking, name="cancel-booking"),
    path("bookings/<int:pk>/manage/", manage_booking, name="manage-booking"),
    path("create/", create_hostel, name="create-hostel"),
    path("<int:pk>/manage/", manage_hostel, name="manage-hostel"),
    path("password-reset/", request_password_reset, name="password-reset"),
    path("password-reset/confirm/", reset_password, name="password-reset-confirm"),
    path("owner/bookings/", owner_bookings, name="owner-bookings"),

]