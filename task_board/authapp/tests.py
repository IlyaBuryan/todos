from django.contrib.auth import get_user_model
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status

from authapp.views import UserViewSet


class TestUserViewSet(TestCase):

    def test_user_authorization(self):
        factory = APIRequestFactory()
        request = factory.get('api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_list(self):
        user = mixer.blend(get_user_model())
        factory = APIRequestFactory()
        request = factory.get('api/users/')
        force_authenticate(request, user)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('email', response.content.decode())
