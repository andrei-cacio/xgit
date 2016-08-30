const blessedBox = require('blessed').box;
const blessedList = require('blessed').list;

const gitStatusBox = blessedBox({
  top: 'center',
  left: '50%',
  width: '50%',
  height: '80%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'blue'
    }
  }
});

const style = {
  top: 'center',
  border: {
    bg: 'white'
  },
  selected: {
    fg: 'blue'
  },
  item: {
    fg: 'yellow'
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
  }

  screen.append(gitStatusBox);
  screen.render();
}

module.exports = { mount };
