const box = require('blessed').box;

const statusBox = box({
	top: 'center',
	left: 'left',
	width: '50%',
	height: '80%',
	border: {
	    type: 'line'
	  },
	  style: {
	    fg: 'white',
	    bg: 'blue',
	    border: {
	      fg: '#f0f0f0'
	    },
	    hover: {
	      bg: 'green'
	    }
	  }
});

module.exports = statusBox;