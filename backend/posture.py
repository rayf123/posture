import math
import mediapipe as mp
import cv2
import numpy as np

# class Posture():

#   def __init__(self, calibration_frames=0, max_calibration_frames=100, chest_offset=10, sloutch_threshold=0.9):
#     self.needs_calibration=True
#     self.calibration_frames=calibration_frames
#     self.max_calibration_frames=max_calibration_frames
#     self.avg_nose_chest_dist=0
#     self.cali_nose_chest_lengths=[]
#     self.chest_offset=chest_offset
#     self.sloutch_threshold=sloutch_threshold
#     self.consecutive_slouch_frames=0
#     self.pose = mp.solutions.pose.Pose(static_image_mode = False)
#     self.mp_pose = mp.solutions.pose


pose=mp.solutions.pose.Pose(static_image_mode = False)
mp_pose = mp.solutions.pose

cali_nose_chest_lengths = []

def process_frame(frame, 
                  calibration_frames=0, max_calibration_frames=100, chest_offset=10, sloutch_threshold=0.9):
  h, w, _ = frame.shape
  pose_landmarker_result = pose.process(frame)

  if pose_landmarker_result.pose_landmarks:
    landmarks = pose_landmarker_result.pose_landmarks.landmark

    nose = (
      int(landmarks[mp_pose.PoseLandmark.NOSE].x * w),
      int(landmarks[mp_pose.PoseLandmark.NOSE].y * h)
    )
    l_shoulder = (
      int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x * w),
      int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y * h)
    )
    r_shoulder = (
      int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].x * w),
      int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].y * h)
    )
    l_shoulder_x, l_shoulder_y = l_shoulder
    r_shoulder_x, r_shoulder_y = r_shoulder

    # Midpoint between left and right shoulder
    chest = (
      int((l_shoulder_x + r_shoulder_x) // 2),
      int((l_shoulder_y + r_shoulder_y) // 2 -  chest_offset)
    )

    if needs_calibration:
      calibration_frames += 1
      cv2.putText(frame, f"Calibrating, please sit straight: { calibration_frames}/{ max_calibration_frames}", (200, 50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1, cv2.LINE_AA)      
      cali_nose_chest_lengths.append(math.dist(nose, chest)) 

      if calibration_frames ==  max_calibration_frames:
        avg_nose_chest_dist = np.mean(np.array(cali_nose_chest_lengths))
        needs_calibration = False
        print(f"Average nose-chest distance: {avg_nose_chest_dist}")
    
    if not needs_calibration:
      nose_to_chest_dist = math.dist(nose, chest)
      if nose_to_chest_dist <  sloutch_threshold *  avg_nose_chest_dist: # the distance is less than 90% of the average
         consecutive_slouch_frames += 1
      else:
         consecutive_slouch_frames = 0

      if  consecutive_slouch_frames >= 100: # 100 frames
          cv2.putText(frame, f"You are sloutching!!!!!!!!!!", (200, 50), 
                      cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 1, cv2.LINE_AA)

    cv2.circle(frame, nose, 7, 7, -1)
    cv2.circle(frame, l_shoulder, 7, 7, -1)
    cv2.circle(frame, r_shoulder, 7, 7, -1)
    cv2.circle(frame, chest, 7, 7, -1)
    cv2.line(frame, l_shoulder, chest, (0, 0, 0), 2)
    cv2.line(frame, chest, r_shoulder, (0, 0, 0), 2)
    cv2.line(frame, chest, nose, (0, 0, 0), 2)
  
  # cv2.imshow('Posture', frame)
  return frame #nd array