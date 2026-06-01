import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, ShoppingCart, Tag } from 'lucide-react';
import TopBar  from '../components/layout/TopBar';
import Navbar  from '../components/layout/Navbar';
import Footer  from '../components/layout/Footer';
import {
  removeFromCart,
  updateCartCount,
  toggleCartItem,
} from '../store/actions/cartActions';

/* ════════════════════════════════════════════════════════════════ */
export default function CartPage() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const cart     = useSelector((s) => s.shoppingCart.cart);

  const [couponCode,    setCouponCode]    = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError,   setCouponError]   = useState('');

  /* Totals based on checked items only */
  const checkedItems  = cart.filter((i) => i.checked);
  const subtotal      = checkedItems.reduce((s, i) => s + i.count * i.product.price, 0);
  const shippingFee   = subtotal > 500 ? 0 : subtotal === 0 ? 0 : 29.99;
  const discount      = couponApplied ? +(subtotal * 0.1).toFixed(2) : 0;
  const grandTotal    = subtotal + shippingFee - discount;
  const checkedCount  = checkedItems.reduce((s, i) => s + i.count, 0);
  const allChecked    = cart.length > 0 && cart.every((i) => i.checked);

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === 'BANDAGE10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Geçersiz kupon kodu');
    }
  }

  function toggleAll() {
    const next = !allChecked;
    cart.forEach((item) => {
      if (item.checked !== next) dispatch(toggleCartItem(item.product.id));
    });
  }

  /* ── Empty state ── */
  if (cart.length === 0) {
    return (
      <div className="bg-[#fafafa] flex flex-col min-h-screen font-montserrat">
        <TopBar />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24 px-4 text-center">
          <div className="w-24 h-24 bg-[#f3f3f3] rounded-full flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-[#bdbdbd]" />
          </div>
          <div>
            <p className="font-bold text-[24px] text-[#252b42] tracking-[0.1px] mb-2">Sepetiniz boş</p>
            <p className="font-normal text-[14px] text-[#737373] tracking-[0.2px]">
              Henüz sepetinize ürün eklemediniz.
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-bold text-[14px] tracking-[0.2px] px-8 py-3 rounded-[5px]"
          >
            <ShoppingBag className="w-5 h-5" />
            Alışverişe Başla
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] flex flex-col min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="w-full bg-[#fafafa] py-5">
        <div className="max-w-[1050px] mx-auto px-4 flex items-center gap-2">
          <Link to="/"    className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd]" />
          <Link to="/shop" className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Shop</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd]" />
          <span className="font-normal text-[14px] text-[#737373]">Sepet</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="w-full max-w-[1050px] mx-auto px-4 pb-20">
        <h1 className="font-bold text-[24px] text-[#252b42] tracking-[0.1px] mb-6">
          Alışveriş Sepetim
          <span className="ml-2 font-normal text-[16px] text-[#737373]">
            ({cart.reduce((s, i) => s + i.count, 0)} ürün)
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── TABLE ── */}
          <div className="flex-1 min-w-0">
            {/* Table head */}
            <div className="hidden md:grid grid-cols-[40px_1fr_120px_140px_120px_48px] gap-x-4 items-center bg-white border border-[#e8e8e8] rounded-t-[8px] px-4 py-3">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="w-[18px] h-[18px] accent-[#23a6f0] cursor-pointer"
              />
              <span className="font-bold text-[13px] text-[#737373] tracking-[0.2px] uppercase">Ürün</span>
              <span className="font-bold text-[13px] text-[#737373] tracking-[0.2px] uppercase text-right">Fiyat</span>
              <span className="font-bold text-[13px] text-[#737373] tracking-[0.2px] uppercase text-center">Adet</span>
              <span className="font-bold text-[13px] text-[#737373] tracking-[0.2px] uppercase text-right">Toplam</span>
              <span />
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y divide-[#f3f3f3] border border-t-0 border-[#e8e8e8] rounded-b-[8px] bg-white overflow-hidden">
              {cart.map(({ product, count, checked }, idx) => (
                <div
                  key={product.id}
                  className={`grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1fr_120px_140px_120px_48px] gap-x-4 items-center px-4 py-4 transition-colors ${
                    checked ? 'bg-white' : 'bg-[#fafafa]'
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => dispatch(toggleCartItem(product.id))}
                    className="w-[18px] h-[18px] accent-[#23a6f0] cursor-pointer"
                  />

                  {/* Product info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-[64px] h-[64px] shrink-0 rounded-[6px] overflow-hidden bg-[#f9f9f9] border border-[#e8e8e8]">
                      {product.images?.[0]?.url
                        ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-[#e8e8e8]" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[14px] text-[#252b42] tracking-[0.1px] leading-[20px] line-clamp-2">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="font-normal text-[12px] text-[#bdbdbd] tracking-[0.2px] line-clamp-1 mt-0.5">
                          {product.description}
                        </p>
                      )}
                      {/* Mobile: price under name */}
                      <p className="font-bold text-[13px] text-[#23856d] mt-1 md:hidden">
                        ₺{product.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Unit price — hidden on mobile */}
                  <p className="hidden md:block font-bold text-[14px] text-[#252b42] tracking-[0.1px] text-right">
                    ₺{product.price?.toFixed(2)}
                  </p>

                  {/* Quantity — spans 2 cols on mobile grid */}
                  <div className="col-span-1 md:col-span-1 flex items-center justify-center gap-1">
                    <button
                      onClick={() => dispatch(updateCartCount(product.id, count - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-[5px] border border-[#e8e8e8] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-[14px] text-[#252b42]">
                      {count}
                    </span>
                    <button
                      onClick={() => dispatch(updateCartCount(product.id, count + 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-[5px] border border-[#e8e8e8] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line total — hidden on mobile */}
                  <p className="hidden md:block font-bold text-[14px] text-[#23856d] tracking-[0.1px] text-right">
                    ₺{(count * product.price).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    title="Kaldır"
                    className="w-9 h-9 flex items-center justify-center text-[#bdbdbd] hover:text-[#e74040] transition-colors cursor-pointer rounded-[5px] hover:bg-[#fef2f2]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Table footer: select-all */}
            <div className="flex items-center mt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="w-[16px] h-[16px] accent-[#23a6f0] cursor-pointer"
                />
                <span className="font-bold text-[13px] text-[#737373] tracking-[0.2px]">
                  Tümünü {allChecked ? 'Seçimi Kaldır' : 'Seç'}
                </span>
              </label>
            </div>
          </div>

          {/* ── ORDER SUMMARY PANEL ── */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white border border-[#e8e8e8] rounded-[8px] overflow-hidden sticky top-4">

              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-[#e8e8e8]">
                <h2 className="font-bold text-[20px] text-[#252b42] tracking-[0.1px]">
                  Sipariş Özeti
                </h2>
                <p className="font-normal text-[13px] text-[#737373] tracking-[0.2px] mt-1">
                  {checkedCount > 0
                    ? `${checkedCount} ürün seçili`
                    : 'Sepetinizdeki ürünleri seçin'}
                </p>
              </div>

              {/* Price breakdown */}
              <div className="px-6 py-5 flex flex-col gap-4">

                {/* Products total */}
                <div className="flex justify-between items-center">
                  <span className="font-normal text-[14px] text-[#737373] tracking-[0.2px]">
                    Ürün Toplamı
                  </span>
                  <span className="font-bold text-[14px] text-[#252b42] tracking-[0.1px]">
                    ₺{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-normal text-[14px] text-[#737373] tracking-[0.2px]">
                      Kargo Ücreti
                    </span>
                    {subtotal > 0 && subtotal < 500 && (
                      <p className="font-normal text-[11px] text-[#bdbdbd] mt-0.5">
                        500₺ üzeri ücretsiz
                      </p>
                    )}
                  </div>
                  <span className={`font-bold text-[14px] tracking-[0.1px] ${
                    shippingFee === 0 && subtotal > 0
                      ? 'text-[#2dc071]'
                      : 'text-[#252b42]'
                  }`}>
                    {subtotal === 0
                      ? '—'
                      : shippingFee === 0
                        ? 'Ücretsiz'
                        : `+₺${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center">
                  <span className="font-normal text-[14px] text-[#737373] tracking-[0.2px]">
                    İndirim
                  </span>
                  <span className={`font-bold text-[14px] tracking-[0.1px] ${discount > 0 ? 'text-[#e74040]' : 'text-[#bdbdbd]'}`}>
                    {discount > 0 ? `-₺${discount.toFixed(2)}` : '—'}
                  </span>
                </div>

                {/* Coupon code input */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bdbdbd]" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                        placeholder="Kupon kodu"
                        disabled={couponApplied}
                        className="w-full pl-9 pr-3 py-2 border border-[#e8e8e8] rounded-[5px] font-montserrat font-normal text-[13px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] disabled:bg-[#f9f9f9] disabled:text-[#737373]"
                      />
                    </div>
                    <button
                      onClick={couponApplied ? () => { setCouponApplied(false); setCouponCode(''); } : applyCoupon}
                      className={`shrink-0 px-3 py-2 rounded-[5px] font-bold text-[12px] tracking-[0.2px] transition-colors cursor-pointer ${
                        couponApplied
                          ? 'bg-[#fef2f2] text-[#e74040] hover:bg-[#fee2e2]'
                          : 'bg-[#252b42] text-white hover:bg-[#374151]'
                      }`}
                    >
                      {couponApplied ? 'İptal' : 'Uygula'}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="font-normal text-[12px] text-[#2dc071] tracking-[0.2px]">
                      ✓ Kupon uygulandı — %10 indirim
                    </p>
                  )}
                  {couponError && (
                    <p className="font-normal text-[12px] text-[#e74040] tracking-[0.2px]">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Grand total divider */}
                <div className="h-px bg-[#e8e8e8]" />

                {/* Grand total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[16px] text-[#252b42] tracking-[0.1px]">
                    Genel Toplam
                  </span>
                  <span className="font-bold text-[22px] text-[#23a6f0] tracking-[0.1px]">
                    ₺{grandTotal.toFixed(2)}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 500 && (
                  <div className="bg-[#eff8ff] border border-[#bfdbfe] rounded-[5px] px-3 py-2.5">
                    <p className="font-normal text-[12px] text-[#1e40af] tracking-[0.2px]">
                      🚚 <span className="font-bold">₺{(500 - subtotal).toFixed(2)}</span> daha ekleyin, kargo bedava!
                    </p>
                  </div>
                )}
              </div>

              {/* Create Order CTA */}
              <div className="px-6 pb-6 flex flex-col gap-3">
                <button
                  disabled={checkedCount === 0}
                  onClick={() => checkedCount > 0 && history.push('/order')}
                  className={`w-full font-bold text-[14px] tracking-[0.2px] py-[14px] rounded-[5px] flex items-center justify-center gap-2 transition-colors ${
                    checkedCount > 0
                      ? 'bg-[#23a6f0] hover:bg-[#2a7cc7] text-white cursor-pointer shadow-[0px_4px_12px_rgba(35,166,240,0.35)]'
                      : 'bg-[#e8e8e8] text-[#bdbdbd] cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-[18px] h-[18px]" />
                  Sipariş Oluştur
                </button>

                {checkedCount === 0 && (
                  <p className="font-normal text-[12px] text-[#bdbdbd] tracking-[0.2px] text-center">
                    Devam etmek için ürün seçin
                  </p>
                )}

                <Link
                  to="/shop"
                  className="w-full font-bold text-[13px] tracking-[0.2px] py-3 rounded-[5px] flex items-center justify-center gap-2 border border-[#e8e8e8] text-[#737373] hover:border-[#252b42] hover:text-[#252b42] transition-colors"
                >
                  Alışverişe Devam Et
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
