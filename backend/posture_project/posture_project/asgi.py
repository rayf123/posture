# webrtc_project/asgi.py

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import posture_app.routing  

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'posture_project.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': URLRouter(
        posture_app.routing.websocket_urlpatterns
    ),
})
