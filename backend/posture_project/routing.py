# webrtc_project/asgi.py

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
import posture_app.routing  

import json
from channels.generic.websocket import WebsocketConsumer
from aiortc import RTCPeerConnection
import logging

from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'posture_project.settings')
django_asgi_app = get_asgi_application()

class WebRTCConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    def disconnect(self, close_code):
        pass
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': AllowedHostsOriginValidator(
        URLRouter([
            path('ws/webrtc/', WebRTCConsumer.as_asgi())
        ])
    )
})

"""
application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': URLRouter(
        posture_app.routing.websocket_urlpatterns
    ),
})
"""
