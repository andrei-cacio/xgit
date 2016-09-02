const blessedBox = require('blessed').box;
const blessedList = require('blessed').list;

const gitStatusBox = blessedBox({
  top: 'center',
  left: '50%',
  width: '50%',
  height: '78%',
  label: 'Staged files',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'red'
    }
  }
});

const style = {
  top: '30%',
  border: {
    bg: 'white'
  },
  selected: {
    fg: '#ff9999'
  },
  item: {
    fg: 'red'
  }
}

function mount(data, screen) {
 if (data.files.length) {
    const list = blessedList({
      items: data.files,
      keys: true,
      style: style,
      vi: true,
      parent: gitStatusBox
    });

    list.focus();
  } else {
   gitStatusBox.setContent('{center}{yellow-fg}Nothing to show {/yellow-fg}{/center}');
 }

  screen.append(gitStatusBox);
  screen.render();
}

module.exports = { mount };
