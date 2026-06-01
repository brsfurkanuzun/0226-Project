import { Link }              from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ShoppingCart, Heart, Eye,
  ChevronRight, Star,
  BookOpen, TrendingUp, MessageCircle, Clock, Layers, BarChart2,
} from 'lucide-react';
import TopBar  from '../components/layout/TopBar';
import Navbar  from '../components/layout/Navbar';
import Footer  from '../components/layout/Footer';
import api     from '../services/api';

/* ── Image assets ────────────────────────────────────────────────── */
const imgHero          = '/images/hero.png';
const imgEllipse1      = '/images/ellipse-1.svg';
const imgEllipse2      = '/images/ellipse-2.svg';
const imgEllipse3      = '/images/ellipse-3.svg';
const imgEllipse4      = '/images/ellipse-4.svg';

const imgShop1         = '/images/shop-card-1.png';
const imgShop2         = '/images/shop-card-2.png';
const imgShop3         = '/images/shop-card-3.png';


const imgContentLeft   = '/images/content-left.png';
const imgContentRight  = '/images/content-right.png';

const imgBlog1         = '/images/blog-1.png';
const imgBlog2         = '/images/blog-2.png';

const imgProductColors = '/images/product-colors.svg';

const BRANDS = [
  { src: '/images/brand-1.svg', w: 103, h: 34 },
  { src: '/images/brand-2.svg', w: 83,  h: 59 },
  { src: '/images/brand-3.svg', w: 102, h: 75 },
  { src: '/images/brand-4.svg', w: 103, h: 42 },
  { src: '/images/brand-5.svg', w: 104, h: 62 },
  { src: '/images/brand-6.svg', w: 76,  h: 72 },
];

/* ── Shared wrapper ─────────────────────────────────────────────── */
const W = ({ children, className = '' }) => (
  <div className={`max-w-[1050px] mx-auto px-4 ${className}`}>{children}</div>
);

