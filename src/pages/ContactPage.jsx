import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/* ── Social SVGs ─────────────────────────────────────────────────── */
const FbIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

/* ── Info card ───────────────────────────────────────────────────── */
function InfoCard({ icon: Icon, color, title, lines }) {
  return (
    <div className="flex flex-col items-center text-center gap-[16px] flex-1 min-w-[200px] px-[30px] py-[35px] border border-[#e8e8e8] rounded-[4px] hover:shadow-md transition-shadow">
      <div
        className="w-[64px] h-[64px] rounded-full flex items-center justify-center"
        style={{ background: color + '18' }}
      >
        <Icon className="w-[28px] h-[28px]" style={{ color }} />
      </div>
      <p className="font-montserrat font-bold text-[#252b42] text-[16px] tracking-[0.1px]">
        {title}
      </p>
      <div className="font-montserrat font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[24px]">
        {lines.map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Contact form:', data);
    reset();
  };

  return (
    <div className="bg-white flex flex-col min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* ── HERO / BREADCRUMB ─────────────────────────────────── */}
      <div className="w-full bg-[#fafafa]">
        <div className="max-w-[1050px] mx-auto px-4 py-[40px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px]">
          <div>
            <p className="font-bold text-[#252b42] text-[24px] tracking-[0.1px] mb-[12px]">Contact Us</p>
            <div className="flex items-center gap-[8px]">
              <Link to="/" className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-[#bdbdbd]" />
              <span className="font-normal text-[14px] text-[#737373]">Contact</span>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] text-right hidden md:flex">
            <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px]">
              Problems trying to resolve the conflict between<br />
              the two major realms of Classical physics
            </p>
          </div>
        </div>
      </div>

      {/* ── INFO CARDS ────────────────────────────────────────── */}
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex flex-wrap gap-[30px] justify-center">
            <InfoCard
              icon={MapPin}
              color="#23a6f0"
              title="Address"
              lines={['Moonshine St. 14/05', 'Light City, London, UK']}
            />
            <InfoCard
              icon={Phone}
              color="#2dc071"
              title="Let's Talk"
              lines={['+45 070 123 4567']}
            />
            <InfoCard
              icon={Clock}
              color="#e77c40"
              title="Opening Hours"
              lines={['Mon–Fri: 08:00–22:00', 'Sat–Sun: 10:00–16:00']}
            />
            <InfoCard
              icon={Mail}
              color="#8b5cf6"
              title="Support"
              lines={['support@bandage.com']}
            />
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH ──────────────────────────────────────── */}
      <section className="w-full bg-[#fafafa] py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col md:flex-row gap-[60px]">

          {/* Left — Info + Social */}
          <div className="flex flex-col gap-[32px] md:w-[360px] flex-shrink-0">
            <div>
              <p className="font-bold text-[#252b42] text-[40px] tracking-[0.2px] leading-[1.2] mb-[16px]">
                Get in touch<br />today!
              </p>
              <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">
                We know how large objects will act, but things on a small scale.
              </p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[12px]">
                <Phone className="w-[16px] h-[16px] text-[#23a6f0] flex-shrink-0" />
                <span className="font-bold text-[#252b42] text-[16px] tracking-[0.1px]">+45 070 123 4567</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <Mail className="w-[16px] h-[16px] text-[#23a6f0] flex-shrink-0" />
                <span className="font-bold text-[#252b42] text-[16px] tracking-[0.1px]">support@bandage.com</span>
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="font-bold text-[#252b42] text-[16px] tracking-[0.1px]">Follow Us</p>
              <div className="flex gap-[16px]">
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
                    className="w-[40px] h-[40px] rounded-full border border-[#e8e8e8] bg-white flex items-center justify-center text-[#23a6f0] hover:bg-[#23a6f0] hover:text-white hover:border-[#23a6f0] transition-colors shadow-sm"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex-1">
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center gap-[16px] py-[60px] text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#2dc071]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#2dc071]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-bold text-[#252b42] text-[24px]">Message Sent!</p>
                <p className="font-normal text-[#737373] text-[14px]">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">

                {/* Name + Email row */}
                <div className="flex flex-col sm:flex-row gap-[24px]">
                  <div className="flex flex-col gap-[8px] flex-1">
                    <label className="font-bold text-[#252b42] text-[14px] tracking-[0.2px]">
                      Your Name <span className="text-[#e74040]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register('name', { required: 'Name is required' })}
                      className={`h-[58px] px-[18px] border rounded-[5px] bg-white font-normal text-[#252b42] text-[14px] tracking-[0.2px] outline-none focus:border-[#23a6f0] transition-colors ${
                        errors.name ? 'border-[#e74040]' : 'border-[#e6e6e6]'
                      }`}
                    />
                    {errors.name && (
                      <p className="font-normal text-[#e74040] text-[12px]">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-[8px] flex-1">
                    <label className="font-bold text-[#252b42] text-[14px] tracking-[0.2px]">
                      Email Address <span className="text-[#e74040]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                      })}
                      className={`h-[58px] px-[18px] border rounded-[5px] bg-white font-normal text-[#252b42] text-[14px] tracking-[0.2px] outline-none focus:border-[#23a6f0] transition-colors ${
                        errors.email ? 'border-[#e74040]' : 'border-[#e6e6e6]'
                      }`}
                    />
                    {errors.email && (
                      <p className="font-normal text-[#e74040] text-[12px]">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-bold text-[#252b42] text-[14px] tracking-[0.2px]">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    {...register('subject')}
                    className="h-[58px] px-[18px] border border-[#e6e6e6] rounded-[5px] bg-white font-normal text-[#252b42] text-[14px] tracking-[0.2px] outline-none focus:border-[#23a6f0] transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-bold text-[#252b42] text-[14px] tracking-[0.2px]">
                    Message <span className="text-[#e74040]">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Your message..."
                    {...register('message', { required: 'Message is required' })}
                    className={`px-[18px] py-[14px] border rounded-[5px] bg-white font-normal text-[#252b42] text-[14px] tracking-[0.2px] outline-none focus:border-[#23a6f0] transition-colors resize-none ${
                      errors.message ? 'border-[#e74040]' : 'border-[#e6e6e6]'
                    }`}
                  />
                  {errors.message && (
                    <p className="font-normal text-[#e74040] text-[12px]">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="self-start bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-bold text-[14px] tracking-[0.2px] px-[40px] py-[15px] rounded-[5px]"
                >
                  Send Message
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── MAP PLACEHOLDER ───────────────────────────────────── */}
      <section className="w-full">
        <div className="w-full h-[320px] bg-gradient-to-br from-[#e8f4fd] to-[#e8f7ee] flex items-center justify-center relative overflow-hidden">
          <div className="flex flex-col items-center gap-[12px] text-center z-10">
            <MapPin className="w-[48px] h-[48px] text-[#23a6f0]" />
            <p className="font-montserrat font-bold text-[#252b42] text-[20px] tracking-[0.1px]">
              Moonshine St. 14/05, Light City, London, UK
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-bold text-[#23a6f0] text-[14px] underline hover:text-[#2a7cc7] transition-colors"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
