"use strict";

/**
 * cart router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::cart.cart", {
  config: {
    update: {
      policies: ["update-only-my-cart"],
    },
  },
});