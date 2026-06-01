import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ReactPaginate from 'react-paginate';
const ReactPaginate = _ReactPaginate.default || _ReactPaginate;
import { Heart, ShoppingCart, Eye, ChevronRight, SlidersHorizontal, LayoutGrid, List, Star } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { fetchProducts, setOffset, setCategoryId, setSort, setFilter } from '../store/actions/productActions';
import { addToCart }                                                    from '../store/actions/cartActions';
import { FETCH_STATES }                                                 from '../store/reducers/productReducer';
import { buildCategoryUrl, genderSlug }                                 from '../utils/categoryUtils';

/* ── URL helper ── */
function toSlug(str = '') {
  return str
    .toLowerCase()
    .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildProductUrl(product) {
  const gender       = 'all';
  const categoryName = `kategori-${product.category_id}`;
  const slug         = toSlug(product.name);
  return `/shop/${gender}/${categoryName}/${product.category_id}/${slug}/${product.id}`;
}

/* ── Star rating ── */
function Stars({ rating }) {
  const full  = Math.floor(rating);
  const half  = (rating - full) >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: full  }).map((_, i) => <StarIcon key={`f${i}`} type="full" />)}
      {half && <StarIcon type="half" />}
      {Array.from({ length: empty }).map((_, i) => <StarIcon key={`e${i}`} type="empty" />)}
      <span className="ml-[4px] font-montserrat font-normal text-[12px] text-[#737373] tracking-[0.2px]">
        ({rating?.toFixed(1)})
      </span>
    </div>
  );
}

