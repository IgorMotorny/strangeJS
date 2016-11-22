const PrettyError = require('pretty-error');
const pe = new PrettyError();

function logger(str) {
  return pe.render(new Error(str));
}

module.exports = logger;
