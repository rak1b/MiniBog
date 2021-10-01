from django.db.models import base
from django.urls import path,include
from .views import homeView,HomeViewSet,UserViewSet
from rest_framework import routers

router = routers.DefaultRouter()
  
# define the router path and viewset to be used
router.register(r'home', HomeViewSet,basename='home'),
router.register(r'users', UserViewSet,basename='users')
  
# specify URL Path for rest_framework
urlpatterns = [
    path('api/', include(router.urls)),
    # path('', include('rest_framework.urls'))
]

