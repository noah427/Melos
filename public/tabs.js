class Note {
  constructor () {
    this.Value = '-'
    this.Element = this.Div()
  }

  Text () {
    let e = document.createElement('p')
    e.innerHTML = this.Value
    return e
  }

  Update () {
    e.innerHTML = this.Value
  }

  Div () {
    let e = document.createElement('div')
    e.classList.add('tab-note')
    e.appendChild(this.Text())
    return e
  }
}

export class Tab {
  constructor (selector) {
    this.Notes = []
    this.Selector = selector
    this.Capturing = false
    this.Element = this.Div()
  }

  Capture () {
    if(this.Capturing){
      this.Store()
      return
    }
    this.Capturing = true
    this.Element.classList.add("tab-capturing")
  }

  Store(){
    this.Capturing = false
    this.Element.classList.remove("tab-capturing")
  }

  Div () {
    let e = document.createElement('div')
    e.classList.add('tab')
    for (let i = 0; i < 6; i++) {
      let note = new Note()
      this.Notes.push(note)
      e.appendChild(note.Element)
    }

    e.onclick = this.Capture.bind(this)
    return e
  }
}

export class Selection {
  
}