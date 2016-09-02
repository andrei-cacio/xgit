const blessedList = require('blessed').list;

module.exports = function getList(items, config) {
  const style = {
    top: 'center',
    border: {
      bg: 'white'
    },
    selected: {
      fg: config.colors.selected
    },
    item: {
      fg: config.colors.item
    }
  };

  return list = blessedList({
    items: items,
    keys: true,
    style: style,
    vi: true,
    parent: config.parent
  });
}
