# webrtc_app/routing.py

from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/webrtc/', consumers.WebRTCConsumer.as_asgi()),
    
]
