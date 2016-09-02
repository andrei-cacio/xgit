const context = {};

module.exports = {
  hasElement(name) {
    return context.hasOwnProperty(name);
  },
  registerComponent(name, comp) {
    context[name] = comp;
  },
  getComponent(name) {
    return context[name];
  }
};
