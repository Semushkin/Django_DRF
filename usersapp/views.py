from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(GenericViewSet, ListAPIView, RetrieveAPIView, UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
