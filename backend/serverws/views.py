from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
# Create your views here.
def index(request):
    return render(request,'serverws/index.html')

def room(request,chat_room):
    user = authenticate(request, username='badr', password='badr')
    login(request,user)
    return render(request,'serverws/room.html',{
        'room_name':chat_room
    })