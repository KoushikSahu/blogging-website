from django.http import HttpResponseRedirect, Http404
from django.contrib.auth.models import User, AnonymousUser
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, PostSerializer
from .models import BlogPost
import json

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllPostList(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = BlogPost.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        queryset = BlogPost.objects.get(pk=request.data['key'])
        queryset.delete()
        return Response('Deleted post')

@api_view(['GET', 'POST'])
def UserAllPosts(request):

    if request.method == "GET":
        if isinstance(request.user, AnonymousUser):
            return Response('Error', status=Http404)
        else:
            usr_name = str(request.user.username)
            querylist = BlogPost.objects.filter(author__username=usr_name)
            serializer = PostSerializer(querylist, many=True)
            return Response(serializer.data)

    elif request.method == "POST":
        if isinstance(request.user, AnonymousUser):
            return Response('Error', status=Http404)
        else:
            post_data = request.data
            post_data['author'] = request.user.pk
            serializer = PostSerializer(data=post_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response('Error... Invalid data!')
