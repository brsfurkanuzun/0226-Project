import api from '../../services/api';
import { toast } from 'react-toastify';
import {
  SET_CARDS,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_SELECTED_CARD,
  SET_CARD_LOADING,
} from './actionTypes';

export const setCards        = (list)    => ({ type: SET_CARDS,         payload: list });
export const addCardLocal    = (card)    => ({ type: ADD_CARD,          payload: card });
export const updateCardLocal = (card)    => ({ type: UPDATE_CARD,       payload: card });
export const deleteCardLocal = (id)      => ({ type: DELETE_CARD,       payload: id   });
export const setSelectedCard = (id)      => ({ type: SET_SELECTED_CARD, payload: id   });
export const setCardLoading  = (loading) => ({ type: SET_CARD_LOADING,  payload: loading });

/* GET /user/card */
export const fetchCards = () => async (dispatch) => {
  dispatch(setCardLoading(true));
  try {
    const res = await api.get('/user/card');
    dispatch(setCards(res.data));
  } catch (err) {
    console.error('fetchCards error:', err);
    toast.error('Kartlar yüklenemedi.');
  } finally {
    dispatch(setCardLoading(false));
  }
};

/* POST /user/card */
export const createCard = (data, onSuccess) => async (dispatch) => {
  dispatch(setCardLoading(true));
  try {
    const res = await api.post('/user/card', data);
    dispatch(addCardLocal(res.data));
    toast.success('Kart başarıyla eklendi!');
    if (onSuccess) onSuccess(res.data);
  } catch (err) {
    console.error('createCard error:', err);
    toast.error('Kart eklenemedi.');
  } finally {
    dispatch(setCardLoading(false));
  }
};

/* PUT /user/card */
export const updateCard = (data, onSuccess) => async (dispatch) => {
  dispatch(setCardLoading(true));
  try {
    const res = await api.put('/user/card', data);
    dispatch(updateCardLocal(res.data));
    toast.success('Kart güncellendi!');
    if (onSuccess) onSuccess(res.data);
  } catch (err) {
    console.error('updateCard error:', err);
    toast.error('Kart güncellenemedi.');
  } finally {
    dispatch(setCardLoading(false));
  }
};

/* DELETE /user/card/:id */
export const deleteCard = (cardId) => async (dispatch) => {
  dispatch(setCardLoading(true));
  try {
    await api.delete(`/user/card/${cardId}`);
    dispatch(deleteCardLocal(cardId));
    toast.success('Kart silindi.');
  } catch (err) {
    console.error('deleteCard error:', err);
    toast.error('Kart silinemedi.');
  } finally {
    dispatch(setCardLoading(false));
  }
};
