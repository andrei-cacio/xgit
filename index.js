#!/usr/bin/env node

const blessed = require('blessed');
const screen = require('./src/components/screen');
const statusBox = require('./src/components/status-box');
const unstagedFilesBox = require('./src/components/unstaged-files');
const stagedFilesBox = require('./src/components/staged-files');
const repoModule = require('./src/modules/repositories');
const contextModule = require('./src/modules/context');
const rxflux = require('rxflux').default;

const repoPath = process.argv[2];

repoModule.store.subscribe(newState => {
	const originUrl = newState.get('originUrl');
	const branch = newState.get('branch');
	const head = newState.get('head').toJS();
  const unstagedFiles = rxflux.evaluateGetter(repoModule.getters.unstagedFiles);
	const uFiles = (typeof unstagedFiles === 'object') ? unstagedFiles.toJS() : unstagedFiles;

  const stagedFiles = rxflux.evaluateGetter(repoModule.getters.stagedFiles);
  const sFiles = (typeof unstagedFiles === 'object') ? stagedFiles.toJS() : stagedFiles;

	statusBox.mount({ originUrl, branch, head }, screen);
	unstagedFilesBox.mount({ files: uFiles }, screen);
  stagedFilesBox.mount({ files: sFiles }, screen);
  contextModule.actions.focus();
});

repoModule.actions.parseRepo(repoPath);

