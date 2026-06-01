import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, Heart, ChevronDown, Trash2, Plus, Minus } from 'lucide-react';
import { UserMenuDesktop } from '../UserMenu';
import { removeFromCart, updateCartCount } from '../../store/actions/cartActions';
import { buildCategoryUrl, genderSlug, genderLabel } from '../../utils/categoryUtils';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop', dropdown: true },
  { label: 'About',   to: '/about' },
  { label: 'Team',    to: '/team' },
  { label: 'Blog',    to: '#' },
  { label: 'Contact', to: '/contact' },
];

/* ── Shop / Categories dropdown ── */
function ShopDropdown({ onClose }) {
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

  /* Fallback — no categories yet */
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
    <div className="flex gap-0 divide-x divide-[#e8e8e8]">
      {columns.map(({ label, items }) => (
        <div key={label} className="flex-1 min-w-[140px] px-5 py-5">
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
                  className="font-montserrat font-normal text-[14px] text-[#737373] hover:text-[#23a6f0] transition-colors py-0.5 whitespace-nowrap"
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
      {/* Item list */}
      <div className="max-h-[340px] overflow-y-auto divide-y divide-[#f3f3f3]">
        {cart.map(({ product, count }) => (
          <div key={product.id} className="flex items-center gap-3 px-4 py-3">
            {/* Image */}
            <div className="w-12 h-12 shrink-0 rounded-[4px] overflow-hidden bg-[#f9f9f9]">
              {product.images?.[0]?.url
                ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-[#e8e8e8]" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-montserrat font-bold text-[13px] text-[#252b42] truncate leading-tight">
                {product.name}
              </p>
              <p className="font-montserrat font-normal text-[12px] text-[#737373] mt-0.5">
                ₺{product.price?.toFixed(2)}
              </p>
            </div>

            {/* Count controls */}
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

            {/* Subtotal */}
            <span className="font-montserrat font-bold text-[13px] text-[#23856d] shrink-0 w-16 text-right">
              ₺{(count * product.price).toFixed(2)}
            </span>

            {/* Remove */}
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="text-[#bdbdbd] hover:text-[#e74040] transition-colors cursor-pointer ml-1 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
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

/* ═══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const { pathname } = useLocation();
  const [cartOpen, setCartOpen]   = useState(false);
  const [shopOpen, setShopOpen]   = useState(false);
  const cartRef = useRef(null);
  const shopRef = useRef(null);

  const cartCount = useSelector((s) =>
    s.shoppingCart.cart.reduce((sum, i) => sum + i.count, 0)
  );

  function isActive(to) {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  }

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    function handleOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <nav className="bg-white h-[58px] w-full border-b border-[#e8e8e8] flex items-center px-[38px] shrink-0 relative z-50">

      {/* Logo */}
      <Link
        to="/"
        className="font-montserrat font-bold text-[24px] text-[#252b42] tracking-[0.1px] whitespace-nowrap mr-[40px] hover:opacity-80 transition-opacity"
      >
        Bandage
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-[20px] flex-1">
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
                    {/* Arrow */}
                    <div className="absolute -top-[5px] left-[18px] w-2.5 h-2.5 bg-white border-l border-t border-[#e8e8e8] rotate-45" />
                    <ShopDropdown onClose={() => setShopOpen(false)} />
                    {/* All products link */}
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
      <div className="flex items-center gap-[4px]">
        <UserMenuDesktop />

        <button className="w-[40px] h-[40px] flex items-center justify-center text-[#737373] hover:text-[#23a6f0] transition-colors rounded-full cursor-pointer">
          <Search className="w-[16px] h-[16px]" />
        </button>

        {/* Cart button with dropdown */}
        <div ref={cartRef} className="relative">
          <button
            onClick={() => setCartOpen((o) => !o)}
            className="flex items-center gap-[5px] px-[10px] h-[40px] text-[#23a6f0] hover:text-[#2a7cc7] transition-colors cursor-pointer relative"
          >
            <ShoppingCart className="w-[16px] h-[16px]" />
            <span className="font-montserrat font-normal text-[12px] tracking-[0.2px]">
              {cartCount}
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] bg-[#e74040] rounded-full flex items-center justify-center font-montserrat font-bold text-[9px] text-white leading-none">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {cartOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-[380px] bg-white rounded-[8px] shadow-[0px_8px_40px_rgba(0,0,0,0.15)] border border-[#e8e8e8] overflow-hidden">
              {/* Arrow */}
              <div className="absolute -top-[6px] right-[18px] w-3 h-3 bg-white border-l border-t border-[#e8e8e8] rotate-45" />
              <div className="pt-1">
                <CartDropdown onClose={() => setCartOpen(false)} />
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-[5px] px-[10px] h-[40px] text-[#23a6f0] hover:text-[#2a7cc7] transition-colors cursor-pointer">
          <Heart className="w-[16px] h-[16px]" />
          <span className="font-montserrat font-normal text-[12px] tracking-[0.2px]">0</span>
        </button>
      </div>
    </nav>
  );
}
