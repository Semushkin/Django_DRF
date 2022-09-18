import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from usersapp.models import User
from todoapp.models import ToDo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(ObjectType):
    #hello =graphene.String(default_value='HI!')
    all_users = graphene.List(UserType)
    all_todo = graphene.List(ToDoType)
    all_project = graphene.List(ProjectType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_todo(self, info):
        return ToDo.objects.all()

    def resolve_all_project(self, info):
        return Project.objects.all()

schema = graphene.Schema(query=Query)
