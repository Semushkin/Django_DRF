from django.db import models
from usersapp.models import User

# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=30)
    link = models.URLField()
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'Заметка {self.user} по проекту {self.project}'
