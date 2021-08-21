import E1m1 from './e1m1.js'

const noteOrder = [
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
  'c', // 8
  'c#',
  'd',
  'd#'
]

const stringStart = [0, 7, 3, 10, 5, 0]
const octaveStart = [4, 3, 3, 3, 2, 2]

const synth = new Tone.Synth(Tone.NoiseSynth).toDestination()
// const distortion = new Tone.Distortion(1).toDestination();
// synth.connect(distortion)

var noteMapping = new Map()

class Fret {
  constructor (y, x) {
    this.x = x
    this.y = y
    this.Note = this.calculateNote(y, x)
    this.Octave = this.calculateOctave(y, x)
    this.Element = this.Div(y, x)
  }

  async PlayNote (time, n) {
    this.Element.classList.add('fretActive')
    synth.triggerAttackRelease(`${this.Note}${this.Octave}`, n)
    await sleep(time)
    this.Element.classList.remove('fretActive')
  }

  Div (y, x) {
    let e = document.createElement('div')
    e.classList.add('fret')
    e.id = y * x
    e.innerHTML = this.Note
    e.style = `grid-column-start:${y}`
    e.onclick = this.PlayNote.bind(this, 500, '4n')
    return e
  }

  calculateNote (y, x) {
    return noteOrder[(stringStart[y] + x) % noteOrder.length]
    // refactor this later
  }

  calculateOctave (y, x) {
    var start = octaveStart[y]
    for (let i = 0; i <= x; i++) {
      if ((stringStart[y] + i) % noteOrder.length == 8) {
        start += 1
      }
    }
    return start
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 25; x++) {
    let fret = new Fret(y, x)
    noteMapping.set(`${x}:${y}`, fret)
    document.getElementById('fretboard').append(fret.Element)
  }
}

document.getElementById('e1m1').onclick = E1m1.bind(this, sleep, ActivateFret)

async function ActivateFret (y, x, time, n) {
  await noteMapping.get(`${x}:${y}`).PlayNote(time, n)
}
