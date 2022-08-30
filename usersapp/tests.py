from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .models import User
from .views import UserModelViewSet
from todoapp.models import Project, ToDo


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.user_dict = {
            'username': 'Ivan10',
            'email': 'ivan10@mail.ru',
            'password': '1'
        }
        self.user_dic2 = {
            'username': 'Ivan11',
            'email': 'ivan11@mail.ru',
            'password': '1'
        }
        self.user_dict_update = {
            'username': 'Ivan12',
            'email': 'ivan12@mail.ru',
            'password': '1'
        }
        self.login = 'Superuser'
        self.password = '1'
        self.admin = User.objects.create_superuser(self.login, 'Superuser@mail.ru', self.password)
        self.format = 'json'
        self.user = User.objects.create(**self.user_dict)

    def test_factory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_create_quest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.user_dict, format=self.format)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_factory_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.user_dic2, format=self.format)
        force_authenticate(request, self.admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_api_client_detail(self):
        # APIClient
        client = APIClient()
        response = client.get(f'{self.url}{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_update_quest(self):
        # APIClient
        client = APIClient()
        response = client.put(f'{self.url}{self.user.id}/', self.user_dict_update, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_update_admin(self):
        # APIClient
        client = APIClient()
        client.force_authenticate(user=self.admin)
        response = client.put(f'{self.url}{self.user.id}/', self.user_dict_update, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertEqual(self.user.username, self.user_dict_update.get('username'))
        self.assertEqual(self.user.email, self.user_dict_update.get('email'))

        client.logout()

    def tearDown(self) -> None:
        pass


class TestProject(APITestCase):
    def setUp(self) -> None:
        self.url_project = '/api/projects/'
        self.url_users = '/api/users/'
        self.user_dict = {
            'username': 'Ivan10',
            'email': 'ivan10@mail.ru',
            'password': '1'
        }
        self.user_dict_new = {
            'username': 'Ivan12',
            'email': 'ivan12@mail.ru',
            'password': '1'
        }
        self.login = 'Superuser'
        self.password = '1'
        self.admin = User.objects.create_superuser(self.login, 'Superuser@mail.ru', self.password)
        self.format = 'json'
        self.user = User.objects.create(**self.user_dict)

    def test_api_test_case_list(self):
        response = self.client.get(self.url_project)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_test_case_update_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(f'{self.url_users}{self.user.id}/', self.user_dict_new)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, self.user_dict_new.get('username'))
        self.client.logout()

    def test_mixer(self):
        user = mixer.blend(User)
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(f'{self.url_users}{user.id}/', self.user_dict_new)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertEqual(user.username, self.user_dict_new.get('username'))
        self.client.logout()


    def tearDown(self) -> None:
        pass
