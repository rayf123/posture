import json

# from channels.generic.websocket import AsyncWebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer

from aiortc import RTCPeerConnection, RTCSessionDescription, RTCIceCandidate
import logging
import VideoTransformer

logger = logging.getLogger(__name__)


class WebRTCConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("WebRTCConsumer: connect method called")
        try:
            self.pc = RTCPeerConnection()
            print("RTCPeerConnection initialized")
            await self.accept()
            print("WebSocket connection accepted")
        except Exception as e:
            logger.error(f"Exception in connect: {e}")
            await self.close()
        @self.pc.on("track")
        def on_track(track):
            print(f"Received track: {track.kind}")
            new_frame = VideoTransformer(track).recv()
            self.pc.addTrack(new_frame)

    async def disconnect(self, close_code):
        print(f"WebSocket disconnected with code: {close_code}")
        await self.pc.close()
        print("RTCPeerConnection closed")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)

            if data["type"] == "offer":
                # Handle SDP offer from the client
                print("Handling SDP offer")
                offer = RTCSessionDescription(sdp=data["sdp"], type=data["type"])
                await self.pc.setRemoteDescription(offer)
                print("Set remote description with offer")

                # Create and send SDP answer
                answer = await self.pc.createAnswer()
                await self.pc.setLocalDescription(answer)
                await self.send(
                    text_data=json.dumps(
                        {"type": "answer", "sdp": self.pc.localDescription.sdp}
                    )
                )
                print("Sent SDP answer")

            elif data["type"] == "candidate":
                print("Handling ICE candidate")
                cand = data["candidate"]
                sdp = cand["candidate"]
                bits = sdp.split()
                assert len(bits) >= 8

                candidate = RTCIceCandidate(
                    component=int(bits[1]),
                    foundation=bits[0],
                    ip=bits[4],
                    port=int(bits[5]),
                    priority=int(bits[3]),
                    protocol=bits[2],
                    type=bits[7],
                    sdpMid=cand["sdpMid"],
                    sdpMLineIndex=cand["sdpMLineIndex"],
                )
                await self.pc.addIceCandidate(candidate)
        except Exception as e:
            logger.error(f"Exception in receive: {e}")
            await self.close()
