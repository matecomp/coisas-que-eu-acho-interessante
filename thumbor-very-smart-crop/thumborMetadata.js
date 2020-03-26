const thumborUrl =
  'http://thumbor.globoi.com/unsafe/smart/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2019/m/E/1LWTVeQkqGTuJNLSmDDQ/fora-da-cozinha.jpeg'
const thumborFinalUrl =
  'http://thumbor.globoi.com/unsafe/200x620/smart/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2019/m/E/1LWTVeQkqGTuJNLSmDDQ/fora-da-cozinha.jpeg'

const operations = [
  {
    top: 0,
    right: 797,
    type: 'crop',
    bottom: 768,
    left: 309
  },
  {
    width: 200,
    type: 'resize',
    height: 620
  }
]

const crop = operations[0]

const focal_points = [
  {
    origin: '',
    height: 107,
    width: 107,
    y: 278.15999999999997,
    x: 522,
    z: 11449
  },
  {
    origin: '',
    height: 121,
    width: 121,
    y: 221.48,
    x: 705,
    z: 14641
  },
  {
    origin: '',
    height: 110,
    width: 110,
    y: 194.8,
    x: 343,
    z: 12100
  },
  {
    origin: '',
    height: 138,
    width: 138,
    y: 312.44,
    x: 886,
    z: 19044
  },
  {
    origin: '',
    height: 133,
    width: 133,
    y: 273.03999999999996,
    x: 148,
    z: 17689
  }
]
