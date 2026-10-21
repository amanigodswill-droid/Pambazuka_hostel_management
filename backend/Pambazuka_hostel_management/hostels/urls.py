from django.urls import path
from . import views

urlpatterns = [
    path("", views.hostel_list, name='hostel-list'),
    path("<int:pk>/", views.hostel_detail, name='hostel-detail'),
]