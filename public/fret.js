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

export class Fret {
  constructor (y, x, synth) {
    this.synth = synth
    this.x = x
    this.y = y
    this.Note = this.calculateNote(y, x)
    this.Octave = this.calculateOctave(y, x)
    this.Element = this.Div(y, x)
  }

  async PlayNote (time, n) {
    this.Element.classList.add('fretActive')
    this.synth.triggerAttackRelease(`${this.Note}${this.Octave}`, n)
    await sleep(time)
    this.Element.classList.remove('fretActive')
  }

  Div (y, x) {
    let e = document.createElement('div')
    e.classList.add('fret')
    if([3,5,7,9,12,15,17,19,21,24].includes(x)){
      e.classList.add("fretMarking")
    }
    e.style = `grid-column-start:${y}`
    e.append(this.Text())
    e.onclick = this.PlayNote.bind(this, 500, '4n')
    return e
  }

  Text(){
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
      if ((stringStart[y] + i) % noteOrder.length == 8) { // octave reset at c
        start += 1
      }
    }
    return start
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
