import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search, ShoppingCart, ChevronDown, Trash2, Plus, Minus,
  Menu, X, ClipboardList, LogOut,
} from 'lucide-react';
import md5 from 'md5';
import { UserMenuDesktop } from '../UserMenu';
import { removeFromCart, updateCartCount } from '../../store/actions/cartActions';
import { logoutUser } from '../../store/actions/clientActions';
import { buildCategoryUrl, genderSlug } from '../../utils/categoryUtils';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop', dropdown: true },
  { label: 'About',   to: '/about' },
  { label: 'Team',    to: '/team' },
  { label: 'Blog',    to: '#' },
  { label: 'Contact', to: '/contact' },
];

function gravatarUrl(email, size = 32) {
  if (!email) return `https://www.gravatar.com/avatar/?s=${size}&d=identicon`;
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

/* ── Shop / Categories dropdown ── */
function ShopDropdown({ onClose, vertical = false }) {
  const categories = useSelector((s) => s.product.categories);

  const kadin = categories.filter((c) => genderSlug(c.gender) === 'kadin');
  const erkek = categories.filter((c) => genderSlug(c.gender) === 'erkek');
  const other = categories.filter(
    (c) => genderSlug(c.gender) !== 'kadin' && genderSlug(c.gender) !== 'erkek'
  );

  const columns = [
    ...(kadin.length ? [{ label: 'Kadın', items: kadin }] : []),
    ...(erkek.length ? [{ label: 'Erkek', items: erkek }] : []),
    ...(other.length  ? [{ label: 'Diğer', items: other  }] : []),
  ];

  if (columns.length === 0) {
    return (
      <div className="px-6 py-4 text-center">
        <Link
          to="/shop"
          onClick={onClose}
          className="font-montserrat font-bold text-[14px] text-[#23a6f0] hover:underline"
        >
          Tüm Ürünler
        </Link>
      </div>
    );
  }

  return (
    <div className={vertical ? 'flex flex-col gap-4' : 'flex gap-0 divide-x divide-[#e8e8e8]'}>
      {columns.map(({ label, items }) => (
        <div key={label} className={vertical ? 'px-4' : 'flex-1 min-w-[140px] px-5 py-5'}>
          <p className="font-montserrat font-bold text-[14px] text-[#252b42] tracking-[0.1px] mb-3">
            {label}
          </p>
          <div className="flex flex-col gap-1.5">
            {items.map((cat) => {
              const rawName = cat.title ?? cat.name ?? '';
              const displayName = rawName.replace(/^(kadin|kadın|erkek)\s*/i, '').trim() || rawName;
              return (
                <Link
                  key={cat.id}
                  to={buildCategoryUrl(cat)}
                  onClick={onClose}
                  className="font-montserrat font-normal text-[14px] text-[#737373] hover:text-[#23a6f0] transition-colors py-0.5"
                >
                  {displayName}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Cart Dropdown ── */
function CartDropdown({ onClose }) {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.shoppingCart.cart);

  const totalItems = cart.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.count * (i.product.price ?? 0), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 px-6 text-center">
        <ShoppingCart className="w-10 h-10 text-[#bdbdbd]" />
        <p className="font-montserrat font-bold text-[14px] text-[#737373]">Sepetiniz boş</p>
        <Link
          to="/shop"
          onClick={onClose}
          className="bg-[#23a6f0] text-white font-montserrat font-bold text-[13px] px-4 py-2 rounded-[5px] hover:bg-[#2a7cc7] transition-colors"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="max-h-[340px] overflow-y-auto divide-y divide-[#f3f3f3]">
        {cart.map(({ product, count }) => (
          <div key={product.id} className="flex items-center gap-3 px-4 py-3">
            <div className="w-12 h-12 shrink-0 rounded-[4px] overflow-hidden bg-[#f9f9f9]">
              {product.images?.[0]?.url
                ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-[#e8e8e8]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-montserrat font-bold text-[13px] text-[#252b42] truncate leading-tight">
                {product.name}
              </p>
              <p className="font-montserrat font-normal text-[12px] text-[#737373] mt-0.5">
                ₺{product.price?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => dispatch(updateCartCount(product.id, count - 1))}
                className="w-6 h-6 flex items-center justify-center rounded border border-[#e8e8e8] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-montserrat font-bold text-[13px] text-[#252b42] w-6 text-center">
                {count}
              </span>
              <button
                onClick={() => dispatch(updateCartCount(product.id, count + 1))}
                className="w-6 h-6 flex items-center justify-center rounded border border-[#e8e8e8] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="font-montserrat font-bold text-[13px] text-[#23856d] shrink-0 w-16 text-right">
              ₺{(count * product.price).toFixed(2)}
            </span>
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="text-[#bdbdbd] hover:text-[#e74040] transition-colors cursor-pointer ml-1 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t border-[#e8e8e8] px-4 py-3 bg-[#fafafa]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-montserrat font-normal text-[13px] text-[#737373]">
            {totalItems} ürün
          </span>
          <span className="font-montserrat font-bold text-[15px] text-[#252b42]">
            Toplam: ₺{totalPrice.toFixed(2)}
          </span>
        </div>
        <Link
          to="/cart"
          onClick={onClose}
          className="w-full bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-montserrat font-bold text-[13px] py-2 rounded-[5px] flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Sepete Git
        </Link>
      </div>
    </div>
  );
}

/* ── Mobile slide-out menu ── */
function MobileMenu({ open, onClose }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((s) => s.client.user);
  const cartCount = useSelector((s) =>
    s.shoppingCart.cart.reduce((sum, i) => sum + i.count, 0)
  );
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  function isActive(to) {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[min(320px,85vw)] bg-white z-[70] shadow-2xl flex flex-col lg:hidden overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e8e8e8]">
          <span className="font-montserrat font-bold text-[20px] text-[#252b42]">Menu</span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#737373] hover:text-[#252b42] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User section */}
        <div className="px-4 py-4 border-b border-[#f3f3f3]">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={gravatarUrl(user.email, 48)}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-[#23a6f0] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-montserrat font-bold text-[14px] text-[#252b42] truncate">{user.name}</p>
                <p className="font-montserrat text-[12px] text-[#737373] truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="font-montserrat font-bold text-[14px] text-[#23a6f0] hover:underline"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-2">
          {NAV_LINKS.map(({ label, to, dropdown }) => {
            if (dropdown) {
              return (
                <div key={label}>
                  <button
                    onClick={() => setShopOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-4 py-3 font-montserrat font-bold text-[15px] tracking-[0.2px] transition-colors ${
                      isActive(to) ? 'text-[#252b42] bg-[#fafafa]' : 'text-[#737373]'
                    }`}
                  >
                    {label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {shopOpen && (
                    <div className="bg-[#fafafa] py-3 border-y border-[#f3f3f3]">
                      <ShopDropdown onClose={onClose} vertical />
                      <div className="px-4 pt-3">
                        <Link
                          to="/shop"
                          onClick={onClose}
                          className="font-montserrat font-bold text-[13px] text-[#23a6f0] hover:underline"
                        >
                          Tüm Ürünlere Git →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={label}
                to={to}
                onClick={onClose}
                className={`px-4 py-3 font-montserrat font-bold text-[15px] tracking-[0.2px] transition-colors ${
                  isActive(to) && to !== '#' ? 'text-[#252b42] bg-[#fafafa]' : 'text-[#737373] hover:text-[#252b42]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User actions */}
        {user && (
          <div className="border-t border-[#f3f3f3] py-2">
            <Link
              to="/orders"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 font-montserrat font-bold text-[14px] text-[#252b42] hover:bg-[#fafafa] transition-colors"
            >
              <ClipboardList className="w-4 h-4 text-[#23a6f0]" />
              Siparişlerim
            </Link>
            <button
              onClick={() => { dispatch(logoutUser()); onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-3 font-montserrat font-bold text-[14px] text-[#e74040] hover:bg-[#fef2f2] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </button>
          </div>
        )}

        {/* Quick actions */}
        <div className="mt-auto border-t border-[#e8e8e8] px-4 py-4 flex flex-col gap-2">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-between bg-[#23a6f0] text-white font-montserrat font-bold text-[14px] px-4 py-3 rounded-[5px] hover:bg-[#2a7cc7] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Sepetim
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[12px]">{cartCount}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const { pathname } = useLocation();
  const [cartOpen, setCartOpen]     = useState(false);
  const [shopOpen, setShopOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartRef = useRef(null);
  const shopRef = useRef(null);

  const cartCount = useSelector((s) =>
    s.shoppingCart.cart.reduce((sum, i) => sum + i.count, 0)
  );

  function isActive(to) {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  }

  useEffect(() => {
    function handleOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCartOpen(false);
    setShopOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="bg-white w-full border-b border-[#e8e8e8] flex items-center px-4 lg:px-[38px] h-[58px] shrink-0 relative z-50">

        {/* Logo */}
        <Link
          to="/"
          className="font-montserrat font-bold text-[20px] lg:text-[24px] text-[#252b42] tracking-[0.1px] whitespace-nowrap mr-auto lg:mr-[40px] hover:opacity-80 transition-opacity"
        >
          Bandage
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-[20px] flex-1">
          {NAV_LINKS.map(({ label, to, dropdown }) => {
            if (dropdown) {
              return (
                <div key={label} ref={shopRef} className="relative">
                  <button
                    onMouseEnter={() => setShopOpen(true)}
                    onClick={() => setShopOpen((o) => !o)}
                    className={`flex items-center gap-[4px] font-montserrat font-bold text-[14px] tracking-[0.2px] whitespace-nowrap transition-colors hover:text-[#252b42] cursor-pointer ${
                      isActive(to) ? 'text-[#252b42]' : 'text-[#737373]'
                    }`}
                  >
                    {label}
                    <ChevronDown className={`w-[14px] h-[14px] transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {shopOpen && (
                    <div
                      className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-[4px] shadow-[0px_8px_40px_rgba(0,0,0,0.15)] border border-[#e8e8e8] overflow-hidden z-50 min-w-[300px]"
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      <div className="absolute -top-[5px] left-[18px] w-2.5 h-2.5 bg-white border-l border-t border-[#e8e8e8] rotate-45" />
                      <ShopDropdown onClose={() => setShopOpen(false)} />
                      <div className="border-t border-[#f3f3f3] px-5 py-3">
                        <Link
                          to="/shop"
                          onClick={() => setShopOpen(false)}
                          className="font-montserrat font-bold text-[13px] text-[#23a6f0] hover:underline"
                        >
                          Tüm Ürünlere Git →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-[4px] font-montserrat font-bold text-[14px] tracking-[0.2px] whitespace-nowrap transition-colors hover:text-[#252b42] ${
                  isActive(to) && to !== '#' ? 'text-[#252b42]' : 'text-[#737373]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-[2px] lg:gap-[4px]">
          {/* Desktop user menu */}
          <div className="hidden lg:block">
            <UserMenuDesktop />
          </div>

          <button className="hidden sm:flex w-[40px] h-[40px] items-center justify-center text-[#737373] hover:text-[#23a6f0] transition-colors rounded-full cursor-pointer">
            <Search className="w-[16px] h-[16px]" />
          </button>

          {/* Cart */}
          <div ref={cartRef} className="relative">
            <button
              onClick={() => setCartOpen((o) => !o)}
              className="flex items-center gap-[5px] px-[8px] lg:px-[10px] h-[40px] text-[#23a6f0] hover:text-[#2a7cc7] transition-colors cursor-pointer relative"
            >
              <ShoppingCart className="w-[16px] h-[16px]" />
              <span className="hidden sm:inline font-montserrat font-normal text-[12px] tracking-[0.2px]">
                {cartCount}
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] bg-[#e74040] rounded-full flex items-center justify-center font-montserrat font-bold text-[9px] text-white leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-[min(380px,calc(100vw-16px))] bg-white rounded-[8px] shadow-[0px_8px_40px_rgba(0,0,0,0.15)] border border-[#e8e8e8] overflow-hidden">
                <div className="absolute -top-[6px] right-[18px] w-3 h-3 bg-white border-l border-t border-[#e8e8e8] rotate-45" />
                <div className="pt-1">
                  <CartDropdown onClose={() => setCartOpen(false)} />
                </div>
              </div>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-[40px] h-[40px] flex items-center justify-center text-[#252b42] hover:text-[#23a6f0] transition-colors ml-1"
            aria-label="Open menu"
          >
            <Menu className="w-[22px] h-[22px]" />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
