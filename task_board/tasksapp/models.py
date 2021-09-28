from django.db import models
from django.contrib.auth import get_user_model


class Project(models.Model):
    username = models.ManyToManyField(get_user_model())
    name = models.CharField(max_length=250, verbose_name='название проекта')
    link = models.URLField(verbose_name='ссылка на проект', blank=True)

    class Meta:
        verbose_name = "проект"
        verbose_name_plural = "проекты"


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    text = models.TextField(verbose_name='текст заметки')
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='время добавления')
    updated_date = models.DateTimeField(auto_now=True, verbose_name='время обновления')

    class Meta:
        verbose_name = "заметка"
        verbose_name_plural = "заметки"

        ordering = ['-created_date']
