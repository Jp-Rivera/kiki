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

const slider = document.querySelector('#slider');

slider.addEventListener('input', (event) => {
  ws.zoom(Number(event.target.value));
});

const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const startValue = document.querySelector('#start-value')
const endValue = document.querySelector('#end-value')

startButton.addEventListener('click', () => {
    startValue.value = ws.getCurrentTime()
})

endButton.addEventListener('click', () => {
    endValue.value = ws.getCurrentTime()
})

const createPad = (padButton, id) => {
    regions.addRegion({
        id: id,
        start: startValue.value,
        end: endValue.value,
        content: 'Resize me',
        color: '#000',
        drag: true,
        resize: true,
      })
}

const pads = document.querySelectorAll('[id^="create-"]')
pads.forEach((i) => {
    var createPadButton = document.getElementById(i.id)
    createPadButton.addEventListener('click', () => {
        createPad(createPadButton, i.id)
    })
});