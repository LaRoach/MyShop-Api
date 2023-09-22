"use strict";

/**
 * `remove-purchaseitems-from-cart` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    //if purchase as successfully created
    if (
      ctx.request.url === "/api/purchases" &&
      ctx.request.method === "POST" &&
      ctx.response.status === 200
    ) {
      //fetch purchased product ids
      const productsOrderedArray =
        ctx.response.body.data.attributes.products.map(
          (product) => product.productid
        );

      //fetch current user's cart
      const userCart = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.state.user.id,
        {
          populate: { cart: true },
        }
      );

      //updatecart to remove products already purchased
      if (
        userCart.cart.products.length !== 0 &&
        userCart.cart.products.some((products) =>
          productsOrderedArray.includes(products.productid)
        )
      ) {
        await strapi.entityService.update("api::cart.cart", userCart.cart.id, {
          data: {
            products: userCart.cart.products.filter(
              (products) => !productsOrderedArray.includes(products.productid)
            ),
          },
        });
      }
    }
  };
};
