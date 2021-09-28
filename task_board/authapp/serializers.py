from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['pk', 'username', 'first_name', 'last_name', 'email']


class UserSerializerLong(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['pk', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']
