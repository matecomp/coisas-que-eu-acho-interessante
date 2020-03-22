const WIDTH = 650
const HEIGHT = 650
const RADIUS = 10

const points = []
const params = [1, 0]

function setParams () {
  for (let i = 0; i < model.getWeights().length; i++) {
    params[i] = model.getWeights()[i].dataSync()[0]
  }
}

let training = false
function trainModel () {
  if (points.length === 0 || training) {
    return
  }

  training = true
  tf.tidy(() => {
    const data = tf.tensor1d(points.map(point => point.x / WIDTH))
    const output = tf.tensor1d(points.map(point => (HEIGHT - point.y) / HEIGHT))
    model
      .fit(data, output, {
        epochs: 1,
        batchSize: 1
      })
      .then(info => {
        setParams()
        training = false
      })
  })
}

function predict (x) {
  y = x * params[0] + params[1] * HEIGHT
  return HEIGHT - y
}

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
  optimizer: tf.train.sgd(
    (learningRate = 0.01),
    (momentum = 3),
    (nesterov = true)
  ),
  loss: 'meanSquaredError'
})

setParams()
setInterval(trainModel, 10)

function setup () {
  createCanvas(WIDTH, HEIGHT)
  frameRate(60)
}

let borderLen = 0
function mouseClicked () {
  points.push({
    x: mouseX,
    y: mouseY
  })
  borderLen = RADIUS * 2
}

function draw () {
  background(0, 50, 0)

  fill(150)
  for (let idx in points) {
    circle(points[idx].x, points[idx].y, RADIUS)
  }

  if (points.length > 0 && borderLen > 0) {
    fill(255)
    let idx = points.length - 1
    circle(points[idx].x, points[idx].y, RADIUS + borderLen)
    borderLen -= 1
  }

  stroke(255)
  line(0, predict(0), WIDTH, predict(WIDTH))
  stroke(0)
}
