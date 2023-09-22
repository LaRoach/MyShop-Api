"use strict";

/**
 * review router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::review.review", {
  config: {
    update: {
      policies: ["is-review-owner"],
    },
    delete: {
      policies: ["is-review-owner"],
    },
    create: {
      middlewares: ["api::review.create-review-request"],
    },
  },
});
