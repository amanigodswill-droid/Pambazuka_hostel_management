from rest_framework import serializers
from .models import Hostel
from .models import Booking

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'
        read_only_fields = ['owner']

class BookingSerializer(serializers.ModelSerializer):
    hostel_name = serializers.CharField(source='hostel.name', read_only=True)
    amount = serializers.DecimalField(source='hostel.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'hostel', 'hostel_name', 'amount', 'full_name', 'email', 'phone', 'national_id', 'gender', 'university', 'registration_number', 'room_type', 'move_in_date', 'status', 'date_booked', 'payment_status', 'payment_method', 'mpesa_phone', 'payment_reference']
        read_only_fields = [ 'id', 'status', 'date_booked', 'payment_status']

    def validate_move_in_date(self, value):
        from django.utils import timezone

        if value <timezone.localdate():
           raise serializers.ValidationError("Move-in date cannot be in the past.")

        return value