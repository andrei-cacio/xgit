const box = require('blessed').box;

const statusBox = box({
	top: 'top',
	left: 'center',
	width: '100%',
	height: '13%',
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

function mount(data, screen) {
	'use strict';
	let content = `Remote:         {bold}origin{/bold} @ ${data.originUrl} \n`;
	content += `Current branch: {red-fg}${data.branch}{/red-fg} \n`;
	content += `Head:           {bold}${data.head.hash}{/bold} ${data.head.message}`;

	statusBox.setContent(content);
	screen.append(statusBox);
	screen.render();
}

module.exports = { mount };