/* ── Product card ───────────────────────────────────────────────── */
function ProductCard({ product }) {
  const img  = product?.images?.[0]?.url ?? '/images/product-1.png';
  const name = product?.name ?? 'Product';
  const price = product?.price ?? 0;

  return (
    <Link to="/shop" className="group flex-1 min-w-[150px] max-w-[210px]">
      <div className="bg-white hover:shadow-[0px_4px_24px_rgba(0,0,0,0.12)] transition-shadow rounded-[4px] overflow-hidden">
        <div className="relative h-[238px] overflow-hidden bg-[#f5f5f5]">
          <img
            alt={name}
            src={img}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {[
              { Icon: Heart,        label: 'Wishlist' },
              { Icon: ShoppingCart, label: 'Cart' },
              { Icon: Eye,          label: 'View' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                title={label}
                className="bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-[#23a6f0] hover:text-white transition-colors text-[#737373]"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          {/* Rating badge */}
          {product?.rating && (
            <div className="absolute top-2 left-2 bg-[#252b42] flex gap-[4px] items-center px-[6px] py-[3px] rounded-[20px]">
              <Star className="w-[12px] h-[12px] text-[#f59e0b] fill-[#f59e0b]" />
              <span className="font-montserrat text-[11px] text-white">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[8px] items-center py-[25px] px-[15px] text-center font-montserrat font-bold">
          <p className="text-[#252b42] text-[16px] tracking-[0.1px] line-clamp-2 leading-[22px]">{name}</p>
          <div className="flex gap-[5px] text-[16px] tracking-[0.1px]">
            <span className="text-[#23856d]">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Blog card ──────────────────────────────────────────────────── */
function BlogCard({ img }) {
  return (
    <div className="flex bg-white shadow-sm rounded-[4px] overflow-hidden flex-1 min-w-[280px]">
      {/* Image column */}
      <div className="relative w-[200px] flex-shrink-0">
        <img
          alt=""
          src={img}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-6 flex gap-[10px] left-1/2 -translate-x-1/2">
          {[
            { Icon: Heart,        label: 'Wishlist' },
            { Icon: ShoppingCart, label: 'Cart' },
            { Icon: Eye,          label: 'View' },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              title={label}
              className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center hover:bg-[#23a6f0] hover:text-white transition-colors text-[#737373] shadow-sm"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <div className="absolute top-5 left-5 bg-[#e74040] px-[10px] rounded-[3px]">
          <p className="font-montserrat font-bold text-[14px] text-white leading-[24px]">Sale</p>
        </div>
      </div>

      {/* Text column */}
      <div className="flex flex-col gap-[10px] py-[25px] px-[25px] flex-1">
        <div className="flex items-center justify-between">
          <p className="font-montserrat font-bold text-[#23a6f0] text-[14px] tracking-[0.2px]">English Department</p>
          <div className="bg-[#252b42] flex gap-[5px] items-center px-[5px] py-[5px] rounded-[20px]">
            <Star className="w-[14px] h-[14px] text-[#f59e0b] fill-[#f59e0b]" />
            <p className="font-montserrat text-[12px] text-white tracking-[0.2px]">4.9</p>
          </div>
        </div>
        <p className="font-montserrat font-bold text-[#252b42] text-[16px] tracking-[0.1px]">Graphic Design</p>
        <p className="font-montserrat text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">
          We focus on ergonomics and meeting you where you work. It's only a keystroke away.
        </p>
        <div className="flex gap-[10px] items-center">
          <MessageCircle className="w-4 h-4 text-[#737373]" />
          <p className="font-montserrat font-bold text-[#737373] text-[14px] tracking-[0.2px]">15 Sales</p>
        </div>
        <div className="flex gap-[5px] font-montserrat font-bold text-[16px] tracking-[0.1px]">
          <span className="text-[#bdbdbd]">$16.48</span>
          <span className="text-[#23856d]">$6.48</span>
        </div>
        <div className="relative h-[16px] w-[82px]">
          <img alt="" src={imgProductColors} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="flex items-center justify-between py-[10px]">
          <div className="flex gap-[5px] items-center">
            <Clock className="w-4 h-4 text-[#737373]" />
            <p className="font-montserrat text-[#737373] text-[12px] tracking-[0.2px]">22h...</p>
          </div>
          <div className="flex gap-[5px] items-center">
            <Layers className="w-4 h-4 text-[#737373]" />
            <p className="font-montserrat text-[#737373] text-[12px] tracking-[0.2px]">64 Lessons</p>
          </div>
          <div className="flex gap-[5px] items-center">
            <BarChart2 className="w-4 h-4 text-[#737373]" />
            <p className="font-montserrat text-[#737373] text-[12px] tracking-[0.2px]">Progress</p>
          </div>
        </div>
        <div className="flex gap-[10px] items-center border border-[#23a6f0] rounded-[37px] px-[20px] py-[10px] w-fit hover:bg-[#23a6f0] group transition-colors cursor-pointer">
          <p className="font-montserrat font-bold text-[#23a6f0] text-[14px] tracking-[0.2px] group-hover:text-white">Learn More</p>
          <ChevronRight className="w-4 h-4 text-[#23a6f0] group-hover:text-white" />
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function HomePage() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    api.get('/products', { params: { limit: 10, sort: 'rating:desc' } })
      .then((res) => setTopProducts(res.data?.products ?? []))
      .catch(() => {});
  }, []);

  const row1 = topProducts.slice(0, 5);
  const row2 = topProducts.slice(5, 10);

  return (
    <div className="bg-white flex flex-col w-full overflow-x-hidden font-montserrat">
      <TopBar />
      <Navbar />

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-[40px] overflow-hidden">
        <W>
          <div className="bg-gradient-to-r from-[#96e9fb] to-[#abecd6] rounded-[20px] flex flex-col md:flex-row items-center justify-between overflow-hidden min-h-[500px]">

            {/* Text */}
            <div className="flex flex-col gap-[24px] items-start px-[60px] py-[60px] md:py-0 z-10 max-w-[460px]">
              <p className="font-bold text-[#2a7cc7] text-[16px] tracking-[0.1px]">SUMMER 2020</p>
              <p className="font-bold text-[#252b42] text-[48px] md:text-[58px] leading-[1.15] tracking-[0.2px]">
                NEW COLLECTION
              </p>
              <p className="font-normal text-[#737373] text-[20px] tracking-[0.2px] leading-[30px]">
                We know how large objects will act,<br />but things on a small scale.
              </p>
              <Link
                to="/shop"
                className="bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors px-[40px] py-[15px] rounded-[5px] font-bold text-[24px] text-white tracking-[0.1px]"
              >
                SHOP NOW
              </Link>
            </div>

            {/* Hero image */}
            <div className="relative flex-shrink-0 w-full md:w-[500px] h-[380px] md:h-[500px]">
              <img alt="" src={imgEllipse1}
                className="absolute"
                style={{ width: 380, height: 380, right: 30, top: 60 }}
              />
              <img alt="" src={imgEllipse2}
                className="absolute"
                style={{ width: 58, height: 58, left: 20, top: 40 }}
              />
              <img alt="" src={imgEllipse3}
                className="absolute"
                style={{ width: 24, height: 24, right: 16, top: '55%' }}
              />
              <img alt="" src={imgEllipse4}
                className="absolute"
                style={{ width: 12, height: 12, right: 10, top: '30%' }}
              />
              <img alt="" src={imgEllipse4}
                className="absolute"
                style={{ width: 12, height: 12, left: 50, bottom: 50 }}
              />
              <img
                alt="hero model"
                src={imgHero}
                className="absolute bottom-0 object-contain object-bottom"
                style={{ height: '98%', right: 0, left: '8%' }}
              />
            </div>

          </div>
        </W>
      </section>

      {/* ══ CLIENTS / BRANDS ════════════════════════════════════ */}
      <section className="w-full bg-white py-[50px]">
        <W className="flex flex-wrap items-center justify-center gap-[30px] md:gap-[50px]">
          {BRANDS.map(({ src, w, h }, i) => (
            <div key={i} className="flex items-center justify-center" style={{ width: w, height: h }}>
              <img alt="" src={src} className="w-full h-full object-contain" />
            </div>
          ))}
        </W>
      </section>

      {/* ══ SHOP CARDS ══════════════════════════════════════════ */}
      <section className="w-full bg-white py-[80px]">
        <W>
          <div className="flex flex-col md:flex-row gap-[15px] h-auto md:h-[572px]">

            {/* Large card */}
            <div className="relative flex-[1.1] min-h-[280px] md:min-h-0 overflow-hidden rounded-[4px]">
              <img alt="" src={imgShop1} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-[60%] bg-[rgba(45,139,192,0.75)] p-[30px] md:p-[40px]">
                <p className="font-bold text-[24px] text-white tracking-[0.1px] leading-[32px] mb-[16px]">
                  Top Product Of<br />the Week
                </p>
                <div className="border border-white rounded-[5px] px-[30px] py-[12px] w-fit cursor-pointer hover:bg-white hover:text-[#23a6f0] transition-colors">
                  <p className="font-bold text-[14px] text-white tracking-[0.2px]">EXPLORE ITEMS</p>
                </div>
              </div>
            </div>

            {/* Two stacked cards */}
            <div className="flex flex-col flex-1 gap-[15px]">
              <div className="relative flex-1 min-h-[200px] overflow-hidden rounded-[4px]">
                <img alt="" src={imgShop2} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-[65%] bg-[rgba(45,139,192,0.75)] p-[24px]">
                  <p className="font-normal text-[18px] text-white tracking-[0.2px] leading-[26px] mb-[12px]">
                    Top Product Of the Week
                  </p>
                  <div className="border border-white rounded-[5px] px-[24px] py-[10px] w-fit cursor-pointer hover:bg-white hover:text-[#23a6f0] transition-colors">
                    <p className="font-bold text-[14px] text-white tracking-[0.2px]">EXPLORE ITEMS</p>
                  </div>
                </div>
              </div>
              <div className="relative flex-1 min-h-[200px] overflow-hidden rounded-[4px]">
                <img alt="" src={imgShop3} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-[55%] bg-[rgba(45,139,192,0.75)] p-[24px]">
                  <p className="font-normal text-[18px] text-white tracking-[0.2px] leading-[26px] mb-[12px]">
                    Top Product Of the Week
                  </p>
                  <div className="border border-white rounded-[5px] px-[24px] py-[10px] w-fit cursor-pointer hover:bg-white hover:text-[#23a6f0] transition-colors">
                    <p className="font-bold text-[14px] text-white tracking-[0.2px]">EXPLORE ITEMS</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </W>
      </section>

      {/* ══ BESTSELLER PRODUCTS ═════════════════════════════════ */}
      <section className="w-full bg-white py-[80px]">
        <W className="flex flex-col items-center gap-[40px]">
          {/* Header */}
          <div className="text-center">
            <p className="font-normal text-[#737373] text-[20px] tracking-[0.2px] leading-[30px]">Featured Products</p>
            <p className="font-bold text-[#252b42] text-[24px] tracking-[0.1px] leading-[32px]">BESTSELLER PRODUCTS</p>
            <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] mt-[10px]">
              Problems trying to resolve the conflict between
            </p>
          </div>

          {/* Grid row 1 */}
          {row1.length > 0 ? (
            <div className="flex flex-wrap gap-[20px] justify-center w-full">
              {row1.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            /* skeleton while loading */
            <div className="flex flex-wrap gap-[20px] justify-center w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1 min-w-[150px] max-w-[210px] h-[320px] bg-[#f0f0f0] rounded-[4px] animate-pulse" />
              ))}
            </div>
          )}
          {/* Grid row 2 */}
          {row2.length > 0 && (
            <div className="flex flex-wrap gap-[20px] justify-center w-full">
              {row2.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Load more */}
          <Link
            to="/shop"
            className="border border-[#23a6f0] px-[40px] py-[15px] rounded-[5px] hover:bg-[#23a6f0] transition-colors group"
          >
            <p className="font-bold text-[#23a6f0] text-[14px] tracking-[0.2px] group-hover:text-white">
              LOAD MORE PRODUCTS
            </p>
          </Link>
        </W>
      </section>

      {/* ══ WE LOVE WHAT WE DO ══════════════════════════════════ */}
      <section className="w-full bg-white py-[80px]">
        <W>
          <div className="flex flex-col md:flex-row items-center gap-[60px]">
            {/* Images */}
            <div className="flex gap-[16px] flex-shrink-0 w-full md:w-auto">
              <img
                alt=""
                src={imgContentLeft}
                className="w-[42%] md:w-[200px] object-cover rounded-[4px]"
                style={{ height: 480 }}
              />
              <img
                alt=""
                src={imgContentRight}
                className="w-[58%] md:w-[270px] object-cover rounded-[4px]"
                style={{ height: 480 }}
              />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-[16px] max-w-[440px]">
              <p className="font-bold text-[#23a6f0] text-[16px] tracking-[0.1px]">Featured Products</p>
              <p className="font-bold text-[#252b42] text-[40px] tracking-[0.2px] leading-[1.2]">We love what we do</p>
              <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
                <br /><br />
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </p>
            </div>
          </div>
        </W>
      </section>

      {/* ══ THE BEST SERVICES ═══════════════════════════════════ */}
      <section className="w-full bg-white py-[80px]">
        <W className="flex flex-col items-center gap-[64px]">
          <div className="text-center">
            <p className="font-normal text-[#737373] text-[20px] tracking-[0.2px] leading-[30px]">Featured Products</p>
            <p className="font-bold text-[#252b42] text-[24px] tracking-[0.1px] leading-[32px]">THE BEST SERVICES</p>
            <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] mt-[10px]">
              Problems trying to resolve the conflict between
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-[30px] justify-center w-full">
            {[
              { Icon: BookOpen,    color: '#23a6f0', title: 'Easy Wins',   desc: 'Get your best looking smile now!' },
              { Icon: Layers,      color: '#23856d', title: 'Concrete',    desc: 'Defalcate is most focused in helping you discover your most beautiful smile' },
              { Icon: TrendingUp,  color: '#e77c40', title: 'Hack Growth', desc: 'Overcame any hurdle or any other problem.' },
            ].map(({ Icon, color, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-[20px] flex-1 px-[40px] py-[35px] text-center">
                <div
                  className="flex items-center justify-center w-[72px] h-[72px] rounded-full"
                  style={{ backgroundColor: color + '18' }}
                >
                  <Icon className="w-[32px] h-[32px]" style={{ color }} />
                </div>
                <p className="font-bold text-[#252b42] text-[24px] tracking-[0.1px] leading-[32px]">{title}</p>
                <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">{desc}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* ══ FEATURED POSTS ══════════════════════════════════════ */}
      <section className="w-full bg-white py-[80px]">
        <W className="flex flex-col items-center gap-[64px]">
          <div className="text-center">
            <p className="font-bold text-[#23a6f0] text-[14px] tracking-[0.2px] leading-[24px]">Practice Advice</p>
            <p className="font-bold text-[#252b42] text-[40px] tracking-[0.2px] leading-[50px]">Featured Posts</p>
          </div>
          <div className="flex flex-col md:flex-row gap-[30px] w-full">
            <BlogCard img={imgBlog1} />
            <BlogCard img={imgBlog2} />
          </div>
        </W>
      </section>

      <Footer />
    </div>
  );
}
