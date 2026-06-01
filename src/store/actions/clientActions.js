import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from './actionTypes';
import api from '../../services/api';

/* ── Action Creators ── */

export const setUser = (user, token) => ({
  type: SET_USER,
  payload: { user, token },
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

/* ── Thunk: Fetch roles only when not yet loaded ── */
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles && roles.length > 0) return; // already fetched — skip

  try {
    const res = await api.get('/roles');
    dispatch(setRoles(res.data));
  } catch (err) {
    console.error('fetchRoles error:', err);
  }
};

/* ── Thunk: POST /login ── */
export const loginUser = ({ email, password, rememberMe }) => async (dispatch) => {
  const res = await api.post('/login', { email, password });
  const { token, name, email: userEmail, role_id } = res.data;

  const user = { name, email: userEmail, role_id };

  if (rememberMe) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /* attach token to all future axios requests */
  api.defaults.headers.common['Authorization'] = token;

  dispatch(setUser(user, token));
  return res.data;
};

/* ── Thunk: Verify token on app start ── */
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return; // no token → nothing to do

  // Attach token to axios BEFORE the request (no Bearer prefix)
  api.defaults.headers.common['Authorization'] = token;

  try {
    const res = await api.get('/verify');
    const { token: newToken, name, email, role_id } = res.data;

    const user = { name, email, role_id };

    // Renew token in localStorage and axios header
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = newToken;

    dispatch(setUser(user, newToken));
  } catch {
    // Token expired or invalid — clean up completely
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    dispatch(setUser(null, null));
  }
};

/* ── Thunk: Logout ── */
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
  dispatch(setUser(null, null));
};
