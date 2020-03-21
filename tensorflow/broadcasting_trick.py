import numpy as np
from time import time

x = np.random.rand(100,100)
y = np.random.rand(100,100)

x_trick = x[:, np.newaxis]
y_trick = y[:, np.newaxis]

start = time()
x * y
end = time()
print(end - start)

start = time()
x_trick * y_trick
end = time()
print(end - start)