const screen = require('blessed').screen;
const context = require('../core/context');

const defaultScreen = screen({ smartCSR: true });
defaultScreen.title = 'xGit';

defaultScreen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

defaultScreen.key(['tab'], function() {
  context.getComponent('unstagedBox');
});

module.exports = defaultScreen;
