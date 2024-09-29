from aiortc import MediaStreamTrack
from av import VideoFrame

import posture

class VideoTransformer(MediaStreamTrack):

  def __init__(self, track):
    super().__init__()
    self.track = track

  async def recv(self):
    frame = await self.track.recv()
    img = frame.to_ndarray(format = "bgr24")

    frame_nd = posture.process_frame(img)

    new_frame = VideoFrame.from_ndarray(frame_nd, format = "bgr24")
    new_frame.pts = frame.pts
    new_frame.time_base = frame.time_base

    return new_frame # real frame
  