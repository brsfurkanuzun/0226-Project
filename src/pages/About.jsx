import { Link } from 'react-router-dom';
import { ChevronRight, Box, GitBranch, Wind, Server, Bell, Layers, Award, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const STACK = [
  { icon: Box,       name: 'React + Vite',     desc: 'Lightning-fast frontend tooling',          color: '#23a6f0' },
  { icon: Layers,    name: 'Redux + Thunk',     desc: 'Predictable global state management',      color: '#8b5cf6' },
  { icon: GitBranch, name: 'React Router v5',   desc: 'Declarative client-side routing',          color: '#e74040' },
  { icon: Wind,      name: 'Tailwind CSS',      desc: 'Utility-first responsive styling',         color: '#2dc071' },
  { icon: Server,    name: 'Axios',             desc: 'Promise-based HTTP client',                color: '#e77c40' },
  { icon: Bell,      name: 'React Toastify',    desc: 'Elegant notification system',              color: '#f59e0b' },
];

const STATS = [
  { icon: Users,       value: '15K+',  label: 'Happy Customers' },
  { icon: ShoppingBag, value: '150K',  label: 'Monthly Visitors' },
  { icon: Award,       value: '99%',   label: 'Satisfaction Rate' },
  { icon: TrendingUp,  value: '15',    label: 'Countries' },
];

export default function About() {
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
          <ChevronRight className="w-4 h-4 text-[#bdbdbd]" />
          <span className="font-normal text-[14px] text-[#737373]">About</span>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="w-full bg-[#fafafa] py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col md:flex-row items-center gap-[60px]">
          {/* Text */}
          <div className="flex flex-col gap-[24px] flex-1">
            <p className="font-bold text-[#23a6f0] text-[14px] tracking-[0.1px] uppercase">About Company</p>
            <h1 className="font-bold text-[#252b42] text-[40px] md:text-[58px] leading-[1.15] tracking-[0.2px]">
              About Bandage
            </h1>
            <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px] max-w-[500px]">
              We know how large objects will act, but things on a small scale. Problems trying to
              resolve the conflict between the two major realms of Classical physics: Newtonian
              mechanics and Newtonian mechanics.
            </p>
            <Link
              to="/shop"
              className="self-start bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-bold text-[14px] tracking-[0.2px] px-[40px] py-[15px] rounded-[5px]"
            >
              Get Quote Now
            </Link>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-[30px] flex-shrink-0">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-[10px] text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#23a6f0]/10 flex items-center justify-center">
                  <Icon className="w-[28px] h-[28px] text-[#23a6f0]" />
                </div>
                <span className="font-bold text-[#252b42] text-[40px] leading-none">{value}</span>
                <span className="font-normal text-[#737373] text-[14px] tracking-[0.1px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────── */}
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="text-center mb-[60px]">
            <p className="font-normal text-[#737373] text-[20px] tracking-[0.2px] mb-[8px]">What We Do</p>
            <h2 className="font-bold text-[#252b42] text-[40px] tracking-[0.2px]">Our Mission</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-[60px]">
            {/* Image pair */}
            <div className="flex gap-[16px] flex-shrink-0">
              <img
                src="/images/content-left.png"
                alt="about left"
                className="w-[180px] md:w-[200px] object-cover rounded-[4px]"
                style={{ height: 440 }}
              />
              <img
                src="/images/content-right.png"
                alt="about right"
                className="w-[220px] md:w-[260px] object-cover rounded-[4px]"
                style={{ height: 440 }}
              />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-[20px] max-w-[440px]">
              <p className="font-bold text-[#23a6f0] text-[16px] tracking-[0.1px]">About Us</p>
              <h3 className="font-bold text-[#252b42] text-[40px] leading-[1.2] tracking-[0.2px]">
                We love what we do
              </h3>
              <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">
                Problems trying to resolve the conflict between the two major realms of Classical
                physics: Newtonian mechanics.
              </p>
              <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">
                Problems trying to resolve the conflict between the two major realms of Classical
                physics: Newtonian mechanics
              </p>
              <Link
                to="/contact"
                className="self-start flex items-center gap-[8px] font-bold text-[#23a6f0] text-[14px] tracking-[0.2px] hover:underline"
              >
                Contact Us <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────── */}
      <section className="w-full bg-[#fafafa] py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="text-center mb-[60px]">
            <p className="font-normal text-[#737373] text-[20px] tracking-[0.2px] mb-[8px]">Technologies</p>
            <h2 className="font-bold text-[#252b42] text-[40px] tracking-[0.2px]">Built With</h2>
            <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] mt-[10px]">
              Problems trying to resolve the conflict between the two major realms
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {STACK.map(({ icon: Icon, name, desc, color }) => (
              <div
                key={name}
                className="flex flex-col gap-[16px] items-center text-center px-[30px] py-[35px] bg-white rounded-[4px] border border-[#e8e8e8] hover:shadow-md transition-shadow"
              >
                <div
                  className="w-[64px] h-[64px] rounded-full flex items-center justify-center"
                  style={{ background: color + '18' }}
                >
                  <Icon className="w-[28px] h-[28px]" style={{ color }} />
                </div>
                <p className="font-bold text-[#252b42] text-[16px] tracking-[0.1px]">{name}</p>
                <p className="font-normal text-[#737373] text-[14px] tracking-[0.2px] leading-[20px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col items-center text-center gap-[32px]">
          <div>
            <p className="font-normal text-[#737373] text-[14px] uppercase tracking-[0.1px] mb-[12px]">Start Now</p>
            <h2 className="font-bold text-[#252b42] text-[40px] tracking-[0.2px] mb-[16px]">
              Now Let's grow Yours
            </h2>
            <p className="font-normal text-[#737373] text-[14px] leading-[20px] max-w-[470px]">
              The gradual accumulation of information about atomic and small-scale behavior during
              the first quarter of the 20th century
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
              to="/contact"
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
