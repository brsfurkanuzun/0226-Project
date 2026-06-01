import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import TopBar    from '../components/layout/TopBar';
import Navbar    from '../components/layout/Navbar';
import Footer    from '../components/layout/Footer';

/* ── Inline social SVGs ─────────────────────────────────────────── */
const FbIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

/* ── Team members ───────────────────────────────────────────────── */
const TEAM = [
  {
    name:    'Gökhan Özdemir',
    role:    'Project Manager',
    initials:'GÖ',
    bg:      '#23a6f0',
    img:     'https://media.licdn.com/dms/image/v2/D4D03AQHhFEsFSKV7nQ/profile-displayphoto-shrink_200_200/0/1697392958139?e=2147483647&v=beta&t=MZQY8CskmT_j3PuRYSWkHYNqTxXSNK3J3pJnF7U0WKg',
  },
  {
    name:    'Furkan Uzun',
    role:    'Full Stack Developer',
    initials:'FU',
    bg:      '#2dc071',
    img:     null,
  },
  {
    name:    'Ayşe Kaya',
    role:    'UI / UX Designer',
    initials:'AK',
    bg:      '#8b5cf6',
    img:     'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name:    'Mehmet Yılmaz',
    role:    'Frontend Developer',
    initials:'MY',
    bg:      '#f59e0b',
    img:     'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name:    'Zeynep Arslan',
    role:    'Backend Developer',
    initials:'ZA',
    bg:      '#e74040',
    img:     'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name:    'Can Demir',
    role:    'Mobile Developer',
    initials:'CD',
    bg:      '#252b42',
    img:     'https://randomuser.me/api/portraits/men/71.jpg',
  },
  {
    name:    'Elif Şahin',
    role:    'QA Engineer',
    initials:'EŞ',
    bg:      '#23a6f0',
    img:     'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    name:    'Burak Çelik',
    role:    'DevOps Engineer',
    initials:'BÇ',
    bg:      '#2dc071',
    img:     'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    name:    'Selin Öztürk',
    role:    'Product Designer',
    initials:'SÖ',
    bg:      '#8b5cf6',
    img:     'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

/* ── Avatar with fallback ───────────────────────────────────────── */
function Avatar({ member }) {
  return (
    <div className="w-[64px] h-[64px] rounded-full overflow-hidden flex-shrink-0 relative">
      {member.img ? (
        <>
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className="absolute inset-0 items-center justify-center text-white font-bold text-[20px]"
            style={{ display: 'none', background: member.bg }}
          >
            {member.initials}
          </div>
        </>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-white font-bold text-[20px]"
          style={{ background: member.bg }}
        >
          {member.initials}
        </div>
      )}
    </div>
  );
}

/* ── Member card (horizontal: avatar + text + socials) ──────────── */
function MemberCard({ member }) {
  return (
    <div className="flex items-center gap-[20px] group">
      <Avatar member={member} />
      <div className="flex flex-col gap-[6px] min-w-0">
        <p className="font-bold text-[16px] text-[#252b42] tracking-[0.1px] leading-[24px]">
          {member.name}
        </p>
        <p className="font-bold text-[14px] text-[#737373] tracking-[0.2px] leading-[24px] truncate">
          {member.role}
        </p>
        {/* Social icons */}
        <div className="flex gap-[12px] mt-[4px]">
          {[
            { Icon: FbIcon, href: 'https://facebook.com',  label: 'Facebook'  },
            { Icon: XIcon,  href: 'https://x.com',         label: 'X'         },
            { Icon: IgIcon, href: 'https://instagram.com', label: 'Instagram' },
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
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* ── BREADCRUMB ────────────────────────────────────────── */}
      <div className="w-full bg-[#fafafa]">
        <div className="max-w-[1050px] mx-auto px-4 py-[24px] flex items-center gap-[8px]">
          <Link to="/" className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-[16px] h-[16px] text-[#bdbdbd]" />
          <span className="font-normal text-[14px] text-[#737373]">Team</span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="w-full bg-[#fafafa] pb-[80px] pt-[48px]">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-[40px]">
          {/* Left */}
          <div className="max-w-[500px]">
            <p className="font-bold text-[14px] text-[#23a6f0] uppercase tracking-[0.1px] mb-[16px]">
              What We Do
            </p>
            <h1 className="font-bold text-[40px] md:text-[58px] leading-[1.2] text-[#252b42] tracking-[0.2px] mb-[24px]">
              Innovation tailored for&nbsp;you
            </h1>
            <p className="font-normal text-[14px] text-[#737373] leading-[20px] tracking-[0.2px] mb-[32px]">
              Problems trying to resolve the conflict between the two major realms of Classical
              physics: Newtonian mechanics
            </p>
            <Link
              to="/shop"
              className="inline-block bg-[#23a6f0] hover:bg-[#2a7cc7] text-white font-bold text-[14px] px-[40px] py-[15px] rounded-[5px] transition-colors"
            >
              Get Quote Now
            </Link>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-[32px] md:gap-[48px]">
            {[
              { value: '15K',  label: 'Happy Customers'     },
              { value: '150K', label: 'Monthly Visitors'    },
              { value: '15',   label: 'Countries Worldwide' },
              { value: '100+', label: 'Top Partners'        },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-[8px]">
                <span className="font-bold text-[40px] text-[#252b42] leading-none">{value}</span>
                <span className="font-normal text-[16px] text-[#737373] tracking-[0.1px] text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO BANNER ──────────────────────────────────────── */}
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div
            className="w-full rounded-[8px] overflow-hidden relative flex items-center justify-center"
            style={{ height: '480px', background: 'linear-gradient(135deg, #e8f4fd 0%, #e8f7ee 100%)' }}
          >
            <button className="w-[72px] h-[72px] bg-[#23a6f0] rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(35,166,240,0.4)] hover:scale-110 transition-transform z-10">
              <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>
            <p className="absolute bottom-[32px] left-0 right-0 text-center font-bold text-[20px] text-[#252b42]">
              Problems trying to resolve the conflict between
            </p>
          </div>
        </div>
      </section>

      {/* ── MEET OUR TEAM ─────────────────────────────────────── */}
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-[64px]">
            <h2 className="font-bold text-[40px] text-[#252b42] tracking-[0.2px] mb-[16px]">
              Meet Our Team
            </h2>
            <p className="font-normal text-[14px] text-[#737373] leading-[20px] tracking-[0.2px] max-w-[460px] mx-auto">
              Problems trying to resolve the conflict between<br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* 3-column grid matching the Figma layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[48px]">
            {TEAM.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK WITH US ──────────────────────────────────────── */}
      <section className="w-full bg-[#fafafa] py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col items-center text-center gap-[32px]">
          <div>
            <p className="font-normal text-[#737373] text-[14px] uppercase tracking-[0.1px] mb-[12px]">
              Work With Us
            </p>
            <h2 className="font-bold text-[#252b42] text-[40px] tracking-[0.2px] mb-[16px]">
              Now Let&apos;s grow Yours
            </h2>
            <p className="font-normal text-[#737373] text-[14px] leading-[20px] max-w-[470px]">
              The gradual accumulation of information about atomic and small-scale behavior during the
              first quarter of the 20th&nbsp;century
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-[10px]">
            <Link
              to="/signup"
              className="bg-[#23a6f0] hover:bg-[#2a7cc7] text-white font-bold text-[14px] px-[40px] py-[15px] rounded-[5px] transition-colors"
            >
              Try it free now
            </Link>
            <Link
              to="/shop"
              className="border border-[#23a6f0] text-[#23a6f0] hover:bg-[#eff8ff] font-bold text-[14px] px-[40px] py-[15px] rounded-[5px] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
