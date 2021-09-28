import jwt
from django.test import TestCase
from mixer.backend.django import mixer

from task_board import settings
from .models import Project, Task
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status

OBTAIN_TOKEN_DATA = {
    "username": "user",
    "password": "geekbrains"
}

OBTAIN_ADMIN_TOKEN_DATA = {
    "username": "admin",
    "password": "geekbrains"
}


class TestToken(TestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        get_user_model().objects.create_user(username='user', password='geekbrains', email='dsf@mail.ru')

    def test_obtain_token(self):
        client = APIClient()
        response = client.post("/api/token/", OBTAIN_TOKEN_DATA)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'refresh', status_code=status.HTTP_200_OK)
        self.assertContains(response, 'access', status_code=status.HTTP_200_OK)


class TestProjects(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        mixer.cycle(3).blend(Project)
        get_user_model().objects.create_user(username='user', password='geekbrains', email='dsf@mail.ru')
        get_user_model().objects.create_superuser(username='admin', password='geekbrains', email='dsfs@mail.ru')

    def test_projects_list(self):
        response = self.client.get('/api/todos/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.post("/api/token/", OBTAIN_TOKEN_DATA)
        access_token = response.data['access']
        response = self.client.get('/api/todos/projects/', HTTP_AUTHORIZATION=f"Bearer {access_token}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 3)

    def test_projects_create_forbidden(self):
        response = self.client.post("/api/token/", OBTAIN_TOKEN_DATA)
        access_token = response.data['access']
        response = self.client.post('/api/todos/projects/',
                                    data={"name": "test_project"},
                                    HTTP_AUTHORIZATION=f"Bearer {access_token}")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_projects_create_admin(self):
        response = self.client.post("/api/token/", OBTAIN_ADMIN_TOKEN_DATA)
        access_token = response.data['access']
        token = jwt.decode(access_token, key=settings.SECRET_KEY, algorithms="HS256")
        response = self.client.post('/api/todos/projects/',
                                    data={"username": f"{token['user_id']}", "name": "test_project"},
                                    HTTP_AUTHORIZATION=f"Bearer {access_token}")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestTasks(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        mixer.cycle(10).blend(Task)
        get_user_model().objects.create_user(username='user', password='geekbrains', email='dsf@mail.ru')

    def test_tasks_list(self):
        response = self.client.get('/api/todos/tasks/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.post("/api/token/", OBTAIN_TOKEN_DATA)
        access_token = response.data['access']
        response = self.client.get('/api/todos/tasks/', HTTP_AUTHORIZATION=f"Bearer {access_token}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 10)

    def test_tasks_create_forbidden(self):
        response = self.client.post("/api/token/", OBTAIN_TOKEN_DATA)
        access_token = response.data['access']
        response = self.client.post('/api/todos/tasks/',
                                    data={"name": "test_project"},
                                    HTTP_AUTHORIZATION=f"Bearer {access_token}")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
