// src/App.js
import React, { useEffect, useRef } from 'react';

function App() {
  const localVideoRef = useRef(null);
  const pcRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/webrtc/'); // 127.0.0.1
    socketRef.current = socket;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    pcRef.current = pc;

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      if (message.type === 'answer') {
        // Set the remote description with the answer
        const remoteDesc = new RTCSessionDescription({
          type: 'answer',
          sdp: message.sdp,
        });
        await pc.setRemoteDescription(remoteDesc);
        console.log('Remote description set with answer');
      } else if (message.type === 'candidate') {
        // Add the received ICE candidate
        const candidate = new RTCIceCandidate(message.candidate);
        await pc.addIceCandidate(candidate);
        console.log('ICE candidate added:', candidate);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        socket.send(
          JSON.stringify({
            type: 'candidate',
            candidate: event.candidate.toJSON(),
          })
        );
      }
    };

    pc.ontrack = (event) => {
      console.log('Received remote track:', event.streams);

      // If you want to display the remote video, you can add a video element
      // and set its srcObject to event.streams[0]
    };

    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Now that we've added the tracks, create an offer
        await createOffer();
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    }

    async function createOffer() {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socket.send(
          JSON.stringify({
            type: 'offer',
            sdp: offer.sdp,
          })
        );

        console.log('Offer sent:', offer);
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }

    getMedia();

    return () => {
      pc.close();
      socket.close();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>WebRTC Client</h1>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '600px', border: '1px solid black' }}
      />
    </div>
  );
}

export default App;
