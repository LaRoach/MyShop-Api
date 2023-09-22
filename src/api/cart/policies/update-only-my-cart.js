"use strict";
const { errors } = require("@strapi/utils");
const { ForbiddenError, NotFoundError } = errors;
/**
 * `update-only-my-cart` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Check if the user is authenticated
  if (!policyContext.state.user) {
    throw new ForbiddenError("You are not authenticated.");
  }
  // Get the cart id from the request parameters
  const cartId = policyContext.params.id;
  const currentUserId = policyContext.state.user.id;
  // Retrieve the currentUser's carts from the database
  const user = await strapi.entityService.findOne(
    "plugin::users-permissions.user",
    currentUserId,
    {
      populate: { cart: true },
    }
  );

  // Check if the product exists
  if (!user) {
    throw new NotFoundError("No logged in user.");
  }

  if (user.cart && user.cart.id == cartId) {
    return true;
  } else {
    throw new ForbiddenError("Not Authorized to update this cart.");
  }
};
