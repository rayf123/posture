import numpy as np

def points_to_slope(p1: tuple, p2: tuple) -> float:
  x1, y1 = p1
  x2, y2 = p2    

  return np.round((y1 - y2) / (x1 - x2), 4)


def slopes_to_angle(m1: float, m2: float) -> float:
  numerator = m1 - m2
  denominator = 1 + m1 * m2

  return np.round(np.arctan(np.abs(numerator / denominator)) * (180 / np.pi), 4)

def points_to_angle(p1: tuple, p2: tuple, p3: tuple, p4: tuple) -> float:
  m1 = points_to_slope(p1, p2)
  m2 = points_to_slope(p3, p4)

  return slopes_to_angle(m1, m2)