const screen = require('blessed').screen;
const context = require('../core/context');
const contextModule = require('../modules/context');

const defaultScreen = screen({ smartCSR: true });
defaultScreen.title = 'xGit';

defaultScreen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

defaultScreen.key(['tab'], function() {
  contextModule.actions.focus();
});

contextModule.store.subscribe(newState => {
  console.log(newState.toJS());
  const focusedElementName = newState.get('focusedElement');
  console.log(focusedElementName);
  if (context.hasElement(focusedElementName)) {
    context.getComponent(focusedElementName).focus();
  }
});

module.exports = defaultScreen;
