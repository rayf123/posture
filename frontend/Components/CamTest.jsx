import React, { useEffect, useRef } from 'react';

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const pcRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/webrtc/'); // 127.0.0.1
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
      if (remoteVideoRef.current) {  // Check if the ref is attached
          if (remoteVideoRef.current.srcObject !== event.streams[0]) {
              remoteVideoRef.current.srcObject = event.streams[0];  // Attach remote stream
              console.log("Received remote video stream");
          }
      } else {
          console.error("Remote video element is not available");
      }
    };

    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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
    
  }, []);

    return (
      <div>
          <h1>WebRTC Test</h1>
          <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "300px", border: "1px solid black" }}
          />
          <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: "300px", border: "1px solid black" }}
          />
      </div>
  );
}

export default App;