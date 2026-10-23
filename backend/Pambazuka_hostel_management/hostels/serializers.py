from rest_framework import serializers
from .models import Hostel
from .models import Booking

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'
        read_only_fields = ['owner']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields =['id', 'hostel', 'room_type', 'move_in_date', 'special_requests', 'status', 'date_booked', 'payment_status', 'payment_method', 'payment_reference']
        read_only_fields = ['id', 'status', 'date_booked', 'payment_status']