from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Hostel
from .serializers import HostelSerializer

@api_view(['GET'])
def hostel_list(request):
    hostels = Hostel.objects.all()
    serializer = HostelSerializer(hostels, many=True)

    return Response(serializer.data)