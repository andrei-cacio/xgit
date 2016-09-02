const rxflux = require('rxflux').default;
const actionTypes = require('./action-types');

module.exports = {
  makeFirstToFocus(element) {
    rxflux.dispatcher.next({
      action: actionTypes.MAKE_FIRST_TO_FOCUS,
      payload: element
    });
  },
  focus() {
    rxflux.dispatcher.next({
      action: actionTypes.FOCUS
    });
  },
  addNextToFocus(element) {
    rxflux.dispatcher.next({
      action: actionTypes.MAKE_NEXT_TO_FOCUS,
      payload: element
    });
  }
}
