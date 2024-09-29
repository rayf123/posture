"use client";
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import React from 'react'



const VideoCall = () => {
    const [socket, setSocket] = useState(null)
    const videoRef = useRef(null)
    const peerConnection = useRef(null)
  
    useEffect(() => {
      const newSocket = new WebSocket('ws://localhost:8000/ws')
      setSocket(newSocket)
  
      return () => newSocket.close()
    }, [])
  
    useEffect(() => {
      if (socket) {
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data)
          if (message.type === 'answer') {
            handleAnswer(message)
          } else if (message.type === 'ice-candidate') {
            handleIceCandidate(message.candidate)
          }
        }
      }
    }, [socket])
  
    const startCall = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      videoRef.current.srcObject = stream
  
      peerConnection.current = new RTCPeerConnection()
  
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream)
      })
  
      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          socket.send(JSON.stringify({
            type: 'ice-candidate',
            candidate: event.candidate
          }))
        }
      }
  
      const offer = await peerConnection.current.createOffer()
      await peerConnection.current.setLocalDescription(offer)
      socket.send(JSON.stringify({
        type: 'offer',
        sdp: offer.sdp
      }))
    }
  
    const handleAnswer = (answer) => {
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer))
    }
  
    const handleIceCandidate = (candidate) => {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate))
    }
  
    return (
      <div>
        <video ref={videoRef} autoPlay playsInline />
        <button onClick={startCall} className='p-1 border rounded-lg '>Start Call</button>
      </div>
    )
  }

export default VideoCall


// pages/index.js

