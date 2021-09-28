# Generated by Django 3.2.6 on 2021-09-26 15:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasksapp', '0002_alter_project_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='username',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]