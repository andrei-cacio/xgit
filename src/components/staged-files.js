const blessedBox = require('blessed').box;
const context = require('../core/context');
const contextModule = require('../modules/context');
const getList = require('./list');

const gitStatusBox = blessedBox({
  top: '13%',
  left: '50%',
  width: '50%',
  height: '90%',
  label: 'Staged files',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'red'
    }
  }
});

function mount(data, screen) {
 if (data.files.length) {
    const list = getList(data.files, {
      parent: gitStatusBox,
      colors: {
        selected: '#ffcfcf',
        item: 'red'
      }
    });
    context.registerComponent('stagedList', list);
    contextModule.actions.addNextToFocus('stagedList');
  } else {
   gitStatusBox.setContent('{center}{yellow-fg}Nothing to show {/yellow-fg}{/center}');
 }

  screen.append(gitStatusBox);
  screen.render();
}

module.exports = { mount };
