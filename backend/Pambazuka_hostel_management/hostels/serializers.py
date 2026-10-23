from rest_framework import serializers
from .models import Hostel
from .models import Booking

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields =['id', 'hostel', 'room_type', 'move_in_date', 'special_requests', 'status', 'date_booked']
        read_only_fields = ['id', 'status', 'date_booked']