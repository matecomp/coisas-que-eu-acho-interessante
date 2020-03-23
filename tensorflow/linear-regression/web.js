const WIDTH = 650
const HEIGHT = 650
const RADIUS = 10

const points = []

// y = mx + b
let m, b

// const model = tf.sequential({
//   layers: [
//     tf.layers.dense({
//       inputShape: [1],
//       units: 1,
//       kernelInitializer: 'ones'
//     })
//   ]
// })

// model.compile({
//   optimizer: tf.train.sgd(0.01),
//   loss: 'meanSquaredError'
// })

// let training = false
// function trainModel () {
//   if (points.length === 0 || training) {
//     return
//   }

//   training = true
//   const data = tf.tensor1d(points.map(point => point.x))
//   const output = tf.tensor1d(points.map(point => point.y))

//   return model
//     .fit(data, output, {
//       epochs: 1,
//       batchSize: 1
//     })
//     .then(() => {
//       training = false
//     })
// }

const learningRate = 0.01
const optimizer = tf.train.sgd(learningRate)

const loss = (pred, ys) =>
  pred
    .sub(ys)
    .square()
    .mean()

const predict = tfxs => {
  return tfxs.mul(m).add(b)
}

const train = (xs, ys) => {
  const tfxs = tf.tensor1d(xs)
  const tfys = tf.tensor1d(ys)

  optimizer.minimize(() => {
    const pred = predict(tfxs)
    return loss(pred, tfys)
  })
}

function setup () {
  createCanvas(WIDTH, HEIGHT)
  m = tf.scalar(1).variable()
  b = tf.scalar(0).variable()
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

  const xs = points.map(point => point.x)
  const ys = points.map(point => point.y)

  if (points.length > 0) {
    tf.tidy(() => {
      train(xs, ys)
    })
  }

  const xs_scaled = xs.map(x => map(x, 0, 1, 0, WIDTH))
  const ys_scaled = ys.map(y => map(y, 0, 1, HEIGHT, 0))

  fill(150)
  for (let idx = 0; idx < points.length; idx++) {
    circle(xs_scaled[idx], ys_scaled[idx], RADIUS)

    if (idx === points.length - 1 && borderLen > 0) {
      fill(255)
      circle(xs_scaled[idx], ys_scaled[idx], RADIUS + borderLen)
      borderLen -= 1
    }
  }

  stroke(255)
  tf.tidy(() => {
    let xLine = [0, 1]
    let x1 = map(xLine[0], 0, 1, 0, WIDTH)
    let x2 = map(xLine[1], 0, 1, 0, WIDTH)

    let tfxs = tf.tensor1d(xLine)
    
    const yLine = predict(tfxs).dataSync()
    let y1 = map(yLine[0], 0, 1, HEIGHT, 0)
    let y2 = map(yLine[1], 0, 1, HEIGHT, 0)

    line(x1, y1, x2, y2)
  })
  stroke(0)
}
