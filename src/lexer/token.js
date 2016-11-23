class Token {
  constructor(type, value, lineIndex, charIndex) {
    this.type = type;
    this.value = value;
    this.lineIndex = lineIndex;
    this.charIndex = charIndex;
  }

  render() {
    return `<${this.type} '${this.value}' ${this.lineIndex}:${this.charIndex}>`
  }
}

module.exports = Token;
