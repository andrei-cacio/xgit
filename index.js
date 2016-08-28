const blessed = require('blessed');
const screen = require('./src/components/screen');
const statusBox = require('./src/components/status-box');
const gitStatusBox = require('./src/components/git-status-box');
const helpBox = require('./src/components/help-box');
const repoStore = require('./src/modules/repositories').store;
const actions = require('./src/modules/repositories').actions;

const repoPath = process.argv[2];

repoStore.subscribe(newState => {
	const originUrl = newState.get('originUrl');
	const branch = newState.get('branch');
	const head = newState.get('head').toJS();
  const statusFiles = newState.get('statusFiles');
	const files = (typeof statusFiles === 'object') ? statusFiles.toJS() : statusFiles;

	statusBox.mount({ originUrl, branch, head }, screen);
	gitStatusBox.mount({ files }, screen);
});

actions.parseRepo(repoPath);
helpBox.mount(screen);


