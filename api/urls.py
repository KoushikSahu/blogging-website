from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from .views import current_user, UserList

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('auth-token/', obtain_jwt_token),
]