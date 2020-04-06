#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import cv2

import matplotlib.pyplot as plt
from matplotlib.colors import rgb_to_hsv


img = cv2.imread('exemplo.jpeg')
img_resized = cv2.resize(img, (128, 128), interpolation = cv2.INTER_AREA)
img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB) / 255.


plt.imshow(img_rgb)

average = img_rgb.mean(axis=0).mean(axis=0)
print(average)

average_img = np.ones([100,100,3]) * average


plt.imshow(average_img)

red = img_rgb[:,:,0].flatten()
green = img_rgb[:,:,1].flatten()
blue = img_rgb[:,:,2].flatten()

# red = np.ones(64)*0.1
# green = np.ones(64)*0.1
# blue = np.ones(64)*0.1



alpha = 0.5*(2*red - green - blue)
betha = (np.sqrt(3)/2)*(green - blue)

H2 = np.arctan2(betha, alpha)
G2 = np.sqrt(alpha**2 + betha**2)
I = (red + green + blue)/3

colors = list(zip(red, green, blue))


fig = plt.figure(figsize=(6,6))
ax = fig.add_subplot(111, polar=True)
ax.scatter(H2, G2, color=colors, s=200, marker=".", cmap='rgb')
plt.show()

red = img_rgb[:,:,0].flatten()
green = img_rgb[:,:,1].flatten()
blue = img_rgb[:,:,2].flatten()

# red = np.ones(64)*0.1
# green = np.ones(64)*0.1
# blue = np.ones(64)*0.1



alpha = 0.5*(2*red - green - blue)
betha = (np.sqrt(3)/2)*(green - blue)

H2 = np.arctan2(betha, alpha)
G2 = np.sqrt(alpha**2 + betha**2)
I = (red + green + blue)/3

colors = list(zip(red, green, blue))


fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(np.sin(H2)*G2, np.cos(H2)*G2, I, color=colors, s=200, marker=".", cmap='rgb')
plt.show()