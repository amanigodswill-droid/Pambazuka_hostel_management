from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Hostel
from .serializers import HostelSerializer
from .user_serializer import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

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

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def student_profile(request):
    user = request.user
    return Response({"user_id": user.id, "username": user.username, "email": user.email})