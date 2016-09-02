const blessedBox = require('blessed').box;
const blessedList = require('blessed').list;

const gitStatusBox = blessedBox({
	top: 'center',
	left: 'left',
	width: '50%',
	height: '78%',
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

const style = {
	top: 'center',
	border: {
		bg: 'white'
	},
	selected: {
		fg: '#99ff99'
	},
	item: {
		fg: 'green'
	}
}

function mount(data, screen) {
	if (data.files.length === 0) {
		gitStatusBox.setContent('{center} Loading ... {/center}');
	} else if (data.files.length) {
    const list = blessedList({
      items: data.files,
      keys: true,
      style: style,
      vi: true,
      parent: gitStatusBox
    });

    list.focus();
  } else {
    gitStatusBox.setContent('{center}{yellow-fg}Nothing to commit (working directory clean){/yellow-fg}{/center}');
  }

	screen.append(gitStatusBox);
	screen.render();
}

module.exports = { mount };
