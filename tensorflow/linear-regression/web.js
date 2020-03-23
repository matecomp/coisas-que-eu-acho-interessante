const WIDTH = 650
const HEIGHT = 650
const RADIUS = 10

const points = []

const model = tf.sequential({
  layers: [
    tf.layers.dense({
      inputShape: [1],
      units: 1,
      kernelInitializer: 'ones'
    })
  ]
})

model.compile({
  optimizer: tf.train.sgd(0.01),
  loss: 'meanSquaredError'
})

let training = false
function trainModel () {
  if (points.length === 0 || training) {
    return
  }

  training = true
  const data = tf.tensor1d(points.map(point => point.x))
  const output = tf.tensor1d(points.map(point => point.y))

  return model
    .fit(data, output, {
      epochs: 1,
      batchSize: 1
    })
    .then(() => {
      training = false
    })
}

function predict (xs) {
  tf_x = tf.tensor1d(xs)
  return model.predict(tf_x)
}

function setup () {
  createCanvas(WIDTH, HEIGHT)
}

let borderLen = 0
function mouseClicked () {
  points.push({
    x: map(mouseX, 0, WIDTH, 0, 1),
    y: map(mouseY, 0, HEIGHT, 1, 0)
  })
  borderLen = RADIUS * 2
}

function draw () {
  background(0, 50, 0)
  const xs_points = points.map(point => map(point.x, 0, 1, 0, WIDTH))
  const ys_points = points.map(point => map(point.y, 0, 1, HEIGHT, 0))

  fill(150)
  for (let idx = 0; idx < points.length; idx++) {
    circle(xs_points[idx], ys_points[idx], RADIUS)

    if (idx === points.length - 1 && borderLen > 0) {
      fill(255)
      circle(xs_points[idx], ys_points[idx], RADIUS + borderLen)
      borderLen -= 1
    }
  }

  stroke(255)
  tf.tidy(() => {
    trainModel()

    let xs = [0, 1]
    let x1 = map(xs[0], 0, 1, 0, WIDTH)
    let x2 = map(xs[1], 0, 1, 0, WIDTH)

    ys = predict(xs).dataSync()
    let y1 = map(ys[0], 0, 1, HEIGHT, 0)
    let y2 = map(ys[1], 0, 1, HEIGHT, 0)

    line(x1, y1, x2, y2)
  })
  stroke(0)
}
