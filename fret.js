const noteOrder = [
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
  'c', // 8 octave reset here
  'c#',
  'd',
  'd#'
]

const stringStart = [0, 7, 3, 10, 5, 0]
const octaveStart = [4, 3, 3, 3, 2, 2]

class Timer {
  constructor () {
    this.Start = Date.now()
  }

  Stop () {
    return Date.now() - this.Start
  }
}

export class Fret {
  constructor (y, x, synth, replay) {
    this.synth = synth
    this.replay = replay
    this.x = x
    this.y = y
    this.Note = this.calculateNote(y, x)
    this.Octave = this.calculateOctave(y, x)
    this.Element = this.Div(y, x)
    this.Timer = null
    this.HeldTime = 0
  }

  async PlayNote (time, n) {
    this.Element.classList.add('fretActive')
    var now = Tone.now()
    this.synth.triggerAttack(`${this.Note}${this.Octave}`, now)
    await sleep(time)
    var now = Tone.now()
    this.synth.triggerRelease(`${this.Note}${this.Octave}`, now)
    this.Element.classList.remove('fretActive')
  }

  StartNote () {
    const now = Tone.now()
    this.Timer = new Timer()
    if (this.replay != undefined && this.replay.Playing != true) {
      this.replay.fillNote(this.y, this.x)
    }
    this.synth.triggerAttack(`${this.Note}${this.Octave}`, now)
  }

  EndNote () {
    const now = Tone.now()
    if (this.Timer != null) {
      this.HeldTime = this.Timer.Stop()
    }
    this.synth.triggerRelease([`${this.Note}${this.Octave}`], now + 0.1)
  }

  Div (y, x) {
    let e = document.createElement('div')
    e.classList.add('fret')
    if ([3, 5, 7, 9, 12, 15, 17, 19, 21, 24].includes(x)) {
      e.classList.add('fretMarking')
    }
    e.style = `grid-column-start:${y}`
    e.append(this.Text())
    e.onmousedown = this.StartNote.bind(this)
    e.onmouseup = this.EndNote.bind(this)
    e.onmouseleave = this.EndNote.bind(this)
    return e
  }

  Text () {
    let e = document.createElement('p')
    e.innerHTML = this.Note
    return e
  }

  calculateNote (y, x) {
    return noteOrder[(stringStart[y] + x) % noteOrder.length]
  }

  calculateOctave (y, x) {
    var start = octaveStart[y]
    for (let i = 0; i <= x; i++) {
      if ((stringStart[y] + i) % noteOrder.length == 8) {
        // octave reset at c
        start += 1
      }
    }
    return start
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
