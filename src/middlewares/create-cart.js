"use strict";

/**
 * `create-cart` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // only if path was register and it was successful
    await next();
    if (
      ctx.request.url === "/api/auth/local/register" &&
      ctx.response.status === 200
    ) {
      if (ctx.response && ctx.response.body && ctx.response.body.user) {
        await strapi.entityService.create("api::cart.cart", {
          data: {
            name: `${ctx.response.body.user.username}'s cart`,
            products: [],
            user: ctx.response.body.user.id,
            publishedAt: new Date().getTime(),
          },
        });
      }
    }
  };
};
