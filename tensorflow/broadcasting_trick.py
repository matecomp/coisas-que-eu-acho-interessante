import numpy as np
from time import time

x = np.random.rand(10000,10000)
y = np.random.rand(10000,10000)
# print(x)

x_trick = x[..., np.newaxis]
y_trick = y[..., np.newaxis]
# print(x_trick)

start = time()
ans = x * y
end = time()
print(end - start)

start = time()
ans_trick = x_trick * y_trick
end = time()
print(end - start)

ans_trick = ans_trick[:,:,0]
print(ans_trick == ans)