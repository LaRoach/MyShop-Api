"use strict";
const { errors } = require("@strapi/utils");
const { ForbiddenError, ValidationError } = errors;

/**
 * `current-user` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (!ctx.state.user) {
      throw new ForbiddenError("You are not authenticated.");
    }
    if (!ctx.request.body || !ctx.request.body.data) {
      throw new ValidationError("Request body is empty.");
    }

    const parsedData = JSON.parse(ctx.request.body.data);
    const newData = {
      ...parsedData,
      users_permissions_user: `${ctx.state.user.id}`,
    };
    const updatedJSONData = JSON.stringify(newData);
    ctx.request.body.data = updatedJSONData;
    return next();
  };
};
