from django.urls import path
from . import views

urlpatterns = [
    path("", views.hostel_list, name='hostel-list'),
    path("<int:pk>/", views.hostel_detail, name='hostel-detail'),
    path("register/", views.register_user, name='register-user'),
    path("login/", views.login_user, name='login-user'),
    path("profile/", views.student_profile, name='student-profile'),
    path("bookings/", views.create_booking, name='create-booking'),
]