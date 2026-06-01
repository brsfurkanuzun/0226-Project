import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../actions/actionTypes';

/* Restore persisted user/token from localStorage on first load */
const storedUser  = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  user:        storedUser ? JSON.parse(storedUser) : null,
  token:       storedToken ?? null,
  addressList: [],
  creditCards: [],
  roles:       [],
  theme:       'light',
  language:    'tr',
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user, token: action.payload.token ?? state.token };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
