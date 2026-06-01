import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_SORT,
  SET_CATEGORY_ID,
  SET_PRODUCT_DETAIL,
  SET_DETAIL_FETCH_STATE,
} from './actionTypes';
import { FETCH_STATES } from '../reducers/productReducer';
import api from '../../services/api';

/* ── Action Creators ── */

export const setCategories  = (categories)  => ({ type: SET_CATEGORIES, payload: categories });

/* ── Thunk: Fetch categories ── */
export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await api.get('/categories');
    dispatch(setCategories(res.data));
  } catch (err) {
    console.error('fetchCategories error:', err);
  }
};
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setTotal       = (total)       => ({ type: SET_TOTAL,        payload: total });
export const setFetchState  = (fetchState)  => ({ type: SET_FETCH_STATE,  payload: fetchState });
export const setLimit       = (limit)       => ({ type: SET_LIMIT,        payload: limit });
export const setOffset      = (offset)      => ({ type: SET_OFFSET,       payload: offset });
export const setFilter           = (filter)      => ({ type: SET_FILTER,      payload: filter });
export const setSort             = (sort)        => ({ type: SET_SORT,        payload: sort   });
export const setCategoryId       = (id)          => ({ type: SET_CATEGORY_ID, payload: id     });
export const setProductDetail    = (product)     => ({ type: SET_PRODUCT_DETAIL,    payload: product });
export const setDetailFetchState = (state)       => ({ type: SET_DETAIL_FETCH_STATE, payload: state });

/* ── Thunk: Fetch single product by ID ── */
export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setDetailFetchState(FETCH_STATES.FETCHING));
  dispatch(setProductDetail(null));
  try {
    const res = await api.get(`/products/${productId}`);
    dispatch(setProductDetail(res.data));
    dispatch(setDetailFetchState(FETCH_STATES.FETCHED));
  } catch (err) {
    console.error('fetchProduct error:', err);
    dispatch(setDetailFetchState(FETCH_STATES.FAILED));
  }
};

/* ── Thunk: Fetch products ── */
export const fetchProducts = () => async (dispatch, getState) => {
  const { limit, offset, filter, sort, categoryId } = getState().product;

  dispatch(setFetchState(FETCH_STATES.FETCHING));

  try {
    const params = { limit, offset };
    if (categoryId) params.category = categoryId; // API param: "category"
    if (filter)     params.filter   = filter;
    if (sort)       params.sort     = sort;

    const res = await api.get('/products', { params });
    const { total, products } = res.data;

    dispatch(setTotal(total));
    dispatch(setProductList(products));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (err) {
    console.error('fetchProducts error:', err);
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};
