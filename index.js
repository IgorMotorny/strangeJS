#!/usr/bin/env node
const fs = require('fs');

const execFile = process.argv[2];

const lexems = require('./config/lexems.js');
const classes = require('./config/classes.js');

const Lexer = require('./src/lexer/lexer.js');

const lexer = new Lexer();

// lexer.parse(fs.readFileSync(execFile).toString());
lexer.parse(fs.readFileSync('test.sjs').toString());
