const logger = require('../../utils/logger.js');
const Token = require('./token.js');

const classNames = {
  L: 'Letter',
  N: 'Number',
  O: 'Operator',
  S: 'Separator',
  D: 'Dot'
}

const classes = require('../../config/classes.js');
const keywords = require('../../config/lexems.js');

class Lexer {

  constructor() {
    this.identifiers = [];
    this.keywords = [];
    this.constants = [];
  }

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
          nextState = currentState(char);
          this.token += char;
          nextState = nextState(' ');
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
      case classes.S.indexOf(ch) >= 0: return classNames.S
      case classes.L.indexOf(ch) >= 0: return classNames.L
      case classes.N.indexOf(ch) >= 0: return classNames.N
      case classes.O.indexOf(ch) >= 0: return classNames.O
      case classes.D.indexOf(ch) >= 0: return classNames.D
      default: return null;
    }
  }

  state1(ch) {
    this.token = '';

    const availableStates = {
      [classNames.L]: () => this.state2.bind(this),
      [classNames.N]: () => this.state4.bind(this),
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
      return nextState();
    } else {
      const err = this.error(ch);
      throw err;
    }
  }

  state4(ch) {
    const availableStates = {
      [classNames.N]: () => this.state4.bind(this),
      [classNames.D]: () => {
        if (this.lastChar) {
          const err = this.error(ch);
          throw err;
        }
        return this.state5.bind(this);
      },
      [classNames.S]: () => {
        this.finalStateConstant()
        return this.state1.bind(this);
      }
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
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
        this.keywordOrError();
        return this.state1.bind(this);
      }
    }

    const nextState = availableStates[this.getClass(ch)];

    if (nextState) {
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
    const token = new Token(
      'Identifier', this.token, this.lineIndex + 1,
      this.charIndex - this.token.length + 2
    );

    this.identifiers.push(token);

    console.log(token.render());
  }

  finalStateKeyword() {
    const token = new Token(
      'Keyword', this.token, this.lineIndex + 1,
      this.charIndex - this.token.length + 2
    );

    this.keywords.push(token);

    console.log(token.render());
  }

  finalStateConstant() {
    const token = new Token(
      'Constant', this.token, this.lineIndex + 1,
      this.charIndex - this.token.length + 2
    );

    this.constants.push(token);

    console.log(token.render());
  }

  error(char) {
    console.log(char);
    return logger(`${this.lineIndex + 1}:${this.charIndex + 1} Unexepected char '${char}' after '${this.token}'\n--->${this.line}`);
  }
}

module.exports = Lexer;
