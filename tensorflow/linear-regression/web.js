const WIDTH = 1050
const HEIGHT = 650
const RADIUS = 10

const xs = []
const ys = []

// y = nx^2 + mx + b
let n, m, b

const learningRate = 0.1
const optimizer = tf.train.sgd(learningRate)

const loss = (pred, ys) =>
  pred
    .sub(ys)
    .square()
    .mean()

const predict = tfxs => {
  const x2 = tfxs.square().mul(n)
  const x1 = tfxs.mul(m)
  return x2.add(x1).add(b)
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
  n = tf.scalar(-0.5).variable()
  m = tf.scalar(1).variable()
  b = tf.scalar(0).variable()
}

let borderLen = 0
function mouseClicked () {
  xs.push(map(mouseX, 0, WIDTH, 0, 1))
  ys.push(map(mouseY, 0, HEIGHT, 1, 0))
  borderLen = RADIUS * 2
}

function draw () {
  background(0, 50, 0)
  const numPoints = xs.length

  if (numPoints > 0) {
    tf.tidy(() => {
      train(xs, ys)
    })
  }

  const xs_scaled = xs.map(x => map(x, 0, 1, 0, WIDTH))
  const ys_scaled = ys.map(y => map(y, 0, 1, HEIGHT, 0))

  fill(150)
  for (let idx = 0; idx < numPoints; idx++) {
    circle(xs_scaled[idx], ys_scaled[idx], RADIUS)

    if (idx === numPoints - 1 && borderLen > 0) {
      fill(255)
      circle(xs_scaled[idx], ys_scaled[idx], RADIUS + borderLen)
      borderLen -= 1
    }
  }

  stroke(255)
  tf.tidy(() => {
    const xLine = [0, ,0.25, 0.5, 0.75, 1]
    let xns = xLine.map(x => map(x, 0, 1, 0, WIDTH));

    let tfxs = tf.tensor1d(xLine)

    const yLine = predict(tfxs).dataSync()
    let yns = yLine.map(y => map(y, 0, 1, HEIGHT, 0))

    noFill();
    beginShape();
    curveVertex(xns[0], yns[0])
    for (idx in xLine) {
      curveVertex(xns[idx], yns[idx])
    }
    curveVertex(xns[xLine.length-1], yns[yLine.length-1])
    endShape();

    // line(x1, y1, x2, y2)
  })
  stroke(0)
}
