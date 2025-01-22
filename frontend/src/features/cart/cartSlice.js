import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("userCart")) || [],
    userCartSummary: {
      totalCartItemsQty: getCartSummaryValueFromStorage().numberOfItemsInCart,
      totalCartItemsCost: getCartSummaryValueFromStorage().cartItemsCost,
    },
  },

  reducers: {
    addCartItem: (state, action) => {
      state.cartItems = [action.payload, ...state.cartItems];

      storeCartItemInLocalStorage(state.cartItems);

      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemsTotal(
        state.cartItems
      );

      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },

    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );

      storeCartItemInLocalStorage(state.cartItems);

      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemsTotal(
        state.cartItems
      );

      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },

    increaseCartQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.product_id === action.payload) {
          item.product_quantity = item.product_quantity + 1;
        }
        return item;
      });

      storeCartItemInLocalStorage(state.cartItems);

      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemsTotal(
        state.cartItems
      );

      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },
    decreaseCartQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.product_id === action.payload && item.product_quantity > 1) {
          item.product_quantity = item.product_quantity - 1;
        }
        return item;
      });

      storeCartItemInLocalStorage(state.cartItems);

      const { cartItemsCost, numberOfItemsInCart } = calculateCartItemsTotal(
        state.cartItems
      );

      state.userCartSummary = {
        totalCartItemsCost: cartItemsCost,
        totalCartItemsQty: numberOfItemsInCart,
      };
    },

    clearUserCart: (state, action) => {
      state.cartItems = [];
      state.userCartSummary = {
        totalCartItemsCost: 0,
        totalCartItemsQty: 0,
      };
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  increaseCartQuantity,
  decreaseCartQuantity,
  clearUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;

function calculateCartItemsTotal(cart) {
  let numberOfItemsInCart = 0;
  let cartItemsCost = 0;

  cart.forEach((item) => {
    numberOfItemsInCart += item.product_quantity;
    cartItemsCost += item.product_quantity * item.product_price;
  });

  localStorage.setItem(
    "cartSummary",
    JSON.stringify({ numberOfItemsInCart, cartItemsCost })
  );
  return {
    cartItemsCost,
    numberOfItemsInCart,
  };
}

function getCartSummaryValueFromStorage() {
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
