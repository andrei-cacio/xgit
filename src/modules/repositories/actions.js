const repo = require('nodegit').Repository;
const ref = require('nodegit').Reference;

function parseRepo(path) {
	path = path || '.';
	repo.open(path)
		.then(rep => {

		});
}
