import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { UserMenuMobile } from '../components/UserMenu';

/* --------------------------------------------------------------------------
   Image assets – mobile specific (local from Figma export)
-------------------------------------------------------------------------- */
const imgTechnology1                    = '/images/m-hero.png';
const imgMediaBgCover                   = '/images/m-shop-1.png';
const imgMediaBgCover1                  = '/images/m-shop-2.png';
const imgMediaBgCover2                  = '/images/m-shop-3.png';
const imgFixedHeight                    = '/images/m-product-1.png';
const imgFixedHeight1                   = '/images/m-product-2.png';
const imgFixedHeight2                   = '/images/m-product-3.png';
const imgFixedHeight3                   = '/images/m-product-4.png';
const imgFixedHeight4                   = '/images/m-product-5.png';
const imgUnsplashLks7VeiEAg             = '/images/m-content-left.png';
const imgUnsplashLks7VeiEAg1            = '/images/m-content-right.png';
const imgFixedHeight5                   = '/images/m-blog-1.png';
const imgFixedHeight6                   = '/images/m-blog-2.png';
const imgEllipse26                      = '/images/m-ellipse-1.svg';
const imgEllipse27                      = '/images/m-ellipse-2.svg';
const imgEllipse28                      = '/images/m-ellipse-3.svg';
const imgEllipse29                      = '/images/m-ellipse-4.svg';
const imgFaBrandsHooli                  = '/images/m-brand-1.png';
const imgFaBrandsLyft                   = '/images/m-brand-2.png';
const imgFaBrandsPiedPiperHat           = '/images/m-brand-3.png';
const imgFaBrandsStripe                 = '/images/m-brand-4.png';
const imgFaBrandsAws                    = '/images/m-brand-5.png';
const imgFaBrandsRedditAlien            = '/images/m-brand-6.png';
const imgBxBxsBookReader                = '/images/feature-1.svg';
const imgCarbonBook                     = '/images/feature-2.svg';
const imgUilArrowGrowth                 = '/images/feature-3.svg';
const imgCoolicon                       = '/images/icon-calendar.svg';
const imgIconAntDesignAreaChartOutlined = '/images/icon-area-chart.svg';
const imgIconArrowNext                  = '/images/m-icon-arrow-next.svg';
const imgHr                             = '/images/m-hr.svg';
const imgAntDesignFacebookFilled        = '/images/social-facebook.svg';
const imgAntDesignInstagramOutlined     = '/images/social-instagram.svg';
const imgAntDesignTwitterOutlined       = '/images/social-twitter.svg';

/* --------------------------------------------------------------------------
   Pixel-perfect Figma → React: ecommerce-mobile-2
-------------------------------------------------------------------------- */
const MOBILE_NAV = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop' },
  { label: 'About',   to: '/about' },
  { label: 'Blog',    to: '#' },
  { label: 'Contact', to: '/contact' },
];

