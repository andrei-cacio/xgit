const repo = require('nodegit').Repository;
const ref = require('nodegit').Reference;
const blessed = require('blessed');

const screen = blessed.screen({ smartCSR: true });
screen.title = 'xGit';

const style = {
	selected: {
		fg: 'blue'
	},
	item: {
		fg: 'yellow'
	}
}



screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render();

repo.open('../Calendis-Client')
	.then(rep => {
		rep.getStatus()
			.then(display);

	})


function display(statuses) {
	const colored = statuses.map(status => status.path());
	const list = blessed.list({items: colored, keys: true, style: style, vi: true});
	list.focus();
	screen.append(list);
	screen.render();
}

