import graphene as gr
from graphene_django import DjangoObjectType
from tasksapp.models import Project, Task
from authapp.models import CustomUser


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class Query(gr.ObjectType):
    all_projects = gr.List(ProjectType)
    all_tasks = gr.List(TaskType)
    users_by_project_id = gr.Field(ProjectType, id=gr.Int(required=True))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_tasks(root, info):
        return Task.objects.all()

    def resolve_users_by_project_id(root, info, id):
        return Project.objects.filter(pk=id).first()


schema = gr.Schema(query=Query)

"""
Запрос для проверки:
{
  allProjects {
    id
    name
    username {
      id
      username
    }
  }
  allTasks {
    id
    text
  }
  usersByProjectId(id: 6) {
    username {
      id
      firstName
      lastName
    }
  }
}
"""
