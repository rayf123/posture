# webrtc_app/consumers.py

import json
# from channels.generic.websocket import AsyncWebsocketConsumer
from channels.generic.websocket import WebsocketConsumer
from aiortc import RTCPeerConnection
import logging

logger = logging.getLogger(__name__)

"""
class WebRTCConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        logger.info("WebRTCConsumer: connect method called")
        try:
            self.pc = RTCPeerConnection()
            logger.info("RTCPeerConnection initialized")
            await self.accept()
            logger.info("WebSocket connection accepted")
        except Exception as e:
            logger.error(f"Exception in connect: {e}")
            await self.close()

    async def disconnect(self, close_code):
        logger.info(f"WebSocket disconnected with code: {close_code}")
        await self.pc.close()
        logger.info("RTCPeerConnection closed")

    async def receive(self, text_data):
        logger.info(f"Received message: {text_data}")
        # Handle messages here
"""

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