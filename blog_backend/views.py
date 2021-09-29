from blog_backend.models import Articles
from django.http.response import HttpResponse
from django.shortcuts import render
from .serializers import HomeSerializer,UserSerializer
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User

def homeView(request):
    
    return HttpResponse("Home")

class HomeViewSet(ModelViewSet):
    queryset = Articles.objects.all()
    serializer_class = HomeSerializer
    

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer