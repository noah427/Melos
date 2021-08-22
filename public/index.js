import E1m1 from './e1m1.js'
import {Fret} from "./fret.js"


const synth = new Tone.Synth(Tone.NoiseSynth).toDestination()
// const distortion = new Tone.Distortion(1).toDestination();
// synth.connect(distortion)

var noteMapping = new Map()

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 25; x++) {
    let fret = new Fret(y, x,synth)
    noteMapping.set(`${x}:${y}`, fret)
    document.getElementById('fretboard').append(fret.Element)
  }
}


document.getElementById('e1m1').onclick = E1m1.bind(this, sleep, ActivateFret)

async function ActivateFret (y, x, time, n) {
  await noteMapping.get(`${x}:${y}`).PlayNote(time, n)
}
