import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";

const regions = RegionsPlugin.create();

const ws = WaveSurfer.create({
  container: "#waveform",
  waveColor: "rgb(200, 0, 200)",
  progressColor: "rgb(100, 0, 100)",
  url: "../public/walk_insta.wav",
  plugins: [regions],
});

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

playButton.addEventListener("click", () => {
  ws.play();
});

pauseButton.addEventListener("click", () => {
  ws.pause();
});

ws.registerPlugin(
  ZoomPlugin.create({
    scale: 0.5,
    maxZoom: 100,
  })
);

const slider = document.querySelector("#slider");

slider.addEventListener("input", (event) => {
  ws.zoom(Number(event.target.value));
});

const startButton = document.querySelector("#start");
const endButton = document.querySelector("#end");
const startValue = document.querySelector("#start-value");
const endValue = document.querySelector("#end-value");

startButton.addEventListener("click", () => {
  startValue.value = ws.getCurrentTime();
});

endButton.addEventListener("click", () => {
  endValue.value = ws.getCurrentTime();
});

const random = (min, max) => Math.random() * (max - min) + min
const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`

const createPad = (padButtonId) => {
  regions.addRegion({
    id: padButtonId.replace('create-', ''),
    start: startValue.value,
    end: endValue.value,
    content: "Resize me",
    color: randomColor(),
    drag: true,
    resize: true,
  });
  //console.log(regions.regions);
};

const createPadsButtons = document.querySelectorAll('[id^="create-"]');
createPadsButtons.forEach((i) => {
  var createPadButton = document.getElementById(i.id);
  createPadButton.addEventListener("click", () => {
    createPad(createPadButton.id);
  });
});

const padsButtons = document.querySelectorAll('[id^="pad-"]');
padsButtons.forEach((i) => {
  var padsButton = document.getElementById(i.id);
  padsButton.addEventListener("click", () => {
   var region = regions.regions.filter((obj) => {
        return obj.id === padsButton.id
    })
        ws.play(region[0].start, region[0].end)
    });
});

const destroyButtons = document.querySelectorAll('[id^="destroy"]')
destroyButtons.forEach((i) => {
    var destroyButton = document.getElementById(i.id)
    destroyButton.addEventListener("click", () => {
        var region = regions.regions.filter((obj) => {
            console.log(destroyButton.id.replace('destroy-pad-', ''))
            return obj.id === 'pad-' + destroyButton.id.replace('destroy-pad-', '')
        })
        region[0].remove()
    })
})