import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChevronRight, ChevronLeft, Heart, ShoppingCart,
  Share2, Truck, RefreshCw, Shield,
} from 'lucide-react';
import TopBar   from '../components/layout/TopBar';
import Navbar   from '../components/layout/Navbar';
import Footer   from '../components/layout/Footer';
import { fetchProduct } from '../store/actions/productActions';
import { addToCart }    from '../store/actions/cartActions';
import { FETCH_STATES } from '../store/reducers/productReducer';
import { toast }        from 'react-toastify';
import api from '../services/api';
import { buildProductUrl } from '../utils/categoryUtils';

/* ── Star rating ── */
function Stars({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} style={{ width: size, height: size }} viewBox="0 0 20 20"
          fill={n <= Math.round(rating) ? '#f59e0b' : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Loading full page ── */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-5">
      <svg className="animate-spin w-14 h-14 text-[#23a6f0]" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="font-montserrat text-[14px] text-[#737373]">Ürün yükleniyor…</p>
    </div>
  );
}

/* ── Color options (UI-only; no API field) ── */
const COLOR_OPTS = [
  { label: 'Mavi',    value: '#23a6f0' },
  { label: 'Yeşil',  value: '#2dc071' },
  { label: 'Turuncu',value: '#e77c40' },
  { label: 'Koyu',   value: '#252b42' },
];
const SIZE_OPTS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/* ═══════════════════════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const { productId, gender, categoryName, categoryId } = useParams();
  const history  = useHistory();
  const dispatch = useDispatch();

  const { productDetail, detailFetchState } = useSelector((s) => s.product);

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [mainImgIdx,    setMainImgIdx]    = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTS[0].value);
  const [selectedSize,  setSelectedSize]  = useState('');
  const [quantity,      setQuantity]      = useState(1);
  const [activeTab,     setActiveTab]     = useState('description');

  /* Fetch on mount or when productId changes */
  useEffect(() => {
    if (productId) {
      setMainImgIdx(0);
      dispatch(fetchProduct(productId));
    }
  }, [productId, dispatch]);

  /* Reset image index when product changes */
  useEffect(() => { setMainImgIdx(0); }, [productDetail?.id]);

  /* Favori ürünler — API'den en yüksek puanlı 10 */
  useEffect(() => {
    setFavoritesLoading(true);
    api.get('/products', { params: { limit: 25, sort: 'rating:desc' } })
      .then((res) => {
        const sorted = [...(res.data?.products ?? [])]
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 10);
        setFavoriteProducts(sorted);
      })
      .catch(() => setFavoriteProducts([]))
      .finally(() => setFavoritesLoading(false));
  }, []);

  const isLoading = detailFetchState === FETCH_STATES.FETCHING
                 || detailFetchState === FETCH_STATES.NOT_FETCHED;
  const isFailed  = detailFetchState === FETCH_STATES.FAILED;

  /* Mevcut ürünü listeden çıkar */
  const favorites = favoriteProducts.filter(
    (p) => p.id !== Number(productDetail?.id)
  );

  /* ── Layout shell (always shown) ── */
  return (
    <div className="bg-[#fafafa] flex flex-col min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="bg-[#fafafa] w-full py-5">
        <div className="max-w-[1050px] mx-auto px-4 flex items-center gap-2 flex-wrap">
          <Link to="/"      className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd] shrink-0" />
          <Link to="/shop"  className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Shop</Link>
          {productDetail && (
            <>
              <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd] shrink-0" />
              <span className="font-normal text-[14px] text-[#737373] truncate max-w-[220px]">
                {productDetail.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── BACK BUTTON ── */}
      <div className="max-w-[1050px] mx-auto px-4 w-full pb-3">
        <button
          onClick={() => history.goBack()}
          className="flex items-center gap-2 text-[#737373] hover:text-[#23a6f0] transition-colors font-bold text-[14px] tracking-[0.2px]"
        >
          <ChevronLeft className="w-[16px] h-[16px]" />
          Geri Dön
        </button>
      </div>

      {/* ── CONTENT ── */}
      {isLoading && <LoadingSpinner />}

      {isFailed && (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="font-bold text-[18px] text-[#252b42]">Ürün yüklenemedi</p>
          <button
            onClick={() => dispatch(fetchProduct(productId))}
            className="bg-[#23a6f0] text-white font-bold px-6 py-3 rounded-[5px] hover:bg-[#2a7cc7] transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {detailFetchState === FETCH_STATES.FETCHED && productDetail && (
        <>
          {/* ── PRODUCT SECTION ── */}
          <div className="w-full max-w-[1050px] mx-auto px-4 pb-20">
            <div className="flex flex-col md:flex-row gap-10 items-start">

              {/* ── IMAGE GALLERY ── */}
              <div className="flex flex-col gap-4 w-full md:w-[506px] shrink-0">
                {/* Main image */}
                <div className="relative w-full aspect-square bg-[#f9f9f9] rounded-[4px] overflow-hidden group">
                  {productDetail.images?.[mainImgIdx]?.url ? (
                    <img
                      src={productDetail.images[mainImgIdx].url}
                      alt={productDetail.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#bdbdbd]">
                      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Arrow nav */}
                  {productDetail.images?.length > 1 && (
                    <>
                      <button
                        onClick={() => setMainImgIdx((i) => (i === 0 ? productDetail.images.length - 1 : i - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5 text-[#252b42]" />
                      </button>
                      <button
                        onClick={() => setMainImgIdx((i) => (i === productDetail.images.length - 1 ? 0 : i + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5 text-[#252b42]" />
                      </button>
                    </>
                  )}

                  {productDetail.stock < 20 && (
                    <div className="absolute top-3 left-3 bg-[#e74040] px-2 py-1 rounded-[3px]">
                      <p className="font-bold text-[12px] text-white">Low Stock</p>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {productDetail.images?.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {productDetail.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setMainImgIdx(i)}
                        className={`shrink-0 w-20 h-20 rounded-[4px] overflow-hidden border-2 transition-colors ${
                          i === mainImgIdx ? 'border-[#23a6f0]' : 'border-transparent hover:border-[#e8e8e8]'
                        }`}
                      >
                        {img.url
                          ? <img src={img.url} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-[#f9f9f9]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── PRODUCT INFO ── */}
              <div className="flex flex-col gap-6 flex-1 pt-2">

                {/* Name & rating */}
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-[24px] leading-[32px] text-[#252b42] tracking-[0.1px]">
                    {productDetail.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Stars rating={productDetail.rating} />
                    <span className="font-normal text-[14px] text-[#737373]">
                      {productDetail.rating?.toFixed(1)} · {productDetail.sell_count} satış
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[24px] text-[#23856d] tracking-[0.1px]">
                    ₺{productDetail.price?.toFixed(2)}
                  </span>
                  <span className="font-normal text-[16px] text-[#bdbdbd] line-through">
                    ₺{(productDetail.price * 1.2)?.toFixed(2)}
                  </span>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#737373]">Stok:</span>
                  <span className={`font-bold text-[14px] ${productDetail.stock > 0 ? 'text-[#2dc071]' : 'text-[#e74040]'}`}>
                    {productDetail.stock > 0 ? `Mevcut (${productDetail.stock} adet)` : 'Tükendi'}
                  </span>
                </div>

                {/* Description */}
                {productDetail.description && (
                  <p className="font-normal text-[14px] text-[#737373] leading-[22px] tracking-[0.2px] max-w-[460px]">
                    {productDetail.description}
                  </p>
                )}

                <div className="h-px bg-[#e8e8e8]" />

                {/* Colors */}
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[14px] text-[#252b42]">Renk Seç</p>
                  <div className="flex gap-2">
                    {COLOR_OPTS.map(({ label, value }) => (
                      <button
                        key={value}
                        onClick={() => setSelectedColor(value)}
                        title={label}
                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor === value ? 'border-[#252b42] scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: value }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[14px] text-[#252b42]">Beden Seç</p>
                  <div className="flex gap-2 flex-wrap">
                    {SIZE_OPTS.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-[46px] h-10 rounded-[4px] border font-bold text-[14px] transition-colors cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#252b42] border-[#252b42] text-white'
                            : 'bg-white border-[#e8e8e8] text-[#252b42] hover:border-[#252b42]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity + Cart */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center border border-[#e8e8e8] rounded-[5px] overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-11 flex items-center justify-center text-[#252b42] hover:bg-[#f9f9f9] font-bold text-xl cursor-pointer"
                    >−</button>
                    <span className="w-12 text-center font-bold text-[16px] text-[#252b42]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-11 flex items-center justify-center text-[#252b42] hover:bg-[#f9f9f9] font-bold text-xl cursor-pointer"
                    >+</button>
                  </div>

                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) dispatch(addToCart(productDetail));
                      toast.success(`"${productDetail.name}" sepete eklendi!`, { autoClose: 2000 });
                    }}
                    className="flex-1 min-w-[180px] bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-bold text-[14px] tracking-[0.2px] h-11 rounded-[5px] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-[18px] h-[18px]" />
                    Sepete Ekle
                  </button>

                  <button className="w-11 h-11 flex items-center justify-center border border-[#e8e8e8] rounded-[5px] text-[#737373] hover:text-[#e74040] hover:border-[#e74040] transition-colors cursor-pointer">
                    <Heart className="w-[18px] h-[18px]" />
                  </button>

                  <button className="w-11 h-11 flex items-center justify-center border border-[#e8e8e8] rounded-[5px] text-[#737373] hover:text-[#23a6f0] hover:border-[#23a6f0] transition-colors cursor-pointer">
                    <Share2 className="w-[18px] h-[18px]" />
                  </button>
                </div>

                <div className="h-px bg-[#e8e8e8]" />

                {/* Guarantees */}
                <div className="flex flex-col gap-3">
                  {[
                    { Icon: Truck,     title: 'Ücretsiz Kargo',  sub: '150₺ üzeri siparişlerde ücretsiz' },
                    { Icon: RefreshCw, title: '30 Gün İade',     sub: 'Koşulsuz iade garantisi' },
                    { Icon: Shield,    title: 'Güvenli Ödeme',   sub: '256-bit SSL şifreleme' },
                  ].map(({ Icon, title, sub }) => (
                    <div key={title} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#23a6f0] shrink-0" />
                      <div>
                        <p className="font-bold text-[14px] text-[#252b42]">{title}</p>
                        <p className="font-normal text-[12px] text-[#737373]">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── TABS ── */}
          <div className="bg-white border-t border-[#e8e8e8] w-full">
            <div className="max-w-[1050px] mx-auto px-4">
              <div className="flex border-b border-[#e8e8e8] overflow-x-auto">
                {[
                  { key: 'description', label: 'Açıklama' },
                  { key: 'info',        label: 'Ek Bilgiler' },
                  { key: 'reviews',     label: `Değerlendirmeler (${productDetail.sell_count ?? 0})` },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-4 font-bold text-[14px] tracking-[0.2px] border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === key
                        ? 'border-[#23a6f0] text-[#23a6f0]'
                        : 'border-transparent text-[#737373] hover:text-[#252b42]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="py-8">
                {activeTab === 'description' && (
                  <p className="font-normal text-[14px] text-[#737373] leading-[24px] tracking-[0.2px] max-w-[700px]">
                    {productDetail.description || 'Bu ürün için açıklama mevcut değil.'}
                  </p>
                )}
                {activeTab === 'info' && (
                  <div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-8 max-w-[480px]">
                    {[
                      ['Ürün ID',      `#${productDetail.id}`],
                      ['Mağaza ID',    `#${productDetail.store_id}`],
                      ['Kategori ID',  `#${productDetail.category_id}`],
                      ['Stok',         `${productDetail.stock} adet`],
                      ['Satış Sayısı', `${productDetail.sell_count} adet`],
                      ['Değerlendirme',`${productDetail.rating?.toFixed(1)} / 5.0`],
                    ].map(([k, v]) => (
                      <div key={k} className="contents">
                        <span className="font-bold text-[14px] text-[#252b42]">{k}</span>
                        <span className="font-normal text-[14px] text-[#737373]">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="flex flex-col items-center gap-2 py-6">
                    <Stars rating={productDetail.rating} size={28} />
                    <p className="font-bold text-[24px] text-[#252b42]">{productDetail.rating?.toFixed(1)} / 5.0</p>
                    <p className="font-normal text-[14px] text-[#737373]">
                      {productDetail.sell_count} kişi bu ürünü satın aldı
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── FAVORİ ÜRÜNLER ── */}
          <div className="w-full bg-[#fafafa] py-16">
            <div className="max-w-[1050px] mx-auto px-4">
              <div className="text-center mb-10">
                <p className="font-normal text-[#737373] text-[20px] tracking-[0.2px] mb-2">Öne Çıkan</p>
                <h2 className="font-bold text-[24px] text-[#252b42] tracking-[0.1px]">
                  FAVORİ ÜRÜNLER
                </h2>
              </div>

              {favoritesLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[20px]">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-[280px] bg-[#f0f0f0] rounded-[4px] animate-pulse" />
                  ))}
                </div>
              ) : favorites.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[20px]">
                  {favorites.map((p) => (
                    <Link
                      key={p.id}
                      to={buildProductUrl(p)}
                      className="bg-white flex flex-col overflow-hidden group cursor-pointer hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] transition-shadow rounded-[4px]"
                    >
                      <div className="relative w-full h-[200px] bg-[#f9f9f9] overflow-hidden">
                        {p.images?.[0]?.url ? (
                          <img
                            src={p.images[0].url}
                            alt={p.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#bdbdbd]">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {p.rating && (
                          <div className="absolute top-2 left-2 bg-[#252b42] flex gap-1 items-center px-2 py-1 rounded-[20px]">
                            <Heart className="w-3 h-3 text-[#e74040] fill-[#e74040]" />
                            <span className="font-montserrat text-[11px] text-white">{p.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5 items-center w-full py-4 px-3 text-center">
                        <p className="font-bold text-[14px] text-[#252b42] line-clamp-2 w-full">{p.name}</p>
                        <span className="font-bold text-[14px] text-[#23856d]">₺{p.price?.toFixed(2)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center font-normal text-[14px] text-[#737373]">
                  Favori ürün bulunamadı.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
