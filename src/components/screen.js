const screen = require('blessed').screen;

const screen = blessed.screen({ smartCSR: true });
screen.title = 'xGit';

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

module.exports = screen;