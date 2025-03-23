export default class Dialog {
  constructor(character, rootSegment) {
    this.character = character
    this.rootSegment = rootSegment
  }
  
  static fromJson(json) {
    const character = json.character
    const rootSegment = DialogSegment.fromJson(json.rootSegment)
    return new Dialog(character, rootSegment)
  }
}

class DialogSegment {
  constructor({ text, choices }) {
    this.text = text
    this.choices = choices
  }
  
  static fromJson(json) {
    if (typeof json === 'string') {
      return json
    }
    const text = json.text
    const choices = Object.entries(json.choices).map(([key, value]) => {
      return { choice: key, next: DialogSegment.fromJson(value) }
    })
    return new DialogSegment({ text, choices })
  }
}
