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
    this.Playing
    this.ActivateFrets = ActivateFrets
    this.Sleep = Sleep
  }

  fillNote (y, x) {
    if (this.Index == -1) return
    this.Tabs[this.Index].fillNote(y, x)
  }

  changeIndex (index) {
    if (this.Index != -1) {
      let prior = this.Tabs[this.Index]
      prior.Recording = false
      prior.Element.classList.remove('tab-capturing')
    }
    if (index == -1) {
      this.Index = -1
      return
    }
    let tab = this.Tabs[index]
    if (tab == undefined) {
      return
    }
    tab.Recording = true
    tab.Element.classList.add('tab-capturing')
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
    for (let i = this.Index; i < 16; i++) {
      var array = []
      for (const n in this.Tabs[i].Notes) {
        array.push([this.Tabs[i].Notes[n].Value, n])
      }
      await this.ActivateFrets(array, 125)
      this.changeIndex(this.Index + 1)
    }
    this.changeIndex(-1)
    this.Playing = false
  }

  initiateTabs () {
    for (let i = 0; i < 16; i++) {
      let tab = new Tab(i)
      tab.Element.onclick = this.Record.bind(this, tab)
      this.Tabs.push(tab)
      document.getElementById('tabbar').append(tab.Element)
    }
  }
}

export class Tab {
  constructor (index) {
    this.Notes = []
    this.Recording = false
    this.Index = index
    this.Element = this.Div()
  }

  fillNote (y, x) {
    if (this.Notes[y].Value == x) {
      this.Notes[y].Update('-')
    } else {
      this.Notes[y].Update(x)
    }
  }

  Div () {
    let e = document.createElement('div')
    e.classList.add('tab')
    for (let i = 0; i < 6; i++) {
      let note = new Note()
      this.Notes.push(note)
      e.appendChild(note.Element)
    }

    // e.onclick = this.Capture.bind(this)
    return e
  }
}
