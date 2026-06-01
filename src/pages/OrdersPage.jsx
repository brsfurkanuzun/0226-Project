import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronDown, ChevronUp,
  Package, ShoppingBag, Loader2, CalendarDays,
  CreditCard, MapPin, ReceiptText,
} from 'lucide-react';
import TopBar  from '../components/layout/TopBar';
import Navbar  from '../components/layout/Navbar';
import Footer  from '../components/layout/Footer';
import { fetchOrders } from '../store/actions/orderActions';

/* ── Status badge ── */
const STATUS_MAP = {
  pending:    { label: 'Beklemede',   bg: 'bg-[#fff3cd]', text: 'text-[#856404]'  },
  processing: { label: 'Hazırlanıyor',bg: 'bg-[#cce5ff]', text: 'text-[#004085]'  },
  shipped:    { label: 'Kargoda',     bg: 'bg-[#d4edda]', text: 'text-[#155724]'  },
  delivered:  { label: 'Teslim Edildi', bg: 'bg-[#d1ecf1]', text: 'text-[#0c5460]' },
  cancelled:  { label: 'İptal',       bg: 'bg-[#f8d7da]', text: 'text-[#721c24]'  },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status?.toLowerCase()] ?? {
    label: status ?? 'Bilinmiyor',
    bg: 'bg-[#e8e8e8]',
    text: 'text-[#737373]',
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] tracking-[0.2px] ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

/* ── Format date ── */
function fmtDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('tr-TR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  } catch { return iso; }
}

