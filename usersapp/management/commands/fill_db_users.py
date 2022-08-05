import json
from django.core.management.base import BaseCommand

from usersapp.models import User
from usersapp.serializers import UserModelSerializer


def load_from_json(file_name):
    with open(file_name, mode='r', encoding='utf-8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser(username='Superuser', email='Admin@mail.ru', password='1')
        users = load_from_json('usersapp/fixtures/users.json')

        for user in users:
            us = user.get('fields')
            User.objects.create_user(username=us['username'],
                                     first_name=us['first_name'],
                                     last_name=us['last_name'],
                                     email=us['email'],)
