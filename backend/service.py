import math
import mediapipe as mp
import cv2
import numpy as np

video = cv2.VideoCapture(0)
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(static_image_mode = False)

needs_calibration = True
calibration_frames = 0
max_calibration_frames = 100
avg_nose_chest_dist = 0
cali_nose_chest_lengths = []

chest_offset = 10

NOSE_TO_CHEST_THRESHOLD = 0.9
consecutive_frames = 0

while video.isOpened():
  ret, frame = video.read()
  if not ret:
    continue

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
      int((l_shoulder_y + r_shoulder_y) // 2 - chest_offset)
    )

    if needs_calibration:
      calibration_frames += 1
      cv2.putText(frame, f"Calibrating, please sit straight: {calibration_frames}/{max_calibration_frames}", (200, 50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1, cv2.LINE_AA)      
      cali_nose_chest_lengths.append(math.dist(nose, chest)) 
      # track leaning as well

      if calibration_frames == max_calibration_frames:
        avg_nose_chest_dist = np.mean(np.array(cali_nose_chest_lengths))
        needs_calibration = False
        print(f"Average nose-chest distance: {avg_nose_chest_dist}")
    
    if not needs_calibration:
      nose_to_chest_dist = math.dist(nose, chest)
      if nose_to_chest_dist < NOSE_TO_CHEST_THRESHOLD * avg_nose_chest_dist: # the distance is less than 90% of the average
        consecutive_frames += 1
      else:
        consecutive_frames = 0

      if consecutive_frames >= 100: # 100 frames
          cv2.putText(frame, f"You are sloutching!!!!!!!!!!", (200, 50), 
                      cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 1, cv2.LINE_AA)

    cv2.circle(frame, nose, 7, 7, -1)
    cv2.circle(frame, l_shoulder, 7, 7, -1)
    cv2.circle(frame, r_shoulder, 7, 7, -1)
    cv2.circle(frame, chest, 7, 7, -1)
    cv2.line(frame, l_shoulder, chest, (0, 0, 0), 2)
    cv2.line(frame, chest, r_shoulder, (0, 0, 0), 2)
    cv2.line(frame, chest, nose, (0, 0, 0), 2)
  
  cv2.imshow('Posture', frame)

  # "q" to close the window
  if cv2.waitKey(10) & 0xFF == ord('q'):
    break

video.release()
cv2.destroyAllWindows()