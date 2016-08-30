const blessed = require('blessed');
const screen = require('./src/components/screen');
const statusBox = require('./src/components/status-box');
const gitStatusBox = require('./src/components/git-status-box');
const stagedFilesBox = require('./src/components/staged-files');
const repoStore = require('./src/modules/repositories').store;
const actions = require('./src/modules/repositories').actions;
const getters = require('./src/modules/repositories').getters;
const rxflux = require('rxflux').default;

const repoPath = process.argv[2];

repoStore.subscribe(newState => {
	const originUrl = newState.get('originUrl');
	const branch = newState.get('branch');
	const head = newState.get('head').toJS();
  const unstagedFiles = rxflux.evaluateGetter(getters.unstagedFiles);
	const uFiles = (typeof unstagedFiles === 'object') ? unstagedFiles.toJS() : unstagedFiles;

  const stagedFiles = rxflux.evaluateGetter(getters.stagedFiles);
  const sFiles = (typeof unstagedFiles === 'object') ? stagedFiles.toJS() : stagedFiles;

	statusBox.mount({ originUrl, branch, head }, screen);
	gitStatusBox.mount({ files: uFiles }, screen);
  stagedFilesBox.mount({ files: sFiles }, screen);
});

actions.parseRepo(repoPath);

