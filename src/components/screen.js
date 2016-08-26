const screen = require('blessed').screen;

const defaultScreen = screen({ smartCSR: true });
defaultScreen.title = 'xGit';

defaultScreen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

module.exports = defaultScreen;