import tensorflow as tf
mnist = tf.keras.datasets.mnist

# Get train and test data:
(x_train, y_train),(x_test, y_test) = mnist.load_data()

# Normalize input image:
x_train, x_test = x_train / 255.0, x_test / 255.0

# set input shape
image_shape = x_train[0].shape
output_len = 10

# Build model
model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=image_shape),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(output_len, activation='softmax')
])

# Compile model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train model
model.fit(x_train, y_train, epochs=5)

# Test model
model.evaluate(x_test, y_test)