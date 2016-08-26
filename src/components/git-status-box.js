const blessedBox = require('blessed').box;
const blessedList = require('blessed').list;

const gitStatusBox = blessedBox({
	top: 'center',
	left: 'left',
	width: '50%',
	height: '80%',
	border: {
	    type: 'line'
	  },
	  style: {
	    fg: 'white',
	    border: {
	      fg: '#f0f0f0'
	    }
	  }
});

const style = {
	top: 'center',
	border: {
		bg: 'white'
	},
	selected: {
		fg: 'blue'
	},
	item: {
		fg: 'yellow'
	}
}

function mount(data, screen) {
	if (data.files.length) {
		const list = blessedList({
			items: data.files, 
			keys: true, 
			style: style, 
			vi: true, 
			parent: gitStatusBox
		});

		list.focus();
	} else {
		gitStatusBox.setContent('Nothing to show');
	}
	
	screen.append(gitStatusBox);
	screen.render();
}

module.exports = { mount };