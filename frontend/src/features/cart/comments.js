/**
 * This file defines the reducer and actions for the cart slice of the Redux store.
 * The cart slice manages the state of the shopping cart, including the cart items,
 * the total number of items in the cart, and the total cost of the items in the cart.
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * The initial state of the cart slice.
 */
const initialState = {
  /**
   * The cart items.
   */
  cartItems: JSON.parse(localStorage.getItem("userCart")) || [],

  /**
   * The user cart summary.
   */
  userCartSummary: {
    /**
     * The total number of items in the cart.
     */
    totalCartItemsQty: getCartSummaryValuesFromStorage().numberOfItemsInCart,

    /**
     * The total cost of the items in the cart.
     */
    totalCartItemsCost: getCartSummaryValuesFromStorage().cartItemsCost,
  },
};

/**
 * The reducer for the cart slice.
 */
const cartSlice = createSlice({
  /**
   * The name of the slice.
   */
  name: "cart",

  /**
   * The initial state of the slice.
   */
  initialState,

  /**
   * The reducers for the slice.
   */
  reducers: {
    /**
     * Adds a cart item to the cart.
     *
     * @param {object} state The current state of the slice.
     * @param {object} action The action that was dispatched.
     */
    addCartItem: (state, action) => {
      /**
       * Add the cart item to the beginning of the cart items array.
       */
      state.cartItems = [action.payload, ...state.cartItems];

      /**
       * Store the cart item in local storage.
       */
      storeCartItemInLocalStorage(state.cartItems);

      /**
       * Calculate the total number of items in the cart and the total cost of the items in the cart.
       */
      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemTotal(
        state.cartItems
      );

      /**
       * Update the user cart summary with the new values.
       */
      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },

    /**
     * Deletes a cart item from the cart.
     *
     * @param {object} state The current state of the slice.
     * @param {object} action The action that was dispatched.
     */
    deleteCartItem: (state, action) => {
      /**
       * Filter the cart items to remove the cart item with the specified product ID.
       */
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );

      /**
       * Store the cart item in local storage.
       */
      storeCartItemInLocalStorage(state.cartItems);

      /**
       * Calculate the total number of items in the cart and the total cost of the items in the cart.
       */
      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemTotal(
        state.cartItems
      );

      /**
       * Update the user cart summary with the new values.
       */
      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },

    /**
     * Increases the quantity of a cart item.
     *
     * @param {object} state The current state of the slice.
     * @param {object} action The action that was dispatched.
     */
    increaseCartItemQty: (state, action) => {
      /**
       * Map over the cart items and increase the quantity of the cart item with the specified product ID.
       */
      state.cartItems = state.cartItems.map((item) => {
        if (item.product_id === action.payload) {
          /**
           * Increase the quantity of the cart item by 1.
           */
          item.product_quantity = item.product_quantity + 1;
        }

        /**
         * Return the updated cart item.
         */
        return item;
      });

      /**
       * Store the cart item in local storage.
       */
      storeCartItemInLocalStorage(state.cartItems);

      /**
       * Calculate the total number of items in the cart and the total cost of the items in the cart.
       */
      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemTotal(
        state.cartItems
      );

      /**
       * Update the user cart summary with the new values.
       */
      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },

    /**
     * Decreases the quantity of a cart item.
     *
     * @param {object} state The current state of the slice.
     * @param {object} action The action that was dispatched.
     */
    decreaseCartItemQty: (state, action) => {
      /**
       * Map over the cart items and decrease the quantity of the cart item with the specified product ID.
       */
      state.cartItems = state.cartItems.map((item) => {
        /**
         * If the cart item with the specified product ID has a quantity greater than 1, decrease the quantity of the cart item by 1.
         */
        if (item.product_id === action.payload && item.product_quantity > 1) {
          item.product_quantity = item.product_quantity - 1;
        }

        /**
         * Return the updated cart item.
         */
        return item;
      });

      /**
       * Store the cart item in local storage.
       */
      storeCartItemInLocalStorage(state.cartItems);

      /**
       * Calculate the total number of items in the cart and the total cost of the items in the cart.
       */
      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemTotal(
        state.cartItems
      );

      /**
       * Update the user cart summary with the new values.
       */
      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },
  },
});

/**
 * The actions for the cart slice.
 */
export const {
  addCartItem,
  deleteCartItem,
  increaseCartItemQty,
  decreaseCartItemQty,
} = cartSlice.actions;

/**
 * The default export for the cart slice.
 */
export default cartSlice.reducer;

/**
 * A helper function to calculate the total number of items in the cart and the total cost of the items in the cart.
 *
 * @param {array} cart The cart items.
 * @returns {object} An object containing the total number of items in the cart and the total cost of the items in the cart.
 */
function calculateCartItemTotal(cart) {
  /**
   * The total number of items in the cart.
   */
  let numberOfItemsInCart = 0;

  /**
   * The total cost of the items in the cart.
   */
  let cartItemsCost = 0;

  /**
   * Iterate over the cart items and calculate the total number of items in the cart and the total cost of the items in the cart.
   */
  cart.forEach((item) => {
    /**
     * Add the quantity of the cart item to the total number of items in the cart.
     */
    numberOfItemsInCart += item.product_quantity;

    /**
     * Add the cost of the cart item to the total cost of the items in the cart.
     */
    cartItemsCost += item.product_quantity * item.product_price;
  });

  /**
   * Store the total number of items in the cart and the total cost of the items in the cart in local storage.
   */
  localStorage.setItem(
    "cartSummary",
    JSON.stringify({ numberOfItemsInCart, cartItemsCost })
  );

  /**
   * Return the total number of items in the cart and the total cost of the items in the cart.
   */
  return {
    cartItemsCost,
    numberOfItemsInCart,
  };
}

/**
 * A helper function to get the cart summary values from local storage.
 *
 * @returns {object} An object containing the total number of items in the cart and the total cost of the items in the cart.
 */
function getCartSummaryValuesFromStorage() {
  return {
    cartItemsCost:
      JSON.parse(localStorage.getItem("cartSummary")) === null
        ? 0
        : JSON.parse(localStorage.getItem("cartSummary")).cartItemsCost,
    numberOfItemsInCart:
      JSON.parse(localStorage.getItem("cartSummary")) === null
        ? 0
        : JSON.parse(localStorage.getItem("cartSummary")).numberOfItemsInCart,
  };
}

function storeCartItemInLocalStorage(cart) {
  localStorage.setItem("userCart", JSON.stringify(cart));
}
