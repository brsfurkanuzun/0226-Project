import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import MobilePage from './pages/MobilePage';
import SignupPage from './pages/SignupPage';
import LoginPage  from './pages/LoginPage';
import ShopPage          from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage          from './pages/CartPage';
import OrderPage         from './pages/OrderPage';
import OrdersPage        from './pages/OrdersPage';
import About    from './pages/About';
import TeamPage     from './pages/TeamPage';
import ContactPage  from './pages/ContactPage';
import ProtectedRoute    from './components/ProtectedRoute';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('App error boundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#fafafa] font-montserrat">
          <svg className="w-12 h-12 text-[#e74040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="font-bold text-[18px] text-[#252b42]">Bir şeyler ters gitti</p>
          <p className="text-[14px] text-[#737373] max-w-[400px] text-center">{this.state.error?.message}</p>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="bg-[#23a6f0] text-white font-bold text-[14px] px-6 py-2 rounded-[5px] hover:bg-[#2a7cc7] transition-colors"
          >
            Sıfırla ve Ana Sayfaya Dön
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
            <>
              {/* Desktop: md breakpoint ve üzeri */}
              <div className="hidden md:block">
                <HomePage />
              </div>
              {/* Mobile: md breakpoint altı */}
              <div className="block md:hidden">
                <MobilePage />
              </div>
            </>
          )} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
          <Route path="/shop"        component={ShopPage} />
          <Route path="/cart"        component={CartPage} />
          <ProtectedRoute path="/order"  component={OrderPage} />
          <ProtectedRoute path="/orders" component={OrdersPage} />
          <Route path="/signup"      component={SignupPage} />
          <Route path="/login"       component={LoginPage} />
          <Route path="/about"       component={About} />
          <Route path="/team"        component={TeamPage} />
          <Route path="/contact"     component={ContactPage} />
        </Switch>
        <ToastContainer position="bottom-right" theme="light" />
      </Router>
    </ErrorBoundary>
  );
}
