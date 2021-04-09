from channels.generic.websocket import AsyncWebsocketConsumer
import json
class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print(self.scope['user'])
        self.room_name = self.scope['url_route']['kwargs']['chat_room']
        self.group_name = 'chat_' + self.room_name
        await self.channel_layer.group_add(self.group_name,self.channel_name)
        await self.accept()
    async def disconnect(self,close_code):
        await self.channel_layer.group_discard(self.group_name,self.channel_name)
    async def receive(self,text_data):
        data = json.loads(text_data)
        message = data['message']
        username = data['username']
        print('hello: '+str(message))
        await self.channel_layer.group_send(self.group_name,{
            'type':'send_group_message',
            'message':message,
            'username':username
        })
    async def send_group_message(self,event):
        await self.send(text_data=json.dumps({
            'message':event['message'],
            'username':event['username']
            
            }))