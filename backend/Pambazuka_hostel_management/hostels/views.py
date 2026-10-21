from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Hostel
from .serializers import HostelSerializer

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

