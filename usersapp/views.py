from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import User
from .serializers import UserModelSerializer
from rest_framework.permissions import BasePermission


'''
class SuperUserOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser
'''


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    #permission_classes = [SuperUserOnly]
