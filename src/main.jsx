import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { verifyToken } from './store/actions/clientActions';
import { fetchCategories } from './store/actions/productActions';
import './index.css';
import App from './App.jsx';

/* ── Bootstrap: verify token + preload categories ── */
store.dispatch(verifyToken());
store.dispatch(fetchCategories());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
