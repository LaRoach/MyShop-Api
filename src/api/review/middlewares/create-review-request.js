"use strict";
const { errors } = require("@strapi/utils");
const { ForbiddenError, ValidationError } = errors;
/**
 * `create-review-request` middleware
 */

module.exports = (config, { strapi }) => {
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
      user: ctx.state.user.id,
    };
    const updatedJSONData = JSON.stringify(newData);
    ctx.request.body.data = updatedJSONData;
    await next();
  };
};
