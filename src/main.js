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
})

const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')

playButton.addEventListener('click', () => {
    ws.play()
})

pauseButton.addEventListener('click', () => {
    ws.pause()
})

ws.registerPlugin(
    ZoomPlugin.create({
      scale: 0.5,
      maxZoom: 100,
    }),
)

document.querySelector('#slider').oninput = function () {
    ws.zoom(Number(this.value));
};

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
  regions.addRegion({
    start: 9,
    end: 10,
    content: 'Cramped region',
    color: randomColor(),
    minLength: 1,
    maxLength: 10,
  })
})

console.log(regions.getRegions())
