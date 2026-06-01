import api from '../../services/api';
import { RESET_CART, SET_ORDERS, SET_ORDERS_LOADING } from './actionTypes';

export const resetCart        = ()        => ({ type: RESET_CART });
export const setOrders        = (orders)  => ({ type: SET_ORDERS,         payload: orders  });
export const setOrdersLoading = (loading) => ({ type: SET_ORDERS_LOADING, payload: loading });

/* GET /order */
export const fetchOrders = () => async (dispatch) => {
  dispatch(setOrdersLoading(true));
  try {
    const res = await api.get('/order');
    dispatch(setOrders(res.data));
  } catch (err) {
    console.error('fetchOrders error:', err);
  } finally {
    dispatch(setOrdersLoading(false));
  }
};

/**
 * POST /order
 *
 * payload: {
 *   address_id, order_date, card_no, card_name,
 *   card_expire_month, card_expire_year, card_ccv,
 *   price,
 *   products: [{ product_id, count, detail }]
 * }
 *
 * onSuccess(response) is called after the cart is reset so the
 * caller can switch to the success screen.
 */
export const submitOrder = (payload, onSuccess, onError) => async (dispatch) => {
  try {
    const res = await api.post('/order', payload);
    dispatch(resetCart());
    if (onSuccess) onSuccess(res.data);
  } catch (err) {
    console.error('submitOrder error:', err);
    const msg =
      err?.response?.data?.message ||
      'Sipariş oluşturulamadı. Lütfen tekrar deneyin.';
    if (onError) onError(msg);
  }
};
