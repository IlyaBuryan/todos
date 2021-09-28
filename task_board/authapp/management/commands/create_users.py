from django.core.management.base import BaseCommand
from authapp.models import CustomUser


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('number', type=int)

    def handle(self, *args, **options):
        number = options['number']
        for i in range(1, number + 1):
            user = CustomUser.objects.create_user(username=f'username_{i}',
                                                  first_name=f'first_name_{i}',
                                                  last_name=f'last_name_{i}',
                                                  email=f'email_{i}@mail.ru',
                                                  password='geekbrains')
            print(f'{user} создан')
