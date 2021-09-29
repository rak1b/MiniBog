from .models import Articles
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
class HomeSerializer(ModelSerializer):
    class Meta:
        model = Articles
        fields = '__all__'
        
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')
    
    def create(self, validated_data):
        
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user