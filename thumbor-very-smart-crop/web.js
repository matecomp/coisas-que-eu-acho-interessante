let img, imgCroped

function renderPreviewCrop () {
  const posX = 1100
  const posY = 0
  const width = imgCroped.width / 3
  const height = imgCroped.height / 3
  const cropX = crop.left
  const cropY = crop.top
  const cropWidth = crop.right - crop.left
  const cropHeight = crop.bottom - crop.top
  image(
    img,
    posX,
    posY,
    width,
    height,
    cropX,
    cropY,
    cropWidth,
    cropHeight
  )
}

const previewScale = 3

function setup () {
  img = createImg(thumborUrl, 'imagem carregada')
  img.hide()

  imgCroped = createImg(thumborFinalUrl, 'imagem croppada')
  imgCroped.hide()

  createCanvas(windowWidth, windowHeight)
  background(230, 255, 230)
}

function insideOut(x, y, width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const horizontalFit = crop.left <= x - halfWidth && x + halfWidth <= crop.right;
  const verticalFit = crop.top <= y  - halfHeight && y + halfHeight <= crop.bottom;
  
  return horizontalFit && verticalFit;
}

function draw () {
  image(img, 0, 0, img.width, img.height)
  image(imgCroped, 1200, 0, imgCroped.width / 3, imgCroped.height / 3)

  renderPreviewCrop()

  for (idx in focal_points) {
    let { x, y, width, height } = focal_points[idx]
    if (insideOut(x, y, width, height)) {
      fill(0, 120, 0, 130)
    } else {
      fill(120, 0, 0, 130)
    }
    circle(x, y, height)
    fill(0)
    textSize(32);
    text(idx, x, y)
  }

  fill(0, 0, 120, 80)
  rect(crop.left, crop.top, crop.right - crop.left, crop.bottom - crop.top)
}