/* ── Single order row (collapsible) ── */
function OrderRow({ order, index }) {
  const [open, setOpen] = useState(false);

  const products    = order.orderProducts ?? order.products ?? [];
  const productTotal = products.reduce(
    (s, p) => s + (p.count ?? 1) * (p.product?.price ?? p.price ?? 0), 0
  );

  return (
    <>
      {/* Main row */}
      <tr
        onClick={() => setOpen((o) => !o)}
        className={`border-b border-[#f3f3f3] cursor-pointer transition-colors select-none ${
          open ? 'bg-[#eff8ff]' : index % 2 === 0 ? 'bg-white hover:bg-[#fafafa]' : 'bg-[#fafafa] hover:bg-[#f3f3f3]'
        }`}
      >
        {/* Order no */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#e8f4fd] rounded-full flex items-center justify-center shrink-0">
              <ReceiptText className="w-3.5 h-3.5 text-[#23a6f0]" />
            </div>
            <span className="font-bold text-[13px] text-[#252b42]">
              #{order.id}
            </span>
          </div>
        </td>

        {/* Date */}
        <td className="px-4 py-4 hidden sm:table-cell">
          <div className="flex items-center gap-1.5 text-[#737373]">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            <span className="font-normal text-[13px]">{fmtDate(order.order_date ?? order.orderDate)}</span>
          </div>
        </td>

        {/* Items */}
        <td className="px-4 py-4 hidden md:table-cell">
          <span className="font-normal text-[13px] text-[#737373]">
            {products.length} ürün
          </span>
        </td>

        {/* Status */}
        <td className="px-4 py-4 hidden sm:table-cell">
          <StatusBadge status={order.status} />
        </td>

        {/* Price */}
        <td className="px-4 py-4 text-right">
          <span className="font-bold text-[14px] text-[#23856d]">
            ₺{(order.price ?? productTotal).toFixed(2)}
          </span>
        </td>

        {/* Expand toggle */}
        <td className="px-4 py-4 text-center">
          <div className="text-[#bdbdbd] hover:text-[#23a6f0] transition-colors inline-flex">
            {open
              ? <ChevronUp  className="w-4 h-4" />
              : <ChevronDown className="w-4 h-4" />}
          </div>
        </td>
      </tr>

      {/* Expanded details */}
      {open && (
        <tr className="bg-[#f7fbff]">
          <td colSpan={6} className="px-6 pb-5 pt-0">
            <div className="border border-[#dbeafe] rounded-[8px] overflow-hidden mt-1">

              {/* Products table */}
              {products.length > 0 && (
                <div>
                  <div className="bg-[#dbeafe]/50 px-4 py-2.5 border-b border-[#dbeafe]">
                    <p className="font-bold text-[12px] text-[#1e40af] uppercase tracking-[0.8px]">
                      Sipariş Ürünleri
                    </p>
                  </div>
                  <div className="divide-y divide-[#f0f7ff]">
                    {products.map((op, i) => {
                      const prod  = op.product ?? op;
                      const img   = prod.images?.[0]?.url ?? op.image_url;
                      const price = prod.price ?? op.price ?? 0;
                      const count = op.count ?? op.quantity ?? 1;
                      const detail = op.detail;
                      return (
                        <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white">
                          <div className="w-12 h-12 rounded-[6px] overflow-hidden bg-[#f9f9f9] shrink-0 border border-[#e8e8e8]">
                            {img
                              ? <img src={img} alt={prod.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-[#bdbdbd]" />
                                </div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[13px] text-[#252b42] truncate">
                              {prod.name ?? `Ürün #${prod.id ?? op.product_id}`}
                            </p>
                            {detail && (
                              <p className="font-normal text-[11px] text-[#737373] mt-0.5">{detail}</p>
                            )}
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-normal text-[12px] text-[#737373]">x{count}</p>
                            <p className="font-bold text-[13px] text-[#23856d]">
                              ₺{(count * price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Meta row: card + address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#dbeafe] bg-[#f0f7ff]">
                {/* Card info */}
                <div className="px-4 py-3 flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-[#23a6f0] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[11px] text-[#1e40af] uppercase tracking-[0.6px] mb-0.5">Ödeme</p>
                    {order.card_no ? (
                      <p className="font-normal text-[12px] text-[#252b42]">
                        •••• {String(order.card_no).slice(-4)}
                        {order.card_name && ` — ${order.card_name}`}
                      </p>
                    ) : (
                      <p className="font-normal text-[12px] text-[#737373]">Bilgi yok</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="px-4 py-3 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#23a6f0] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[11px] text-[#1e40af] uppercase tracking-[0.6px] mb-0.5">Teslimat</p>
                    {order.address ? (
                      <p className="font-normal text-[12px] text-[#252b42]">
                        {order.address.title && `${order.address.title} — `}
                        {order.address.city}
                      </p>
                    ) : order.address_id ? (
                      <p className="font-normal text-[12px] text-[#737373]">Adres #{order.address_id}</p>
                    ) : (
                      <p className="font-normal text-[12px] text-[#737373]">Bilgi yok</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#dbeafe]">
                <span className="font-normal text-[13px] text-[#737373]">Sipariş Toplamı</span>
                <span className="font-bold text-[16px] text-[#23a6f0]">
                  ₺{(order.price ?? productTotal).toFixed(2)}
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function OrdersPage() {
  const dispatch      = useDispatch();
  const { orders, ordersLoading } = useSelector((s) => s.shoppingCart);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  return (
    <div className="bg-[#fafafa] flex flex-col min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="w-full bg-[#fafafa] py-5">
        <div className="max-w-[1050px] mx-auto px-4 flex items-center gap-2">
          <Link to="/"     className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd]" />
          <span className="font-normal text-[14px] text-[#737373]">Siparişlerim</span>
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 pb-20">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-bold text-[24px] text-[#252b42] tracking-[0.1px]">Siparişlerim</h1>
            {!ordersLoading && orders.length > 0 && (
              <p className="font-normal text-[14px] text-[#737373] mt-1">
                Toplam {orders.length} sipariş
              </p>
            )}
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 bg-[#23a6f0] hover:bg-[#2a7cc7] text-white font-bold text-[13px] px-4 py-2.5 rounded-[5px] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Alışverişe Devam
          </Link>
        </div>

        {/* Loading */}
        {ordersLoading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#23a6f0]" />
            <span className="font-normal text-[16px] text-[#737373]">Siparişler yükleniyor…</span>
          </div>
        )}

        {/* Empty state */}
        {!ordersLoading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-20 h-20 bg-[#f3f3f3] rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-[#bdbdbd]" />
            </div>
            <p className="font-bold text-[18px] text-[#252b42]">Henüz siparişiniz yok</p>
            <p className="font-normal text-[14px] text-[#737373] max-w-[300px]">
              Alışveriş yaparak ilk siparişinizi oluşturabilirsiniz.
            </p>
            <Link
              to="/shop"
              className="flex items-center gap-2 bg-[#23a6f0] hover:bg-[#2a7cc7] text-white font-bold text-[14px] px-6 py-3 rounded-[5px] transition-colors mt-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Alışverişe Başla
            </Link>
          </div>
        )}

        {/* Orders table */}
        {!ordersLoading && orders.length > 0 && (
          <div className="bg-white border border-[#e8e8e8] rounded-[8px] overflow-hidden shadow-[0px_2px_12px_rgba(0,0,0,0.06)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#fafafa] border-b border-[#e8e8e8]">
                  <th className="px-4 py-3 text-left font-bold text-[12px] text-[#737373] uppercase tracking-[0.8px]">
                    Sipariş No
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[12px] text-[#737373] uppercase tracking-[0.8px] hidden sm:table-cell">
                    Tarih
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[12px] text-[#737373] uppercase tracking-[0.8px] hidden md:table-cell">
                    Ürünler
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-[12px] text-[#737373] uppercase tracking-[0.8px] hidden sm:table-cell">
                    Durum
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-[12px] text-[#737373] uppercase tracking-[0.8px]">
                    Tutar
                  </th>
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <OrderRow key={order.id ?? i} order={order} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
