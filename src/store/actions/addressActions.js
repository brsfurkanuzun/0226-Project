import api from '../../services/api';
import { toast } from 'react-toastify';
import {
  SET_ADDRESSES,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_SELECTED_ADDRESS,
  SET_ADDRESS_LOADING,
} from './actionTypes';

export const setAddresses       = (list)    => ({ type: SET_ADDRESSES,        payload: list });
export const addAddressLocal    = (addr)    => ({ type: ADD_ADDRESS,           payload: addr });
export const updateAddressLocal = (addr)    => ({ type: UPDATE_ADDRESS,        payload: addr });
export const deleteAddressLocal = (id)      => ({ type: DELETE_ADDRESS,        payload: id });
export const setSelectedAddress = (id)      => ({ type: SET_SELECTED_ADDRESS,  payload: id });
export const setAddressLoading  = (loading) => ({ type: SET_ADDRESS_LOADING,   payload: loading });

/* GET /user/address */
export const fetchAddresses = () => async (dispatch) => {
  dispatch(setAddressLoading(true));
  try {
    const res = await api.get('/user/address');
    dispatch(setAddresses(res.data));
  } catch (err) {
    console.error('fetchAddresses error:', err);
    toast.error('Adresler yüklenemedi.');
  } finally {
    dispatch(setAddressLoading(false));
  }
};

/* POST /user/address */
export const createAddress = (data, onSuccess) => async (dispatch) => {
  dispatch(setAddressLoading(true));
  try {
    const res = await api.post('/user/address', data);
    dispatch(addAddressLocal(res.data));
    toast.success('Adres başarıyla eklendi!');
    if (onSuccess) onSuccess(res.data);
  } catch (err) {
    console.error('createAddress error:', err);
    toast.error('Adres eklenemedi.');
  } finally {
    dispatch(setAddressLoading(false));
  }
};

/* PUT /user/address */
export const updateAddress = (data, onSuccess) => async (dispatch) => {
  dispatch(setAddressLoading(true));
  try {
    const res = await api.put('/user/address', data);
    dispatch(updateAddressLocal(res.data));
    toast.success('Adres güncellendi!');
    if (onSuccess) onSuccess(res.data);
  } catch (err) {
    console.error('updateAddress error:', err);
    toast.error('Adres güncellenemedi.');
  } finally {
    dispatch(setAddressLoading(false));
  }
};

/* DELETE /user/address/:id */
export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch(setAddressLoading(true));
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch(deleteAddressLocal(addressId));
    toast.success('Adres silindi.');
  } catch (err) {
    console.error('deleteAddress error:', err);
    toast.error('Adres silinemedi.');
  } finally {
    dispatch(setAddressLoading(false));
  }
};
