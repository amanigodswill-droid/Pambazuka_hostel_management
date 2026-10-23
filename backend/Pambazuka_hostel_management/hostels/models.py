from django.db import models
from django.contrib.auth.models import User

class Hostel(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Mixed', 'Mixed'),
    ]
    ROOM_CHOICES = [
        ('Single', 'Single'),
        ('Shared', 'Shared'),
        ('Both', 'Single and Shared'),
    ]

    name = models.CharField(max_length=150)
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    rooms = models.CharField(max_length=10, choices=ROOM_CHOICES)
    availability = models.PositiveIntegerField(default=0)
    distance= models.CharField(max_length=100, blank=True)
    amenities = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='hostels/', blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    ROOM_TYPE_CHOICES = [
        ('Single', 'Single'),
        ('Shared', 'Shared'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='bookings')
    room_type = models.CharField(max_length=10, choices=ROOM_TYPE_CHOICES)
    move_in_date = models.DateField()
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    date_booked = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.student.username} for {self.hostel.name}"