import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.esm.js'

const regions = RegionsPlugin.create()

const ws = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)',
  url: '../public/walk_insta.wav',
  plugins: [regions],
  minPxPerSec: 100,
})

ws.registerPlugin(
    ZoomPlugin.create({
      // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
      scale: 0.5,
      // Optionally, specify the maximum pixels-per-second factor while zooming
      maxZoom: 100,
    }),
)

const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')

playButton.addEventListener('click', () => {
    ws.play()
})

pauseButton.addEventListener('click', () => {
    ws.pause()
})

const random = (min, max) => Math.random() * (max - min) + min
const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`

ws.on('decode', () => {
  // Regions
  regions.addRegion({
    start: 0,
    end: 8,
    content: 'Resize me',
    color: randomColor(),
    drag: false,
    resize: true,
  })
})