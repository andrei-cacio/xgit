const blessedBox = require('blessed').box;
const context = require('../core/context');
const getList = require('./list');
const contextActions = require('../modules/context/actions');

const UnstagedFilesBox = blessedBox({
	top: '13%',
	left: 'left',
	width: '50%',
	height: '90%',
  label: 'Unstaged files',
	tags: true,
	border: {
	    type: 'line'
	  },
	  style: {
	    fg: 'white',
	    border: {
	      fg: 'green'
	    }
	  }
});

function mount(data, screen) {
	if (data.files.length === 0) {
    UnstagedFilesBox.setContent('{center}{yellow-fg}Nothing to commit (working directory clean){/yellow-fg}{/center}');
	} else if (data.files.length) {
    const list = getList(data.files, {
      parent: UnstagedFilesBox,
      colors: {
        item: 'green',
        selected: '#DBFFE5'
      }
    });
    context.registerComponent('unstagedList', list);
    contextActions.makeFirstToFocus('unstagedList');
  } else {
    UnstagedFilesBox.setContent('{center} Loading ... {/center}');
  }

	screen.append(UnstagedFilesBox);
	screen.render();
}

module.exports = { mount };
