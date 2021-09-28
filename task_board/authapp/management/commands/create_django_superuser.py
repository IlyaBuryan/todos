from django.core.management.base import BaseCommand
from authapp.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = 'django'
        user = CustomUser.objects.create_superuser(username=f'{username}',
                                                   first_name=f'first_name_{username}',
                                                   last_name=f'last_name_{username}',
                                                   email=f'email_{username}@mail.ru',
                                                   password='geekbrains')
        print(f'{user} создан')
