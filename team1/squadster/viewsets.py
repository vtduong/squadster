#from django.shortcuts import get_object_or_404

from .serializers import *
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response

from .models import *

class UserViewSet(viewsets.ViewSet):
    
    def create(self, request):
        serializer = SquadsterUserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            return Response({"status":"success"})
        else:
            return Response(serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST)


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    
    def create(self, request):
        
        
        
        serializer = EventSerializer(data=request.data)
        
        if serializer.is_valid():
            event = serializer.save()
            print(event)
            return Response({"status":"success"})
        else:
            return Response(serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)
    
    
    def get_queryset(self):
        user = self.request.user
        print(user)
        queryset = Event.objects.all()
        return queryset
    