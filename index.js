const repo = require('nodegit').Repository;
const ref = require('nodegit').Reference;
const blessed = require('blessed');
const help = require('./howto');
const repoPath = process.argv[2];

const screen = blessed.screen({ smartCSR: true });
screen.title = 'xGit';

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

const statusBox = blessed.box({
	top: 'top',
	left: 'center',
	width: '100%',
	height: '12%',
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



const box = blessed.box({
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

const box2 = blessed.box({
	top: 'center',
	left: '50%',
	width: '50%',
	height: '80%',
	content: help,
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

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// screen.render();

repo.open(repoPath)
	.then(rep => {		
		rep.getCurrentBranch().then(displayBranch);
		rep.getStatus()
			.then(display);
		});
		

function displayBranch(ref) {
	statusBox.setContent(`Current branch: ${ref.name()}]`);
	screen.append(statusBox);
}
function display(statuses) {
	const colored = statuses.map(status => status.path());
	const list = blessed.list({items: colored, keys: true, style: style, vi: true, parent: box});
	list.focus();
	screen.append(statusBox);
	screen.append(box);
	screen.append(box2);
	screen.render();
}

