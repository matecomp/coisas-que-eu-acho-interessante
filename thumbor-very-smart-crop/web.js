let img, imgCroped;

function setup () {
  img = createImg(thumborUrl, 'imagem carregada')
  img.hide()

  imgCroped = createImg(thumborFinalUrl, 'imagem croppada')
  imgCroped.hide()

  createCanvas(windowWidth, windowHeight)
  background(230, 255, 230)
}

function draw () {
  image(img, 0, 0, img.width, img.height)
  image(imgCroped, 1200, 0, imgCroped.width/3, imgCroped.height/3)
  fill(0, 120, 0, 80)
  for (idx in focal_points) {
    const { x, y, height } = focal_points[idx];
    circle(x, y, height)
  }

  fill(120, 0, 0, 80)
  rect(crop.left, crop.top, crop.right-crop.left, crop.bottom-crop.top)
  image(img, 1100, 0, imgCroped.width/3, imgCroped.height/3, crop.left, crop.top, crop.right-crop.left, crop.bottom-crop.top)
}
