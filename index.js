const lexems = require('./config/lexems.js');
const classes = require('./config/classes.js');
const Lexer = require('./src/lexer/lexer.js');
const fs = require('fs');



const lexer = new Lexer();

lexer.parse(fs.readFileSync('test.sjs').toString());