export default function MobilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="bg-white flex flex-col items-start relative w-full overflow-x-hidden">

      {/* ── HEADER (navbar + hero) ── */}
      <div className="bg-white flex flex-col items-center overflow-clip relative shrink-0 w-full">
        {/* Navbar */}
        <div className="bg-white h-[58px] border-b border-[#e8e8e8] overflow-clip relative shrink-0 w-full flex items-center justify-between px-[16px]">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <span className="font-montserrat font-bold text-[#252b42] text-[24px] tracking-[0.1px] whitespace-nowrap">
              Bandage
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-[8px]">
            <button className="w-[40px] h-[40px] flex items-center justify-center text-[#737373] hover:text-[#23a6f0] transition-colors">
              <Search className="w-[20px] h-[20px]" />
            </button>
            <Link to="/shop" className="w-[40px] h-[40px] flex items-center justify-center text-[#23a6f0] hover:text-[#2a7cc7] transition-colors">
              <ShoppingCart className="w-[20px] h-[20px]" />
            </Link>
            <button
              className="w-[40px] h-[40px] flex items-center justify-center text-[#737373] hover:text-[#252b42] transition-colors"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              {menuOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
            </button>
          </div>
        </div>

        {/* Mobile nav menu — toggleable */}
        {menuOpen && (
          <div className="w-full bg-white border-b border-[#e8e8e8] py-8 flex flex-col items-center gap-[24px]">
            {MOBILE_NAV.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`font-montserrat font-bold leading-[45px] text-[30px] text-center tracking-[0.2px] whitespace-nowrap transition-colors ${
                  (to === '/' ? pathname === '/' : pathname.startsWith(to) && to !== '#')
                    ? 'text-[#252b42]'
                    : 'text-[#737373] hover:text-[#23a6f0]'
                }`}
              >
                {label}
              </Link>
            ))}
            <UserMenuMobile />
          </div>
        )}

        {/* Hero gradient */}
        <div className="bg-gradient-to-r from-[#96e9fb] to-[#abecd6] flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 w-full">
          <div className="flex flex-col gap-[66px] items-center overflow-clip pt-[80px] relative shrink-0 w-[388px]">
            {/* Text content */}
            <div className="flex flex-col gap-[32px] items-center overflow-clip relative shrink-0 w-full">
              <p className="font-montserrat font-bold leading-[24px] relative shrink-0 text-[#2a7cc7] text-[16px] tracking-[0.1px] whitespace-nowrap">SUMMER 2020</p>
              <div className="font-montserrat font-bold relative shrink-0 text-[#252b42] text-[40px] text-center tracking-[0.2px] whitespace-nowrap">
                <p className="leading-[50px] mb-0 whitespace-pre">{`NEW `}</p>
                <p className="leading-[50px] whitespace-pre">COLLECTION</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#737373] text-[20px] text-center tracking-[0.2px] whitespace-nowrap">
                <p className="leading-[30px] mb-0 whitespace-pre">{`We know how large objects `}</p>
                <p className="leading-[30px] mb-0 whitespace-pre">{`will act, but things on a `}</p>
                <p className="leading-[30px] whitespace-pre">small scale.</p>
              </div>
              <Link to="/shop" className="bg-[#23a6f0] flex flex-col items-center overflow-clip px-[40px] py-[15px] relative rounded-[5px] shrink-0 hover:bg-[#2a7cc7] transition-colors">
                <p className="font-montserrat font-bold leading-[32px] text-[24px] text-center text-white tracking-[0.1px] whitespace-nowrap">SHOP NOW</p>
              </Link>
            </div>

            {/* Hero image */}
            <div className="flex flex-col h-[453px] items-center justify-center overflow-clip relative shrink-0 w-full">
              <div className="h-[372px] relative shrink-0 w-[384px]">
                <div className="absolute left-[35.51px] size-[294px] top-0">
                  <img alt="" className="absolute inset-0 max-w-none size-full" src={imgEllipse26} />
                </div>
                <div className="absolute left-0 size-[47px] top-[7px]">
                  <img alt="" className="absolute inset-0 max-w-none size-full" src={imgEllipse27} />
                </div>
                <div className="absolute left-1/2 -translate-x-[18px] h-[433px] w-[410px] top-[-34px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[80.83%] left-[-11.33%] max-w-none top-[16.47%] w-[121.81%]" src={imgTechnology1} />
                  </div>
                </div>
                <div className="absolute left-[337px] size-[18px] top-[150px]">
                  <img alt="" className="absolute inset-0 max-w-none size-full" src={imgEllipse28} />
                </div>
                <div className="absolute left-[350px] size-[9px] top-[74px]">
                  <img alt="" className="absolute inset-0 max-w-none size-full" src={imgEllipse29} />
                </div>
                <div className="absolute left-[14px] size-[9px] top-[248px]">
                  <img alt="" className="absolute inset-0 max-w-none size-full" src={imgEllipse29} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CLIENTS ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full py-[110px]">
        <div className="flex flex-col gap-[60px] items-center mx-auto px-[50px] py-[50px]">
          {[
            { src: imgFaBrandsHooli,        w: 149, h: 50  },
            { src: imgFaBrandsLyft,         w: 139, h: 99  },
            { src: imgFaBrandsPiedPiperHat, w: 149, h: 109 },
            { src: imgFaBrandsStripe,       w: 149, h: 60  },
            { src: imgFaBrandsAws,          w: 153, h: 92  },
            { src: imgFaBrandsRedditAlien,  w: 149, h: 142 },
          ].map(({ src, w, h }, i) => (
            <div key={i} className="flex flex-col items-center relative shrink-0">
              <div className="relative shrink-0" style={{ width: w, height: h }}>
                <img alt="" className="absolute inset-0 max-w-none size-full" src={src} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOP CARDS ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full py-[24px]">
        <div className="flex flex-col gap-[15px] items-center mx-auto">
          {/* Large card */}
          <div className="h-[556px] overflow-clip relative shrink-0 w-[345px]">
            <div className="absolute bg-white h-[556px] left-0 overflow-clip top-0 w-[345px]">
              <div className="absolute inset-0 overflow-clip">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMediaBgCover} />
              </div>
              <div className="absolute bg-[rgba(45,139,192,0.75)] bottom-0 h-[238px] left-[-1px] overflow-clip w-[346px]">
                <div className="absolute font-montserrat font-bold leading-[0] left-[41px] text-[24px] text-white top-[60px] tracking-[0.1px] whitespace-nowrap">
                  <p className="leading-[32px] mb-0 whitespace-pre">{`Top Product Of `}</p>
                  <p className="leading-[32px] whitespace-pre">the Week</p>
                </div>
                <div className="absolute border border-solid border-white flex flex-col items-center left-[41.5px] overflow-clip px-[40px] py-[15px] rounded-[5px] top-[150px]">
                  <p className="font-montserrat font-bold leading-[22px] text-[14px] text-white tracking-[0.2px] whitespace-nowrap">EXPLORE ITEMS</p>
                </div>
              </div>
            </div>
          </div>
          {/* Two equal cards */}
          {[imgMediaBgCover1, imgMediaBgCover2].map((img, i) => (
            <div key={i} className="h-[398px] overflow-clip relative shrink-0 w-[344px]">
              <div className="absolute bg-white h-[398px] left-0 overflow-clip top-0 w-[344px]">
                <div className="absolute inset-0 overflow-clip">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
                </div>
                <div className="absolute bg-[rgba(45,139,192,0.75)] bottom-0 h-[238px] left-[-1px] overflow-clip w-[346px]">
                  <div className="absolute font-montserrat font-bold leading-[0] left-[41px] text-[24px] text-white top-[60px] tracking-[0.1px] whitespace-nowrap">
                    <p className="leading-[32px] mb-0 whitespace-pre">{`Top Product Of `}</p>
                    <p className="leading-[32px] whitespace-pre">the Week</p>
                  </div>
                  <div className="absolute border border-solid border-white flex flex-col items-center left-[41.5px] overflow-clip px-[40px] py-[15px] rounded-[5px] top-[150px]">
                    <p className="font-montserrat font-bold leading-[22px] text-[14px] text-white tracking-[0.2px] whitespace-nowrap">EXPLORE ITEMS</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCT CARDS ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full py-[80px]">
        <div className="flex flex-col gap-[24px] items-center mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-[10px] items-center text-center w-[279px]">
            <p className="font-montserrat font-bold leading-[32px] text-[#252b42] text-[24px] tracking-[0.1px] w-[239px]">BESTSELLER PRODUCTS</p>
            <p className="font-montserrat font-normal leading-[20px] text-[#737373] text-[14px] tracking-[0.2px] w-[261px]">{`Problems trying to resolve the conflict between `}</p>
          </div>
          {/* Product list */}
          <div className="flex flex-col gap-[30px] items-start p-[24px]">
            {[imgFixedHeight, imgFixedHeight1, imgFixedHeight2, imgFixedHeight3, imgFixedHeight4].map((img, i) => (
              <div key={i} className="flex flex-col items-start relative shrink-0 w-[295px]">
                <div className="bg-white flex flex-col items-start overflow-clip relative shrink-0 w-full">
                  <div className="h-[360px] overflow-clip relative shrink-0 w-full">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
                  </div>
                  <div className="flex flex-col font-montserrat font-bold gap-[10px] items-center leading-[24px] overflow-clip pb-[35px] pt-[25px] px-[25px] relative shrink-0 text-center w-full">
                    <p className="relative shrink-0 text-[#252b42] text-[16px] tracking-[0.1px] w-[131px]">Graphic Design</p>
                    <p className="relative shrink-0 text-[#737373] text-[14px] tracking-[0.2px] whitespace-nowrap">English Department</p>
                    <div className="flex gap-[5px] items-start px-[3px] py-[5px] relative shrink-0 text-[16px] tracking-[0.1px]">
                      <p className="relative shrink-0 text-[#bdbdbd] w-[52px]">$16.48</p>
                      <p className="relative shrink-0 text-[#23856d] w-[45px]">$6.48</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Load more */}
          <div className="border border-[#23a6f0] border-solid flex flex-col items-center overflow-clip px-[40px] py-[15px] relative rounded-[5px] shrink-0 cursor-pointer hover:bg-[#23a6f0] group transition-colors">
            <p className="font-montserrat font-bold leading-[22px] text-[#23a6f0] text-[14px] text-center tracking-[0.2px] whitespace-nowrap group-hover:text-white">LOAD MORE PRODUCTS</p>
          </div>
        </div>
      </div>

      {/* ── CONTENT (We love what we do) ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full py-[80px]">
        <div className="flex flex-col gap-[50px] items-center mx-auto">
          {/* Text */}
          <div className="flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[280px]">
            <p className="font-montserrat font-bold leading-[24px] text-[#23a6f0] text-[16px] tracking-[0.1px] whitespace-nowrap">Featured Products</p>
            <p className="font-montserrat font-bold leading-[50px] text-[#252b42] text-[40px] tracking-[0.2px] w-[246px]">We love what we do</p>
            <div className="font-montserrat font-normal relative shrink-0 text-[#737373] text-[14px] tracking-[0.2px] w-[258px]">
              <p className="leading-[20px] mb-0">{`Problems trying to resolve the conflict between the two major realms of Classical physics: `}</p>
              <p className="leading-[20px] mb-0">Newtonian mechanics</p>
              <p className="leading-[20px] mb-0">&nbsp;</p>
              <p className="leading-[20px] mb-0">{`Problems trying to resolve the conflict between the two major realms of Classical physics: `}</p>
              <p className="leading-[20px]">Newtonian mechanics</p>
            </div>
          </div>
          {/* Images */}
          <div className="flex items-start overflow-clip relative shrink-0 w-[374px]">
            <div className="h-[364px] overflow-clip relative shrink-0 w-[374px]">
              <div className="absolute h-[364px] left-0 top-0 w-[158px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUnsplashLks7VeiEAg} />
              </div>
              <div className="absolute h-[364px] left-[170px] top-0 w-[204px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUnsplashLks7VeiEAg1} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full py-[80px]">
        <div className="flex flex-col gap-[80px] items-center mx-auto">
          <div className="flex flex-col gap-[10px] items-center text-center whitespace-nowrap">
            <p className="font-montserrat font-normal leading-[30px] text-[#737373] text-[20px] tracking-[0.2px]">Featured Products</p>
            <p className="font-montserrat font-bold leading-[32px] text-[#252b42] text-[24px] tracking-[0.1px]">THE BEST SERVICES</p>
            <div className="font-montserrat font-normal text-[#737373] text-[14px] tracking-[0.2px]">
              <p className="leading-[20px] mb-0 whitespace-pre">{`Problems trying to resolve `}</p>
              <p className="leading-[20px] whitespace-pre">{`the conflict between `}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] items-start justify-center">
            {[
              { icon: imgBxBxsBookReader, title: 'Easy Wins',   desc: 'Get your best looking smile now!' },
              { icon: imgCarbonBook,      title: 'Concrete',    desc: 'Defalcate is most focused in helping you discover your most beautiful smile' },
              { icon: imgUilArrowGrowth,  title: 'Hack Growth', desc: 'Overcame any hurdle or any other problem.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center relative shrink-0 w-[328px]">
                <div className="flex flex-col gap-[20px] items-center overflow-clip px-[40px] py-[35px] relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[72px]">
                    <div className="absolute left-[-0.5px] size-[72px] top-0">
                      <img alt="" className="absolute inset-0 max-w-none size-full" src={icon} />
                    </div>
                  </div>
                  <p className="font-montserrat font-bold leading-[32px] text-[#252b42] text-[24px] text-center tracking-[0.1px] w-[235px]">{title}</p>
                  <p className="font-montserrat font-normal leading-[20px] text-[#737373] text-[14px] text-center tracking-[0.2px] w-[225px]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BLOG ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full py-[80px]">
        <div className="flex flex-col gap-[80px] items-center mx-auto w-[414px]">
          <div className="flex flex-col font-montserrat font-bold gap-[10px] items-center text-center tracking-[0.2px] whitespace-nowrap">
            <p className="leading-[24px] text-[#23a6f0] text-[14px]">Practice Advice</p>
            <p className="leading-[50px] text-[#252b42] text-[40px]">Featured Posts</p>
          </div>
          <div className="flex flex-col gap-[30px] items-start justify-center">
            {[
              { img: imgFixedHeight5 },
              { img: imgFixedHeight6 },
            ].map(({ img }, idx) => (
              <div key={idx} className="flex flex-col items-center relative shrink-0 w-[328px]">
                <div className="bg-white flex flex-col items-start overflow-clip relative shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0">
                  <div className="h-[300px] overflow-clip relative shrink-0 w-full">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
                    <div className="absolute bg-[#e74040] flex items-center left-[20px] overflow-clip px-[10px] rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[20px]">
                      <p className="font-montserrat font-bold leading-[24px] text-[14px] text-center text-white tracking-[0.2px] whitespace-nowrap">NEW</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] items-start overflow-clip pb-[35px] pt-[25px] px-[25px] relative shrink-0 w-full">
                    <div className="flex font-montserrat font-normal gap-[15px] items-center leading-[16px] overflow-clip text-[12px] tracking-[0.2px] whitespace-nowrap">
                      <p className="relative shrink-0 text-[#8ec2f2]">Google</p>
                      <p className="relative shrink-0 text-[#737373]">Trending</p>
                      <p className="relative shrink-0 text-[#737373]">New</p>
                    </div>
                    <div className="font-montserrat font-normal relative shrink-0 text-[#252b42] text-[20px] tracking-[0.2px] w-[247px]">
                      <p className="leading-[30px] mb-0">{`Loudest à la Madison #1 `}</p>
                      <p className="leading-[30px]">{`(L'integral)`}</p>
                    </div>
                    <div className="font-montserrat font-normal relative shrink-0 text-[#737373] text-[14px] tracking-[0.2px] w-[280px]">
                      <p className="leading-[20px] mb-0">{`We focus on ergonomics and meeting `}</p>
                      <p className="leading-[20px] mb-0">{`you where you work. It's only a `}</p>
                      <p className="leading-[20px]">keystroke away.</p>
                    </div>
                    <div className="flex items-center justify-between overflow-clip py-[15px] relative shrink-0 w-full">
                      <div className="flex gap-[5px] items-center overflow-clip relative shrink-0">
                        <div className="overflow-clip relative shrink-0 size-[16px]">
                          <div className="absolute left-0 overflow-clip size-[16px] top-0">
                            <div className="absolute inset-[9.55%_9.58%_8.33%_9.55%]">
                              <img alt="" className="absolute inset-0 max-w-none size-full" src={imgCoolicon} />
                            </div>
                          </div>
                        </div>
                        <p className="font-montserrat font-normal leading-[16px] text-[#737373] text-[12px] tracking-[0.2px] whitespace-nowrap">22 April 2021</p>
                      </div>
                      <div className="flex gap-[5px] items-center overflow-clip relative shrink-0">
                        <div className="h-[14.667px] relative shrink-0 w-[16px]">
                          <img alt="" className="absolute inset-0 max-w-none size-full" src={imgIconAntDesignAreaChartOutlined} />
                        </div>
                        <p className="font-montserrat font-normal leading-[16px] text-[#737373] text-[12px] tracking-[0.2px] whitespace-nowrap">10 comments</p>
                      </div>
                    </div>
                    <div className="flex gap-[10px] items-center overflow-clip relative shrink-0 cursor-pointer hover:text-[#23a6f0] group transition-colors">
                      <p className="font-montserrat font-bold leading-[24px] text-[#737373] text-[14px] tracking-[0.2px] whitespace-nowrap group-hover:text-[#23a6f0]">Learn More</p>
                      <div className="h-[16px] relative shrink-0 w-[9px]">
                        <img alt="" className="absolute inset-0 max-w-none size-full" src={imgIconArrowNext} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="bg-white overflow-clip relative shrink-0 w-full">
        {/* Logo + Social */}
        <div className="bg-[#fafafa] overflow-clip relative w-full py-[40px]">
          <div className="flex flex-col gap-[11px] items-center mx-auto w-[325px]">
            <div className="flex flex-col items-start overflow-clip relative shrink-0 w-[236px]">
              <p className="font-montserrat font-bold leading-[32px] text-[#252b42] text-[24px] tracking-[0.1px] whitespace-nowrap">Bandage</p>
            </div>
            <div className="flex gap-[20px] items-center justify-center overflow-clip relative shrink-0">
              {[
                { src: imgAntDesignFacebookFilled,    href: 'https://facebook.com',  label: 'Facebook'  },
                { src: imgAntDesignInstagramOutlined, href: 'https://instagram.com', label: 'Instagram' },
                { src: null,                          href: 'https://x.com',         label: 'X'         },
              ].map(({ src, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="overflow-clip relative shrink-0 size-[24px] hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  {src ? (
                    <img alt={label} className="absolute inset-0 max-w-none size-full" src={src} />
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* HR */}
        <div className="relative h-px w-full overflow-hidden">
          <img alt="" className="block max-w-none size-full" src={imgHr} />
        </div>

        {/* Links + Newsletter */}
        <div className="bg-white overflow-clip relative w-full py-[70px]">
          <div className="flex flex-col gap-[30px] items-start mx-auto w-[321px]">
            {[
              { title: 'Company Info', links: ['About Us','Carrier','We are hiring','Blog'] },
              { title: 'Legal',        links: ['About Us','Carrier','We are hiring','Blog'] },
              { title: 'Features',     links: ['Business Marketing','User Analytic','Live Chat','Unlimited Support'] },
              { title: 'Resources',    links: ['IOS & Android','Watch a Demo','Customers','API'] },
            ].map(({ title, links }) => (
              <div key={title} className="flex flex-col font-montserrat font-bold gap-[20px] items-start leading-[24px] overflow-clip relative shrink-0 w-[148px] whitespace-nowrap">
                <p className="relative shrink-0 text-[#252b42] text-[16px] tracking-[0.1px]">{title}</p>
                <div className="flex flex-col gap-[10px] items-start relative shrink-0 text-[#737373] text-[14px] tracking-[0.2px]">
                  {links.map(l => <p key={l} className="relative shrink-0 cursor-pointer hover:text-[#23a6f0] transition-colors">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Newsletter */}
            <div className="flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[321px]">
              <p className="font-montserrat font-bold leading-[24px] text-[#252b42] text-[16px] tracking-[0.1px] whitespace-nowrap">Get In Touch</p>
              <div className="h-[87px] relative shrink-0 w-[321px]">
                <div className="absolute h-[58px] left-0 overflow-clip right-0 top-0">
                  <div className="absolute bg-[#f9f9f9] border border-[#e6e6e6] border-solid inset-0 overflow-clip rounded-[5px]">
                    <p className="absolute font-montserrat font-normal leading-[28px] left-[19px] text-[#737373] text-[14px] top-[calc(50%-14px)] tracking-[0.2px] whitespace-nowrap">Your Email</p>
                  </div>
                  <div className="absolute bottom-0 overflow-clip right-0 top-0 w-[117px]">
                    <div className="absolute bg-[#23a6f0] border border-[#e6e6e6] border-solid inset-0 overflow-clip rounded-br-[5px] rounded-tr-[5px] cursor-pointer hover:bg-[#2a7cc7] transition-colors">
                      <p className="absolute font-montserrat font-normal leading-[28px] left-1/2 -translate-x-1/2 text-[14px] text-center text-white top-[calc(50%-14px)] tracking-[0.2px] whitespace-nowrap">Subscribe</p>
                    </div>
                  </div>
                </div>
                <p className="absolute bottom-0 font-montserrat font-normal leading-[28px] left-[2px] text-[#737373] text-[12px] tracking-[0.2px] whitespace-nowrap">Lore imp sum dolor Amit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-[#fafafa] overflow-clip relative w-full py-[25px]">
          <div className="flex flex-col items-center mx-auto w-[414px]">
            <div className="font-montserrat font-bold text-[#737373] text-[14px] text-center tracking-[0.2px] whitespace-nowrap">
              <p className="leading-[24px] mb-0 whitespace-pre">{`Made With Love By `}</p>
              <p className="leading-[24px] whitespace-pre">{`Furkan Uzun All Right Reserved `}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
