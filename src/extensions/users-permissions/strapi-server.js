module.exports = (plugin) => {
  plugin.controllers.user.find = (ctx) => {
    if (!ctx.state.user) {
      return ctx.forbidden("You are not authenticated.");
    }
    return ctx.state.user;
  };

  return plugin;
};
