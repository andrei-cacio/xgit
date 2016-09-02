const actionTypes = require('./action-types');
module.exports = {
  initialState: {
    focusedElement: '',
    firstToFocus: '',
    focusNext: []
  },
  actionMap: {
    [actionTypes.MAKE_FIRST_TO_FOCUS]: makeFirstToFocus,
    [actionTypes.MAKE_NEXT_TO_FOCUS]: handleMakeNextToFocus,
    [actionTypes.FOCUS]: handleFocusing
  }
};

function makeFirstToFocus(state, firstToFocus) {
  return state.merge({ firstToFocus });
}

function handleFocusing(state) {
  if (state.get('firstToFocus')) {
    return state
        .update('focusedElement', () => state.get('firstToFocus'))
        .update('firstToFocus', () => '');
  } else {
    const currentlyFocused = state.get('focusedElement');
    const nextToFocus = state.get('focusNext').pop();

    return state
      .update('focusedElement', () => nextToFocus)
      .update('focusNext', focusNext => focusNext.unshift(currentlyFocused));
  }
}

function handleMakeNextToFocus(state, nextToFocus) {
  return state.update('focusNext', focusNext => focusNext.push(nextToFocus));
}
