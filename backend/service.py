import mediapipe as mp
import cv2

video = cv2.VideoCapture(0)
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(static_image_mode = False)

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
      int((l_shoulder_y + r_shoulder_y) // 2)
    )

   # calculate_angle(l_shoulder, r_shoulder, (r_shoulder_x, 0))


    cv2.circle(frame, nose, 7, 7, -1)
    cv2.circle(frame, l_shoulder, 7, 7, -1)
    cv2.circle(frame, r_shoulder, 7, 7, -1)
    cv2.circle(frame, chest, 7, 7, -1)

  cv2.imshow('Posture', frame)

  # "q" to close the window
  if cv2.waitKey(10) & 0xFF == ord('q'):
    break

video.release()
cv2.destroyAllWindows()