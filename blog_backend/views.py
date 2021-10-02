from rest_framework import serializers
from blog_backend.models import Articles
from django.http.response import HttpResponse
from django.shortcuts import render
from .serializers import HomeSerializer,UserSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

def homeView(request):
    
    return HttpResponse("Home")

# class HomeViewSet(ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Articles.objects.all()
#     serializer_class = HomeSerializer
#     authentication_classes=(TokenAuthentication,)

class HomeViewSet(ViewSet):
    permission_classes=[IsAuthenticated]
    authentication_classes=(TokenAuthentication,)
    
    
    
    def list(self, request):
        aricles = Articles.objects.all().order_by('-added')
        serializer = HomeSerializer(aricles, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def create(self, request):
        serializer = HomeSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':'Created'},status=status.HTTP_201_CREATED)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):
        article = Articles.objects.get(id=pk)
        serializer = HomeSerializer(article)
        return Response({'data':serializer.data},status=status.HTTP_200_OK)
        


    def update(self, request, pk=None):
        article = Articles.objects.get(id=pk)

        serializer = HomeSerializer(article,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':'Created'},status=status.HTTP_201_CREATED)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        article = Articles.objects.get(id=pk)

        serializer = HomeSerializer(article,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':'Created'},status=status.HTTP_201_CREATED)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        article = Articles.objects.get(id=pk)
        article.delete()
        return Response({'data':'deleted'})
        
            
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
