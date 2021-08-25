const SvgOrder = [
  'whole-note.svg',
  'half-note.svg',
  'quarter-note.svg',
  'eigth-note.svg',
  'sixteenth-note.svg'
]

class Note {
  constructor () {
    this.Value = '-'
    this.TextDisplay
    this.Element = this.Div()
  }

  Text () {
    let e = document.createElement('p')
    e.classList.add('note-display')
    e.innerText = this.Value
    this.TextDisplay = e
    return e
  }

  Update (value) {
    this.Value = value
    this.TextDisplay.innerText = this.Value
  }

  Div () {
    let e = document.createElement('div')
    e.classList.add('tab-note')
    e.appendChild(this.Text())
    return e
  }
}

export class Replay {
  constructor (ActivateFrets, Sleep) {
    this.Tabs = []
    this.Index = -1
    this.Recording = false
    this.Playing = false
    this.ActivateFrets = ActivateFrets
    this.Sleep = Sleep
    this.Last = 0
    this.Speed = 1000
  }

  fillNote (y, x) {
    if (this.Index == -1) return
    this.Tabs[this.Index].Tab.fillNote(y, x)
    if (this.Last < this.Index) {
      this.Last = this.Index
    }
  }

  changeIndex (index) {
    if (this.Index != -1) {
      let prior = this.Tabs[this.Index]
      prior.Deselect()
    }
    if (index == -1) {
      this.Index = -1
      return
    }
    let tab = this.Tabs[index]
    if (tab == undefined) {
      return
    }
    tab.Select()
    this.Index = index
  }

  Record (tab) {
    if (this.Playing) return
    if (tab.Recording) {
      this.changeIndex(-1)
    } else {
      this.changeIndex(tab.Index)
    }
  }

  async Play () {
    if (this.Playing) return
    this.Playing = true
    if (this.Index == -1) this.changeIndex(0)
    for (let i = this.Index; i < this.Tabs.length; i++) {
      if (i > this.Last) {
        this.changeIndex(-1)
        this.Playing = false
        return
      }
      var array = []
      for (const n in this.Tabs[i].Tab.Notes) {
        array.push([this.Tabs[i].Tab.Notes[n].Value, n])
      }
      await this.ActivateFrets(
        array,
        this.Speed / this.Tabs[i].TimingSelector.Division
      )
      this.changeIndex(this.Index + 1)
    }
    this.changeIndex(-1)
    this.Playing = false
  }

  initiateTabs () {
    for (let i = 0; i < 16; i++) {
      let tab = new Timing(i, this.addTab.bind(this), this.getLength.bind(this))
      tab.Element.onclick = this.Record.bind(this, tab)
      this.Tabs.push(tab)
      document.getElementById('tabbar').append(tab.Element)
    }
  }

  addTab () {
    let tab = new Timing(
      this.Tabs.length,
      this.addTab.bind(this),
      this.getLength.bind(this)
    )
    tab.Element.onclick = this.Record.bind(this, tab)
    this.Tabs.push(tab)
    document.getElementById('tabbar').append(tab.Element)
  }

  getLength () {
    return this.Tabs.length
  }
}

export class Timing {
  constructor (index, addTab, getLength) {
    this.Index = index
    this.AddTab = addTab
    this.GetLength = getLength
    this.Tab
    this.TimingSelector
    this.Element = this.Div()
  }

  Select () {
    this.Tab.Recording = true
    this.Tab.Element.classList.add('tab-capturing')
  }

  Deselect () {
    this.Tab.Recording = false
    this.Tab.Element.classList.remove('tab-capturing')
  }

  Div () {
    let e = document.createElement('div')
    e.classList.add('timing')
    let tab = new Tab(this.Index, this.ExtendRow.bind(this))
    this.Tab = tab
    e.appendChild(tab.Element)
    let timingSelector = new TimingSelector()
    this.TimingSelector = timingSelector
    e.appendChild(timingSelector.Element)
    return e
  }

  ExtendRow () {
    if (this.GetLength() - 1 == this.Index) {
      this.AddTab()
    }
  }
}

export class TimingSelector {
  constructor () {
    this.NoteType = 0
    this.Division = 1
    this.Element = this.Img()
  }
  NextNote () {
    this.NoteType = (this.NoteType + 1) % SvgOrder.length
    this.Division = this.NoteType == 0 ? 1 : this.Division * 2
    this.Element.src = `${SvgOrder[this.NoteType]}`
  }

  Img () {
    let e = document.createElement('img')
    e.classList.add('timing-selector')
    e.src = `${SvgOrder[this.NoteType]}`
    e.onclick = this.NextNote.bind(this)
    return e
  }
}

export class Tab {
  constructor (index, extendRow) {
    this.Notes = []
    this.Recording = false
    this.Index = index
    this.ExtendRow = extendRow
    this.Element = this.Div()
  }

  fillNote (y, x) {
    if (this.Notes[y].Value == x) {
      this.Notes[y].Update('-')
    } else {
      this.Notes[y].Update(x)
    }

    this.ExtendRow()
  }

  Div () {
    let e = document.createElement('div')
    e.classList.add('tab')
    for (let i = 0; i < 6; i++) {
      let note = new Note()
      this.Notes.push(note)
      e.appendChild(note.Element)
    }

    return e
  }
}
