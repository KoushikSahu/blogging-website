from django.db import models
from django.conf import settings

class BlogPost(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    post = models.TextField()
    datetime_posted = models.DateTimeField(auto_now=True)
    datetime_modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username} post {self.pk}'