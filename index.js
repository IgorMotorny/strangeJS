const lexems = require('./config/lexems.js');
const classes = require('./config/classes.js');

class Lexer {

  parseChar(s) {
    const clas = this.getClass(s);
    
  }

  getClass(symbol) {
    switch (true) {
      case classes.L.indexOf(symbol) >= 0:
        return 'L'
      case classes.N.indexOf(symbol) >= 0:
        return 'N'
      case classes.O.indexOf(symbol) >= 0:
        return 'O'
      case classes.S.indexOf(symbol) >= 0:
        return 'S'
      case classes.D.indexOf(symbol) >= 0:
        return 'D'
      default:
        return null;
    }
  }
}

const lexer = new Lexer();

console.log(lexer.getClass(''));
