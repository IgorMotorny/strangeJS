#!/usr/bin/env node

const fs = require('fs');

const execFile = process.argv[2];
const reserved = [
  'do',
  'to',
  'by',
  'while',
  'end'
];
const templates = {
  loop: "do #{id} to #{to} by #{step} while(#{expr})\n #{code} \nend;"
};

sjs();

function sjs() {
  if (!execFile) {
    console.log('Ups, sorianchick');
    return;
  }

  const file = fs.readFileSync(execFile).toString();

  const parseData = parseTemplate(templates.loop, file);

  console.log(parseData);

}

function parse(file) {
  const data = file.split('/n');
}

function parseLoop(data) {
  let jsLoop = '';

  jsLoop += `for(let ${id}; )`
}


function replaceArray(str, arr, symbol = '') {
  let result = str;

  arr.forEach((item) => {
    return result = result.replace(item, symbol)
  });

  return result;
}

function splitArray(str, arr) {
  let result;
  arr.forEach((splitItem) => {
    result = result.split(splitItem);
  })
}



function parseTemplate(template, data) {
    const mathes = template.match(/#\{.+?\}/g);

    const results = mathes.map((e) => {
      let item = {
        template: e,
        key: e.replace(new RegExp(/#\{|\}/g), '')
      };

      item.regexps = template.split(e).map((str) =>{
        // debugger;
        return new RegExp(str.replace(new RegExp(/\(/), '\\(')
          .replace(new RegExp(/\)/), '\\)')
          .replace(new RegExp(/\s/g), '( +)')
          .replace(new RegExp(/#\{.+?\}/g), '.+'))
      })

      item.value = data;
      item.regexps.forEach((regexp) => {
        item.value = item.value.replace(regexp, '')
      });

      console.dir(item);
      return item;
    });

    return results;
  }
