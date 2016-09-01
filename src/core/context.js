const context = {};

module.exports = {
  registerComponent(name, comp) {
    context[name] = comp;
  },
  getComponent(name) {
    return context[name];
  }
};
