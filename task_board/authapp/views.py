from rest_framework import viewsets
from .models import CustomUser
from .serializers import UserSerializer, UserSerializerLong
from rest_framework import mixins


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserSerializerLong
        return UserSerializer
