const store = require('./store');
const rxflux = require('rxflux').default;

module.exports = {
	actions: require('./actions'),
	actionTypes: require('./action-types'),
	store: rxflux.createStore('repos', store),
  getters: require('./getters')
}
