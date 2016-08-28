const repo = require('nodegit').Repository;
const ref = require('nodegit').Reference;
const rxflux = require('rxflux').default;
const actionTypes = require('./action-types');

function parseRepo(path) {
	path = path || '.';
	repo.open(path)
		.then((rep) => {
            getOriginUrl(rep);
            getBranchInfo(rep);
            getHead(rep);
            getGitStatus(rep);
        });
}

function getOriginUrl(rep) {
	rep.getRemote('origin')
		.then((remote) => {
			const url = remote.url();
			rxflux.dispatcher.next({ 
				action: actionTypes.GET_ORIGIN_URL, 
				payload: url 
			});
		});

}

function getBranchInfo(rep) {
	rep.getCurrentBranch()
		.then((ref) => {
			const name = ref.name().replace(/refs\/heads\//, '');
			rxflux.dispatcher.next({ 
				action: actionTypes.GET_CURRENT_BRANCH_NAME, 
				payload: name 
			});
		});
}

function getHead(rep) {
	rep.getHeadCommit()
		.then((commit) => {
			const hash = commit.toString().slice(0, 7);
			const message = commit.message();
			rxflux.dispatcher.next({ 
				action: actionTypes.GET_HEAD, 
				payload: { hash, message } 
			});
		});
}

function getGitStatus(rep) {
	rep.getStatus()
		.then((statuses) => {
		const files = statuses.map(status => status.path());
		rxflux.dispatcher.next({ 
			action: actionTypes.GET_GIT_STATUS, 
			payload: files 
		});
	});
}

module.exports = { parseRepo };
