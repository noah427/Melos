import E1m1 from './e1m1.js'
import { Replay } from './tabs.js'
import { Fret } from './fret.js'

const synth = new Tone.PolySynth(Tone.Synth).toDestination()
// const distortion = new Tone.Distortion(1).toDestination();
// synth.connect(distortion)

var noteMapping = new Map()
var replay = new Replay(ActivateFrets, sleep)

replay.initiateTabs()

document.addEventListener(
  'contextmenu',
  function (e) {
    e.preventDefault()
  },
  false
)

for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 25; x++) {
    let fret = new Fret(y, x, synth, replay)
    noteMapping.set(`${x}:${y}`, fret)
    document.getElementById('fretboard').append(fret.Element)
  }
}

document.onkeypress = async e => {
  if (e.key == ' ') {
    await replay.Play()
  }
}

document.getElementById('e1m1').onclick = E1m1.bind(this, sleep, ActivateFret)

async function ActivateFret (y, x, time, n) {
  await noteMapping.get(`${x}:${y}`).PlayNote(time, n)
  await sleep(time / 2)
}

async function ActivateFrets (notes, time) {
  var Notes = []
  for (const n of notes) {
    let note = await noteMapping.get(`${n[0]}:${n[1]}`)
    if (note == undefined) {
      continue
    }
    Notes.push(note)
    note.StartNote()
  }

  await sleep(time)

  for (const n of Notes) {
    n.EndNote()
  }
  await sleep(time)
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
