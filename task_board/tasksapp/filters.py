from django_filters import rest_framework as filters
from .models import Project, Task


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TaskFilter(filters.FilterSet):
    created_date = filters.DateFromToRangeFilter()

    class Meta:
        model = Task
        fields = ['project', 'created_date']
