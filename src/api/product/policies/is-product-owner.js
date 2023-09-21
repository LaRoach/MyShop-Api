"use strict";
const { errors } = require("@strapi/utils");
const { ForbiddenError, NotFoundError } = errors;

/**
 * `is-product-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Check if the user is authenticated
  if (!policyContext.state.user) {
    throw new ForbiddenError("You are not authenticated.");
  }
  // Get the product ID from the request parameters
  const productId = policyContext.params.id;
  // Retrieve the product from the database
  const product = await strapi.entityService.findOne(
    "api::product.product",
    productId,
    {
      populate: { users_permissions_user: true },
    }
  );
  // Check if the product exists
  if (!product) {
    throw new NotFoundError("Product not found.");
  }
  // Check if the authenticated user is the owner of the product
  if (product.users_permissions_user.id !== policyContext.state.user.id) {
    throw new ForbiddenError("You are not the owner of this product.");
  }
  return true;
};
