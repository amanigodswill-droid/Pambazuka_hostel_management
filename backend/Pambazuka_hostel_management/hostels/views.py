from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Hostel, Booking
from .serializers import HostelSerializer, BookingSerializer
from .user_serializer import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

@api_view(['GET'])
def hostel_list(request):
    hostels = Hostel.objects.all()
    location = request.query_params.get('location')
    gender = request.query_params.get('gender')
    rooms= request.query_params.get('rooms')
    if location:
        hostels = hostels.filter(location=location)
    if gender:
        hostels = hostels.filter(gender=gender)
    if rooms:
        hostels = hostels.filter(rooms=rooms)
    serializer = HostelSerializer(hostels, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def hostel_detail(request, pk):
    try:
        hostel = Hostel.objects.get(pk=pk)
    except Hostel.DoesNotExist:
        return Response({"error": "Hostel not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = HostelSerializer(hostel)
    return Response(serializer.data)

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message":"Login Successful", "token": token.key, "user_id":user.id, "username":user.username})
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def student_profile(request):
    user = request.user
    if request.method== 'GET':
        return Response({'user_id':user.id, 'username':user.username, 'email':user.email})
    email = request.data.get('email')
    if not email:
        return Response({'error':'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exclude(id=user.id).exists():
        return Response({'error':'This email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
    user.email=email
    user.save()    
    return Response({"user_id": user.id, "username": user.username, "email": user.email})

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_booking(request):
    if request.method == 'GET':
        bookings = Booking.objects.filter(student=request.user).order_by('-date_booked')
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
    required_fields = ['hostels', 'full_name', 'email', 'phone', 'national_id', 'gender', 'university', 'registration_number', 'room_type', 'move_in_date', 'payment_method',]
    for field in required_fields:
        if not request.data.get(field):
            return Response({'error': f'{field} is required'}, status=status.HTTP_404_BAD_REQUEST)
    payment_method = request.data.get('payment_method')
    payment_reference = request.data.get('payment_reference', '').strip()
    mpesa_phone = request.data.get('mpesa_phone','').strip()

    if payment_method not in['Mpesa', 'Bank']:
        return Response({'error':'Choose M-pesa or Bank as the payment method.'}, status=status.HTTP_400_BAD_REQUEST)
    if payment_method =='Mpesa':
       if not mpesa_phone or not payment_reference:
          return Response({'error':'M-Pesa phone number and transaction code are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if payment_method =='Bank' and not payment_reference:
        return Response({'error':'Bank transaction reference is required.'}, status=status.HTTP_400_BAD_REQUEST)
     
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(student=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])  
@permission_classes([IsAuthenticated])
def student_bookings(request):
    bookings = Booking.objects.filter(student=request.user).order_by('-date_booked')
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def cancel_booking(request, pk):
    try:
        booking = Booking.objects.get(pk=pk, student=request.user)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

    if booking.status != 'Pending':
        return Response({"error": "Only pending bookings can be cancelled"}, status=status.HTTP_404_BAD_REQUEST)
    
    booking.status = 'Rejected'
    booking.save()
    serializer = BookingSerializer(booking)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_hostel(request):
    serializer = HostelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def manage_hostel(request,pk):
    try:
        hostel = Hostel.objects.get(pk=pk, owner=request.user)
    except Hostel.DoesNotExist:
        return Response({"error": "Hostel not found or you are not the owner"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = HostelSerializer(hostel, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        hostel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def request_password_reset(request):
    email = request.data.get('email','').strip()

    if not email:
       return Response({'error':'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    users = User.objects.filter(email__iexact=email, is_active=True)

    for user in users:
      uid = urlsafe_base64_encode(force_bytes(user.pk))
      token = default_token_generator.make_token(user)
      reset_link = (f"http://localhost:5173/#/reset-password/" f"?uid={uid}&token={token}")

      send_mail('Pambazuka Hostel Management Password Reset',f'Use this link to reset your password: {reset_link}', settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False,)

    return Response({'message': (
            'If an account exists for that email, '
            'password recovery instructions have been sent.'
        )})


@api_view(['POST'])
def reset_password(request):
    uid = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    if not uid or not token or not new_password:
        return Response({'error': 'UID, token and new password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id, is_active=True)
    except (ValueError, TypeError, OverflowError, User.DoesNotExist):
        return Response({'error': 'Invalid or expired reset link.'}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, token):
        return Response({'error': 'Invalid or expired reset link.'}, status=status.HTTP_400_BAD_REQUEST)

    from django.contrib.auth.password_validation import validate_password
    from django.core.exceptions import ValidationError

    try:
        validate_password(new_password, user=user)
    except ValidationError as error:
        return Response({'error': list(error.messages)}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({
        'message': 'Password reset successfully.'
    })