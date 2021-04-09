from . import views
from django.urls import path

urlpatterns = [
    path('',views.index,name='index'),
    path('<str:chat_room>',views.room,name='room')
]