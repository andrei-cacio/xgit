const box = require('blessed').box;
const helpContent = require('../constants/howto');

const helpBox = box({
	top: 'center',
	left: '50%',
	width: '50%',
	height: '80%',
	content: helpContent,
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

function mount(screen) {
	screen.append(helpBox);
	screen.render();
}

module.exports = { mount };
