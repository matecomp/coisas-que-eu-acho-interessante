import numpy as np
from time import time

x = np.random.rand(100)
W = np.random.rand(100,500)
# print(x)

x_trick = x[..., np.newaxis]
# print(x_trick)

start = time()
ans = np.matmul(x, W)
end = time()
print(end - start)

start = time()
ans_trick = np.matmul(W.T, x_trick)
end = time()
print(end - start)

ans_trick  = ans_trick[:,0]

comparison = ans == ans_trick
equal_arrays = comparison.all()

print(equal_arrays)