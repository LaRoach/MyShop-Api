"use strict";
const { errors } = require("@strapi/utils");
const { ForbiddenError, NotFoundError } = errors;

/**
 * `is-review-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Check if the user is authenticated
  if (!policyContext.state.user) {
    throw new ForbiddenError("You are not authenticated.");
  }
  // Get the review ID from the request parameters
  const reviewId = policyContext.params.id;
  // Retrieve the review from the database
  const review = await strapi.entityService.findOne(
    "api::review.review",
    reviewId,
    {
      populate: { user: true },
    }
  );
  // Check if the review exists
  if (!review) {
    throw new NotFoundError("Review not found.");
  }
  // Check if the authenticated user is the owner of the review
  if (review.user.id !== policyContext.state.user.id) {
    throw new ForbiddenError("You are not the owner of this review.");
  }
  return true;
};
