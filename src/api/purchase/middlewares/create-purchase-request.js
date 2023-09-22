"use strict";
const { v4: uuidv4 } = require("uuid");
const { errors } = require("@strapi/utils");
const { ForbiddenError, ValidationError } = errors;

/**
 * `create-purchase-request` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (!ctx.state.user) {
      throw new ForbiddenError("You are not authenticated.");
    }
    if (!ctx.request.body || !ctx.request.body.data) {
      throw new ValidationError("Request body is empty.");
    }
    const originalData = ctx.request.body.data;
    const newData = {
      ...originalData,
      user:  ctx.state.user.id,
      purchaseid: `MYSHOP-${uuidv4().substring(0, 7)}`,
      status: "Placed",
    };
    ctx.request.body.data = newData;
    await next();
  };
};
