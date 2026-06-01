import { NavLink } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? 'bg-purple-500 text-white'
        : 'text-slate-400 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-400" />
          <span className="text-white font-bold text-lg">0226 Project</span>
        </div>
        <div className="flex gap-2">
          <NavLink exact to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}
