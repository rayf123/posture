"use client";
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import React from 'react'



const VideoCall = () => {
    const [socket, setSocket] = useState(null)
    const videoRef = useRef(null)
    const peerConnection = useRef(null)
  
    useEffect(() => {
      const newSocket = io('http://localhost:8000')
      setSocket(newSocket)
  
      return () => newSocket.close()
    }, [])
  
    useEffect(() => {
      if (socket) {
        socket.on('offer', handleOffer)
        socket.on('ice-candidate', handleIceCandidate)
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
          socket.emit('ice-candidate', event.candidate)
        }
      }
  
      const offer = await peerConnection.current.createOffer()
      await peerConnection.current.setLocalDescription(offer)
      socket.emit('offer', offer)
    }
  
    const handleOffer = async (offer) => {
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await peerConnection.current.createAnswer()
      await peerConnection.current.setLocalDescription(answer)
      socket.emit('answer', answer)
    }
  
    const handleIceCandidate = (candidate) => {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate))
    }
  
    return (
      <div>
        <video ref={videoRef} autoPlay playsInline />
        <button onClick={startCall}>Start Call</button>
      </div>
    )
  }

export default VideoCall


// pages/index.js

