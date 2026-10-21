from django.db import models

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