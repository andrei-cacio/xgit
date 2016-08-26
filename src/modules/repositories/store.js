const actionTypes = require('./action-types');

const repoStore = {
	initialState: {
		originUrl: '',
		branch: {
			sha: '',
			shortSha: '',
			name: ''
		},
		statusFiles: []
	},
	actionMap: {
		[actionTypes.GET_ORIGIN_URL]: handleOriginUrl,
		[actionTypes.GET_BRANCH_INFO]: handleBranchInfo,
		[actionTypes.GET_GIT_STATUS]: handleGitStatus
	}
}

function handleOriginUrl(state, originUrl) {
	return state.merge({ originUrl });
}

function handleBranchInfo(state, branch) {
	return state.merge({ branch });
}

function handleGitStatus(statusFiles) {
	return state.merge({ statusFiles });
}