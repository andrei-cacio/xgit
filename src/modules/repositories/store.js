const actionTypes = require('./action-types');

const repoStore = {
	initialState: {
		originUrl: '',
		branch: '',
		head: { 
			hash: '',
			message: ''
		},
		statusFiles: []
	},
	actionMap: {
		[actionTypes.GET_ORIGIN_URL]: handleOriginUrl,
		[actionTypes.GET_CURRENT_BRANCH_NAME]: handleBranchInfo,
		[actionTypes.GET_GIT_STATUS]: handleGitStatus,
		[actionTypes.GET_HEAD]: handleHead
	}
}

function handleOriginUrl(state, originUrl) {
	return state.merge({ originUrl });
}

function handleBranchInfo(state, branch) {
	return state.merge({ branch });
}

function handleGitStatus(state, statusFiles) {
	return state.merge({ statusFiles });
}

function handleHead(state, head) {
	return state.merge({ head });
}

module.exports = repoStore;