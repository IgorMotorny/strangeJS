#!/usr/bin/env node

const fs = require('fs');

const execFile = process.argv[2];

const lexems = require('./config/lexems.js');
const classes = require('./config/classes.js');


const separators = ['\n', ' ', '\t', '\r', ';'];

function getClass(symbol) {
  switch (true) {
    case classes.L.indexOf(symbol) >= 0:
      return 'L'
    case classes.N.indexOf(symbol) >= 0:
      return 'N'
    case classes.O.indexOf(symbol) >= 0:
      return 'O'
    default:
      return null;
  }
}
/**
value:
line:
index:
class:


isLexeme
isIndefire
isConst
*/
class Scaner {
  constructor(str) {
    this.data = str.split('/n')
      .map(line => line.split(''));
    this.currentLine = 0;
    this.currentSymbol = 0;
  }

  parse() {
    this.data.map(line => {
      const lineBuff = [];
      let wordBuff = [];
      line.forEach((letter, i) => {
        const classLetter = getClass(letter);
        const prevClass = lineBuff[i-1] ? lineBuff[i-1].class : null
        const currentClass = getClass(letter);

        wordBuff.push(letter);

        lineBuff.push({
          value: letter,
          str: wordBuff.join(''),
          line: this.currentLine,
          index: i,
          class: currentClass,
          isLexeme: this.isLexemeFunc(currentClass, prevClass),
          isIdentifier: this.isIdentifierFunc(currentClass, prevClass),
          isConst: this.isConstFunc(currentClass, prevClass)
        });
        // console.log(lineBuff[i]);

        if (!lineBuff[i].isLexeme && !lineBuff[i].isIdentifier
          && !lineBuff[i].isConst) {
            switch (this.whatItIs(lineBuff[i-1])) {
              case 'C':
                console.log('constant: ' + JSON.stringify(lineBuff[i-1]));
                break;
              case 'L':
                console.log('lexeme: ' + JSON.stringify(lineBuff[i-1]));
                break;
              case 'I':
                console.log('identifier: ' + JSON.stringify(lineBuff[i-1]));
                break;
              default:
            }
            wordBuff = [];
        }
      });
    })
  }

  whatItIs(data) {
    if (data.isConst) return 'C';

    if (data.isLexeme) {
      return lexems[data.str] ? 'L' : 'I'
    }

    return 'I';
  }


  isLexemeFunc(currentClass, prevClass) {
    // LL
    if (prevClass) {
      return (prevClass == 'L') && (currentClass == 'L');
    } else {
      return currentClass == 'L';
    }
  }

  isIdentifierFunc(currentClass, prevClass) {
    // LL LN NL
    if (prevClass) {
      switch (prevClass) {
        case 'L':
          return (currentClass == 'L') || (currentClass == 'N');
        case 'N':
          return currentClass == 'L';
        default:
          return false;
      }
    } else {
      return (currentClass == 'L') || (currentClass == 'N');
    }
  }

  isConstFunc(currentClass, prevClass) {
    // NN
    if (prevClass) {
      return (prevClass == 'N') && (currentClass == 'N');
    } else {
      return currentClass == 'N';
    }
  }

  readLine() { }

  getFirstLetter(letter) {
    const actions = {
      'L': this.lexemeOrIndefire,
      'N': this.indefireOrConst,
      'O': this.lexeme
    };

    const action = actions[getClass(letter)];

    if (action) {
      this.nexAction = actions
    }
  }
  lexemeOrIndefire() { }
  indefireOrConst() { }
  lexeme() { }
}

const scaner = new Scaner('do let i = 0 to 10 by 1 while i < 10');
scaner.parse();
