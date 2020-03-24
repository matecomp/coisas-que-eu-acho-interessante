const thumborUrl =
  'http://thumbor.globoi.com/unsafe/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/Z/Q/Q9iInYTg63al6o2zT8Lg/griselda-lilia-cabral-celeste-dira-paes-fina-estampa-globo.jpg'
const thumborFinalUrl =
  'http://thumbor.globoi.com/unsafe/320x620/smart/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/Z/Q/Q9iInYTg63al6o2zT8Lg/griselda-lilia-cabral-celeste-dira-paes-fina-estampa-globo.jpg'

const operations = [
  {
    top: 0,
    right: 314,
    type: 'crop',
    bottom: 465,
    left: 74
  },
  {
    width: 320,
    type: 'resize',
    height: 620
  }
]

const crop = operations[0]

const focal_points = [
  {
    origin: '',
    height: 86,
    width: 86,
    y: 98.68,
    x: 194,
    z: 7396
  }
]
