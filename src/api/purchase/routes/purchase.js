"use strict";

/**
 * purchase router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::purchase.purchase", {
  config: {
    create: {
      middlewares: ["api::purchase.create-purchase-request"],
    },
  },
});