function StarIcon({ type }) {
  const color = type === 'empty' ? '#bdbdbd' : '#f59e0b';
  return (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 20 20" fill={type === 'half' ? 'url(#half)' : color}>
      {type === 'half' && (
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#bdbdbd" />
          </linearGradient>
        </defs>
      )}
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ── Product Card ── */
function ProductCard({ product, dispatch }) {
  const image = product.images?.[0]?.url;
  return (
    <Link
      to={buildProductUrl(product)}
      className="bg-white flex flex-col items-start overflow-clip group cursor-pointer hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] transition-shadow rounded-[4px]"
    >
      {/* Image */}
      <div className="overflow-clip relative shrink-0 w-full h-[300px] bg-[#f9f9f9]">
        {image ? (
          <img
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={image}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#bdbdbd]">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Hover action buttons */}
        <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            title="Wishlist"
            onClick={(e) => e.preventDefault()}
            className="bg-white rounded-full w-[38px] h-[38px] flex items-center justify-center shadow-md hover:bg-[#23a6f0] hover:text-white transition-colors text-[#737373]"
          >
            <Heart className="w-[16px] h-[16px]" />
          </button>
          <button
            title="Add to Cart"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addToCart(product));
              toast.success(`"${product.name}" sepete eklendi!`, { autoClose: 2000 });
            }}
            className="bg-white rounded-full w-[38px] h-[38px] flex items-center justify-center shadow-md hover:bg-[#23a6f0] hover:text-white transition-colors text-[#737373]"
          >
            <ShoppingCart className="w-[16px] h-[16px]" />
          </button>
          <button
            title="Quick View"
            onClick={(e) => e.preventDefault()}
            className="bg-white rounded-full w-[38px] h-[38px] flex items-center justify-center shadow-md hover:bg-[#23a6f0] hover:text-white transition-colors text-[#737373]"
          >
            <Eye className="w-[16px] h-[16px]" />
          </button>
        </div>
        {/* Low stock badge */}
        {product.stock < 20 && (
          <div className="absolute top-[12px] left-[12px] bg-[#e74040] px-[8px] py-[2px] rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
            <p className="font-montserrat font-bold text-[12px] text-white tracking-[0.2px]">Low Stock</p>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex flex-col gap-[8px] items-center pb-[28px] pt-[20px] px-[20px] w-full text-center">
        <p className="font-montserrat font-bold text-[16px] leading-[24px] text-[#252b42] tracking-[0.1px] line-clamp-2 w-full">
          {product.name}
        </p>
        <Stars rating={product.rating} />
        <div className="flex gap-[8px] items-center justify-center">
          <span className="font-montserrat font-bold text-[16px] text-[#23856d] tracking-[0.1px]">
            ₺{product.price?.toFixed(2)}
          </span>
        </div>
        <p className="font-montserrat font-normal text-[12px] text-[#737373] tracking-[0.2px]">
          {product.sell_count} satış · Stok: {product.stock}
        </p>
      </div>
    </Link>
  );
}

/* ── Loading Spinner ── */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-[20px]">
      <svg className="animate-spin w-[56px] h-[56px] text-[#23a6f0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="font-montserrat font-normal text-[14px] text-[#737373] tracking-[0.2px]">Ürünler yükleniyor…</p>
    </div>
  );
}

/* ── Error state ── */
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-[16px]">
      <svg className="w-[48px] h-[48px] text-[#e74040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      <p className="font-montserrat font-bold text-[16px] text-[#252b42] tracking-[0.1px]">Ürünler yüklenemedi</p>
      <button
        onClick={onRetry}
        className="bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-montserrat font-bold text-[14px] px-[24px] py-[10px] rounded-[5px] tracking-[0.2px]"
      >
        Tekrar Dene
      </button>
    </div>
  );
}

const SORT_OPTIONS = [
  { value: '',           label: 'Popularity'           },
  { value: 'price:asc',  label: 'Price: Low to High'   },
  { value: 'price:desc', label: 'Price: High to Low'   },
  { value: 'rating:asc', label: 'Rating: Low to High'  },
  { value: 'rating:desc',label: 'Rating: High to Low'  },
];

/* ── Main ShopPage ── */
export default function ShopPage() {
  const dispatch = useDispatch();
  const params   = useParams();

  const { productList, total, limit, offset, fetchState, categories, sort, filter } =
    useSelector((s) => s.product);

  const [viewMode,     setViewMode]     = useState('grid');
  const [filterText,   setFilterText]   = useState(filter); // local input mirrors Redux filter

  const isLoading = fetchState === FETCH_STATES.FETCHING || fetchState === FETCH_STATES.NOT_FETCHED;
  const isFailed  = fetchState === FETCH_STATES.FAILED;

  /* Derive active category ID from URL params */
  const activeCategoryId = params.categoryId ? Number(params.categoryId) : null;

  /*
   * When the URL category changes → update Redux category, reset offset, re-fetch.
   * sort and filter are preserved (kept in Redux across category navigations).
   */
  useEffect(() => {
    dispatch(setCategoryId(activeCategoryId));
    dispatch(setOffset(0));
    dispatch(fetchProducts());
  }, [activeCategoryId]); // eslint-disable-line

  /* Sort change: update Redux sort → re-fetch (keeps category + filter) */
  function handleSortChange(e) {
    const value = e.target.value;
    dispatch(setSort(value));
    dispatch(setOffset(0));
    dispatch(fetchProducts());
  }

  /* Filter apply: dispatch filter → re-fetch (keeps category + sort) */
  function applyFilter() {
    dispatch(setFilter(filterText));
    dispatch(setOffset(0));
    dispatch(fetchProducts());
  }

  function handleFilterKeyDown(e) {
    if (e.key === 'Enter') applyFilter();
  }

  /* Clear all filters */
  function clearFilters() {
    setFilterText('');
    dispatch(setFilter(''));
    dispatch(setSort(''));
    dispatch(setOffset(0));
    dispatch(fetchProducts());
  }

  const totalPages  = Math.ceil(total / limit) || 1;
  const currentPage = Math.floor(offset / limit);

  function handlePageChange({ selected }) {
    const newOffset = selected * limit;
    dispatch(setOffset(newOffset));
    dispatch(fetchProducts()); // keeps category, sort, filter from Redux state
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="bg-[#fafafa] flex flex-col items-start relative w-full min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* ── HERO / PAGE HEADER ── */}
      <div className="bg-[#fafafa] w-full py-[24px]">
        <div className="max-w-[1050px] mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
          {(() => {
            const activeCat = activeCategoryId
              ? categories.find((c) => c.id === activeCategoryId)
              : null;
            const rawName     = activeCat?.title ?? activeCat?.name ?? '';
            const displayName = rawName.replace(/^(kadin|kadın|erkek)\s*/i, '').trim() || rawName;
            return (
              <>
                <h1 className="font-montserrat font-bold text-[24px] leading-[32px] text-[#252b42] tracking-[0.1px]">
                  {displayName || 'Shop'}
                </h1>
                <div className="flex items-center gap-[8px]">
                  <Link to="/" className="font-montserrat font-bold text-[14px] text-[#252b42] tracking-[0.2px] hover:text-[#23a6f0] transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="w-[16px] h-[16px] text-[#bdbdbd]" />
                  <Link to="/shop" className="font-montserrat font-bold text-[14px] text-[#252b42] tracking-[0.2px] hover:text-[#23a6f0] transition-colors">
                    Shop
                  </Link>
                  {displayName && (
                    <>
                      <ChevronRight className="w-[16px] h-[16px] text-[#bdbdbd]" />
                      <span className="font-montserrat font-bold text-[14px] text-[#737373] tracking-[0.2px]">
                        {displayName}
                      </span>
                    </>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* ── CATEGORY BANNERS ── */}
      {categories.length > 0 && (
        <div className="w-full bg-[#fafafa] pb-[48px]">
          <div className="max-w-[1050px] mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-[15px]">
            {/* "Tümü" card */}
            <Link
              to="/shop"
              className={`relative h-[300px] overflow-clip rounded-[4px] group cursor-pointer block ${
                !activeCategoryId ? 'ring-2 ring-[#23a6f0] ring-offset-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#23a6f0] to-[#2dc071]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6px]">
                <p className="font-montserrat font-bold text-white text-[16px] tracking-[0.1px]">Tümü</p>
                <p className="font-montserrat font-normal text-white/80 text-[12px] tracking-[0.2px]">
                  {total} Ürün
                </p>
              </div>
              {!activeCategoryId && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#23a6f0] rounded-full" />
                </div>
              )}
            </Link>

            {/* Real category cards */}
            {[...categories]
              .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
              .slice(0, 4)
              .map((cat) => {
                const rawName     = cat.title ?? cat.name ?? '';
                const displayName = rawName.replace(/^(kadin|kadın|erkek)\s*/i, '').trim() || rawName;
                const isActive    = activeCategoryId === cat.id;
                return (
                  <Link
                    key={cat.id}
                    to={buildCategoryUrl(cat)}
                    className={`relative h-[300px] overflow-clip rounded-[4px] group cursor-pointer block ${
                      isActive ? 'ring-2 ring-[#23a6f0] ring-offset-2' : ''
                    }`}
                  >
                    {cat.img ? (
                      <img
                        src={cat.img}
                        alt={displayName}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] to-[#23a6f0]" />
                    )}
                    <div className={`absolute inset-0 transition-colors ${
                      isActive ? 'bg-[#23a6f0]/50' : 'bg-black/30 group-hover:bg-black/40'
                    }`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6px] px-2">
                      <p className="font-montserrat font-bold text-white text-[15px] tracking-[0.1px] text-center">
                        {displayName}
                      </p>
                      <div className="flex items-center gap-[2px]">
                        {[...Array(5)].map((_, s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s < Math.round(cat.rating ?? 0)
                                ? 'fill-[#f3cd03] text-[#f3cd03]'
                                : 'fill-white/30 text-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-[#23a6f0] rounded-full" />
                      </div>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      {/* ── FILTER / SORT BAR ── */}
      <div className="bg-white border-y border-[#e8e8e8] w-full py-[14px]">
        <div className="max-w-[1050px] mx-auto px-4 flex items-center justify-between flex-wrap gap-[12px]">

          {/* Left: result count + active filters */}
          <div className="flex items-center gap-[12px] flex-wrap">
            {fetchState === FETCH_STATES.FETCHED && (
              <p className="font-montserrat font-normal text-[14px] text-[#737373] tracking-[0.2px]">
                Toplam <span className="font-bold text-[#252b42]">{total}</span> ürün —&nbsp;
                <span className="font-bold text-[#252b42]">{Math.min(offset + 1, total)}</span>–
                <span className="font-bold text-[#252b42]">{Math.min(offset + limit, total)}</span> arası
              </p>
            )}
            {/* Active filter chips */}
            {(filter || sort || activeCategoryId) && (
              <button
                onClick={clearFilters}
                className="font-montserrat font-bold text-[12px] text-[#e74040] hover:underline tracking-[0.2px] cursor-pointer"
              >
                Filtreleri Temizle ✕
              </button>
            )}
          </div>

          {/* Right: view toggle + filter input + sort + apply */}
          <div className="flex items-center gap-[10px] flex-wrap">

            {/* View toggle */}
            <div className="flex items-center gap-[4px]">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-[38px] h-[38px] flex items-center justify-center rounded-[5px] border transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#23a6f0] border-[#23a6f0] text-white'
                    : 'bg-white border-[#e8e8e8] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0]'
                }`}
              >
                <LayoutGrid className="w-[16px] h-[16px]" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-[38px] h-[38px] flex items-center justify-center rounded-[5px] border transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#23a6f0] border-[#23a6f0] text-white'
                    : 'bg-white border-[#e8e8e8] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0]'
                }`}
              >
                <List className="w-[16px] h-[16px]" />
              </button>
            </div>

            {/* Filter text input */}
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              onKeyDown={handleFilterKeyDown}
              placeholder="Ürün ara…"
              className="font-montserrat font-normal text-[14px] text-[#252b42] border border-[#e8e8e8] rounded-[5px] px-[12px] py-[8px] w-[160px] focus:outline-none focus:border-[#23a6f0] placeholder-[#bdbdbd] transition-colors"
            />

            {/* Sort select */}
            <select
              value={sort}
              onChange={handleSortChange}
              className="font-montserrat font-normal text-[14px] text-[#737373] border border-[#e8e8e8] rounded-[5px] px-[12px] py-[8px] bg-white focus:outline-none focus:border-[#23a6f0] cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Filter button */}
            <button
              onClick={applyFilter}
              className="flex items-center gap-[8px] bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-montserrat font-bold text-[14px] px-[16px] py-[8px] rounded-[5px] tracking-[0.2px] cursor-pointer"
            >
              <SlidersHorizontal className="w-[16px] h-[16px]" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID / LIST ── */}
      <div className="w-full max-w-[1050px] mx-auto px-4 py-[48px]">
        {isLoading && <LoadingSpinner />}
        {isFailed  && <ErrorState onRetry={() => dispatch(fetchProducts())} />}

        {fetchState === FETCH_STATES.FETCHED && (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
                {productList.map((product) => (
                  <ProductCard key={product.id} product={product} dispatch={dispatch} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-[16px]">
                {productList.map((product) => (
                  <ProductListCard key={product.id} product={product} dispatch={dispatch} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                forcePage={currentPage}
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                previousLabel="‹"
                nextLabel="›"
                breakLabel="…"
                containerClassName="flex items-center justify-center gap-[6px] mt-[48px] flex-wrap"
                pageClassName="font-montserrat"
                pageLinkClassName="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-[#e6e6e6] bg-white font-montserrat font-bold text-[14px] text-[#737373] tracking-[0.2px] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer select-none"
                activeClassName="!border-[#23a6f0]"
                activeLinkClassName="!bg-[#23a6f0] !text-white !border-[#23a6f0]"
                previousClassName="font-montserrat"
                previousLinkClassName="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-[#e6e6e6] bg-white font-montserrat font-bold text-[18px] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer select-none"
                nextClassName="font-montserrat"
                nextLinkClassName="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-[#e6e6e6] bg-white font-montserrat font-bold text-[18px] text-[#737373] hover:border-[#23a6f0] hover:text-[#23a6f0] transition-colors cursor-pointer select-none"
                breakClassName="font-montserrat"
                breakLinkClassName="w-[40px] h-[40px] flex items-center justify-center font-montserrat text-[14px] text-[#737373] select-none"
                disabledClassName="opacity-40 pointer-events-none"
              />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ── List view card ── */
function ProductListCard({ product, dispatch }) {
  const image = product.images?.[0]?.url;
  return (
    <Link
      to={buildProductUrl(product)}
      className="bg-white flex items-start gap-[24px] p-[16px] rounded-[4px] hover:shadow-[0px_4px_24px_rgba(0,0,0,0.08)] transition-shadow group cursor-pointer"
    >
      <div className="shrink-0 w-[160px] h-[160px] relative overflow-clip rounded-[4px] bg-[#f9f9f9]">
        {image ? (
          <img src={image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#bdbdbd]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.stock < 20 && (
          <div className="absolute top-[8px] left-[8px] bg-[#e74040] px-[6px] py-[2px] rounded-[3px]">
            <p className="font-montserrat font-bold text-[11px] text-white">Low Stock</p>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-[10px]">
        <p className="font-montserrat font-bold text-[18px] text-[#252b42] tracking-[0.1px] leading-[26px]">{product.name}</p>
        <Stars rating={product.rating} />
        <p className="font-montserrat font-normal text-[14px] text-[#737373] tracking-[0.2px] line-clamp-2">
          {product.description || 'Kaliteli ve dayanıklı ürün.'}
        </p>
        <div className="flex items-center gap-[16px] mt-auto">
          <span className="font-montserrat font-bold text-[20px] text-[#23856d] tracking-[0.1px]">
            ₺{product.price?.toFixed(2)}
          </span>
          <span className="font-montserrat font-normal text-[12px] text-[#737373]">
            {product.sell_count} satış · Stok: {product.stock}
          </span>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex flex-col gap-[8px] shrink-0">
        <button
          title="Wishlist"
          onClick={(e) => e.preventDefault()}
          className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#737373] hover:bg-[#23a6f0] hover:border-[#23a6f0] hover:text-white transition-colors"
        >
          <Heart className="w-[16px] h-[16px]" />
        </button>
        <button
          title="Add to Cart"
          onClick={(e) => {
            e.preventDefault();
            dispatch(addToCart(product));
            toast.success(`"${product.name}" sepete eklendi!`, { autoClose: 2000 });
          }}
          className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#737373] hover:bg-[#23a6f0] hover:border-[#23a6f0] hover:text-white transition-colors"
        >
          <ShoppingCart className="w-[16px] h-[16px]" />
        </button>
        <button
          title="Quick View"
          onClick={(e) => e.preventDefault()}
          className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#737373] hover:bg-[#23a6f0] hover:border-[#23a6f0] hover:text-white transition-colors"
        >
          <Eye className="w-[16px] h-[16px]" />
        </button>
      </div>
    </Link>
  );
}
