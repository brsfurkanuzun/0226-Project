import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { title: 'Company Info', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Legal',        links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Features',     links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'] },
  { title: 'Resources',    links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API'] },
];

const FbIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white w-full font-montserrat">

      {/* ── Top bar: Logo + Social ── */}
      <div className="bg-[#fafafa] w-full">
        <div className="max-w-[1050px] mx-auto px-4 py-[30px] flex flex-col sm:flex-row items-center justify-between gap-[20px]">
          <Link to="/" className="font-bold text-[#252b42] text-[24px] tracking-[0.1px]">
            Bandage
          </Link>
          <div className="flex gap-[20px] items-center">
            {[
              { Icon: FbIcon, href: 'https://facebook.com',  label: 'Facebook'  },
              { Icon: IgIcon, href: 'https://instagram.com', label: 'Instagram' },
              { Icon: XIcon,  href: 'https://x.com',         label: 'X'         },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="text-[#23a6f0] hover:text-[#2a7cc7] transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-[#e8e8e8]" />

      {/* ── Links + Newsletter ── */}
      <div className="bg-white w-full py-[50px]">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-wrap gap-[40px] justify-between">

          {/* Link columns */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-[20px] min-w-[120px]">
              <p className="font-bold text-[#252b42] text-[16px] tracking-[0.1px] leading-[24px]">
                {title}
              </p>
              <div className="flex flex-col gap-[10px]">
                {links.map((l) => (
                  <p
                    key={l}
                    className="font-bold text-[#737373] text-[14px] tracking-[0.2px] leading-[24px] cursor-pointer hover:text-[#23a6f0] transition-colors"
                  >
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter */}
          <div className="flex flex-col gap-[20px] min-w-[260px] flex-1 max-w-[340px]">
            <p className="font-bold text-[#252b42] text-[16px] tracking-[0.1px] leading-[24px]">
              Get In Touch
            </p>
            <div className="flex flex-col gap-[8px]">
              <div className="flex h-[58px] rounded-[5px] overflow-hidden border border-[#e6e6e6]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 bg-[#f9f9f9] px-[18px] font-normal text-[#737373] text-[14px] tracking-[0.2px] outline-none"
                />
                <button className="bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors px-[24px] font-normal text-white text-[14px] tracking-[0.2px] whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="font-normal text-[#737373] text-[12px] tracking-[0.2px] leading-[28px]">
                Lore imp sum dolor Amit
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="bg-[#fafafa] w-full">
        <div className="max-w-[1050px] mx-auto px-4 py-[25px]">
          <p className="font-bold text-[#737373] text-[14px] tracking-[0.2px] leading-[24px]">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>

    </footer>
  );
}
