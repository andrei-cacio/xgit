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
		rep.getCurrentBranch()
		.then(displayBranch);
		rep.getRemote('origin').then(displayRemote);
		rep.getStatus()
			.then(display);
		rep.getHeadCommit().then(displayCommit);
		
		});
		

function displayRemote(remote) {
	const url = remote.url();
	statusBox.setContent(`Remote:         {bold}origin{/bold} @ ${url}`);
	screen.append(statusBox);
	screen.render();
}

function displayCommit(commit) {
	const hash = commit.toString().slice(0, 7);
	const message = commit.message();
	var currentContent = statusBox.getContent();
	currentContent += '\n';
	currentContent += `Head:           {bold}${hash}{/bold} ${message}`;

	statusBox.setContent(currentContent);
	screen.remove(statusBox);
	screen.append(statusBox);
	screen.render();
}

function displayBranch(ref) {
	const currentBranch = ref.name()
		.replace(/refs\/heads\//, '');
	var currentContent = statusBox.getContent();
	currentContent += '\n';
	currentContent += `Current branch: {red-fg}${currentBranch}{/red-fg}`;

	statusBox.setContent(currentContent);
	screen.remove(statusBox);
	screen.append(statusBox);
	screen.render();
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

