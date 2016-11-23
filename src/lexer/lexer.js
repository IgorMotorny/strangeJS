const logger = require('../../utils/logger.js');

const classNames = {
  L: 'Letter',
  N: 'Number',
  O: 'Operator',
  S: 'Separator'
}

const classes = require('../../config/classes.js');
const keywords = require('../../config/lexems.js');

class Lexer {

  parse(str) {

    str.split('\n').forEach((line, lineIndex) => {
      let nextState;
      this.line = line;
      this.lineIndex = lineIndex;
      this.token = '';
      line.split('').reduce((currentState, char, charIndex) => {
        this.charIndex = charIndex;
        this.lastChar = charIndex == (line.length -1);
        if (this.lastChar) {
          this.token += char;
          nextState = currentState(char);
        } else {
          nextState = currentState(char);
          this.token += char;
        }

        return nextState;
      }, this.state1.bind(this));

    });
  }

  getClass(ch) {
    switch (true) {
      case ((classes.S.indexOf(ch) >= 0) || this.lastChar): return classNames.S
      case classes.L.indexOf(ch) >= 0: return classNames.L
      case classes.N.indexOf(ch) >= 0: return classNames.N
      case classes.O.indexOf(ch) >= 0: return classNames.O
      default: return null;
    }
  }

  state1(ch) {
    this.token = '';

    const availableStates = {
      [classNames.L]: () => this.state2.bind(this),
      [classNames.N]: () => this.state5.bind(this),
      [classNames.O]: () => this.state6.bind(this),
      [classNames.S]: () => this.state1.bind(this)
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
      return nextState();
    } else {
      const err = this.error(ch);
      throw err;
    }
  }

  state2(ch) {
    const availableStates = {
      [classNames.L]: () => this.state2.bind(this),
      [classNames.N]: () => this.state3.bind(this),
      [classNames.S]: () => {
        this.keywordOrIdentifire()
        return this.state1.bind(this);
      }
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
      console.log('state 2 :: ' + nextState.name);
      return nextState();
    } else {
      const err = this.error(ch);
      throw err;
    }
  }

  state3(ch) {
    const availableStates = {
      [classNames.L]: () => this.state3.bind(this),
      [classNames.N]: () => this.state3.bind(this),
      [classNames.S]: () => {
        this.finalStateIdentifier()
        return this.state1.bind(this);
      }
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
      console.log('state 3 :: ' + nextState.name);
      return nextState();
    } else {
      const err = this.error(ch);
      throw err;
    }
  }

  state5(ch) {
    const availableStates = {
      [classNames.N]: () => this.state5.bind(this),
      [classNames.S]: () => {
        this.finalStateConstant()
        return this.state1.bind(this);
      }
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
      console.log('state 5 :: ' + nextState.name);
      return nextState();
    } else {
      const err = this.error(ch);
      throw err;
    }
  }

  state6(ch) {
    const availableStates = {
      [classNames.O]: () => this.state6.bind(this),
      [classNames.S]: () => {
        this.keywordOrIdentifire()
        return this.state1.bind(this);
      }
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
      console.log('state 5 :: ' + nextState.name);
      return nextState();
    } else {
      const err = this.error(ch);
      throw err;
    }
  }

  keywordOrIdentifire() {
    if (keywords[this.token]) {
      this.finalStateKeyword()
    } else {
      this.finalStateIdentifier()
    }
  }

  keywordOrError() {
    if (keywords[this.token]) {
      this.finalStateKeyword()
    } else {
      const err = this.error(this.token);
      throw err;
    }
  }

  finalStateIdentifier() {
    console.log(`<Identifier '${this.token}' ${this.lineIndex}:${this.charIndex}>`);
  }

  finalStateKeyword() {
    console.log(`<Keyword '${this.token}' ${this.lineIndex}:${this.charIndex}>`);
  }

  finalStateConstant() {
    console.log(`<Constant '${this.token}' ${this.lineIndex}:${this.charIndex}>`);
  }

  error(char) {
    return logger(`${this.lineIndex}:${this.charIndex} Unexepected char '${char}' after '${this.token}'\n--->${this.line}`)
  }
}

module.exports = Lexer;
