import { Phone, Mail } from 'lucide-react';

/* ── X (formerly Twitter) logo ── */
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const SOCIAL = [
  { Icon: FbIcon, href: 'https://facebook.com',  label: 'Facebook'  },
  { Icon: IgIcon, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: XIcon,  href: 'https://x.com',         label: 'X'         },
];

export default function TopBar() {
  return (
    <div className="bg-[#252b42] w-full shrink-0">
      <div className="max-w-[1440px] mx-auto px-6 h-[58px] flex items-center justify-between gap-4">

        {/* Left: Phone + Email */}
        <div className="hidden md:flex items-center gap-[20px]">
          <a
            href="tel:+12255550118"
            className="flex items-center gap-[5px] text-white hover:text-[#23a6f0] transition-colors"
          >
            <Phone className="w-[16px] h-[16px] shrink-0" />
            <span className="font-montserrat font-bold text-[14px] tracking-[0.2px] whitespace-nowrap">
              (225) 555-0118
            </span>
          </a>
          <a
            href="mailto:furkan.uzun@example.com"
            className="flex items-center gap-[5px] text-white hover:text-[#23a6f0] transition-colors"
          >
            <Mail className="w-[16px] h-[16px] shrink-0" />
            <span className="font-montserrat font-bold text-[14px] tracking-[0.2px] whitespace-nowrap">
              furkan.uzun@example.com
            </span>
          </a>
        </div>

        {/* Center: promo */}
        <p className="font-montserrat font-bold text-[14px] text-white tracking-[0.2px] text-center flex-1 md:flex-none whitespace-nowrap">
          Follow Us and get a chance to win 80% off
        </p>

        {/* Right: Follow Us + social */}
        <div className="flex items-center gap-[12px]">
          <span className="hidden md:inline font-montserrat font-bold text-[14px] text-white tracking-[0.2px] whitespace-nowrap">
            Follow Us :
          </span>
          <div className="flex items-center gap-[14px]">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="text-white hover:text-[#23a6f0] transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
