from rest_framework import viewsets, permissions
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from .filters import ProjectFilter, TaskFilter
from .paginators import ProjectLimitOffsetPagination, TaskLimitOffsetPagination


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filter_class = ProjectFilter


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    pagination_class = TaskLimitOffsetPagination
    filter_class = TaskFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
