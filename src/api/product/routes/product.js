"use strict";

/**
 * product router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::product.product", {
  config: {
    delete: {
      policies: ["is-product-owner"],
    },
    update: {
      policies: ["is-product-owner"],
    },
    create: {
      middlewares: ["api::product.current-user"],
    },
  },
});
