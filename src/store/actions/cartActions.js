import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_COUNT,
  TOGGLE_CART_ITEM,
  SET_CART,
} from './actionTypes';

export const addToCart       = (product)              => ({ type: ADD_TO_CART,       payload: product });
export const removeFromCart  = (productId)            => ({ type: REMOVE_FROM_CART,  payload: productId });
export const updateCartCount = (productId, count)     => ({ type: UPDATE_CART_COUNT, payload: { productId, count } });
export const toggleCartItem  = (productId)            => ({ type: TOGGLE_CART_ITEM,  payload: productId });
export const setCart         = (cart)                 => ({ type: SET_CART,          payload: cart });
