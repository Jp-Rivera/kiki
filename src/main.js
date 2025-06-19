import WaveSurfer from 'wavesurfer.js'

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: '../public/walk_insta.wav',
})


