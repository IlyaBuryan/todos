from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TaskLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20
