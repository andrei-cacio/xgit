const box = require('blessed').box;

const statusBox = box({
	top: 'top',
	left: 'center',
	width: '100%',
	height: '12%',
	tags: true,
	border: {
	    type: 'line'
	  },
	  style: {
	    fg: 'white',

	    border: {
	      fg: '#f0f0f0'
	    },
	  }
});

module.exports = statusBox;