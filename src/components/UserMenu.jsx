import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { ChevronDown, ClipboardList, LogOut } from 'lucide-react';
import { logoutUser } from '../store/actions/clientActions';

function gravatarUrl(email, size = 32) {
  if (!email) return `https://www.gravatar.com/avatar/?s=${size}&d=identicon`;
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

/* Desktop variant — with dropdown */
export function UserMenuDesktop() {
  const dispatch = useDispatch();
  const user     = useSelector((s) => s.client.user);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!user) {
    return (
      <Link
        to="/login"
        className="h-[54px] overflow-clip relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity flex items-center"
      >
        <div className="flex gap-[5px] items-center p-[15px] rounded-[37px]">
          <svg className="w-[12px] h-[12px] text-[#23a6f0]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="font-montserrat font-bold leading-[24px] text-[#23a6f0] text-[14px] text-center tracking-[0.2px] whitespace-nowrap">
            Login / Register
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-[8px] px-[10px] h-[40px] rounded-[6px] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
      >
        <img
          src={gravatarUrl(user.email)}
          alt={user.name}
          className="w-[30px] h-[30px] rounded-full border-2 border-[#23a6f0] shrink-0"
        />
        <span className="font-montserrat font-bold text-[13px] text-[#252b42] tracking-[0.1px] whitespace-nowrap max-w-[100px] truncate">
          {user.name}
        </span>
        <ChevronDown className={`w-[13px] h-[13px] text-[#737373] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] right-0 w-[200px] bg-white rounded-[8px] shadow-[0px_8px_32px_rgba(0,0,0,0.14)] border border-[#e8e8e8] overflow-hidden z-50">
          {/* Arrow */}
          <div className="absolute -top-[5px] right-[18px] w-2.5 h-2.5 bg-white border-l border-t border-[#e8e8e8] rotate-45" />

          {/* User info header */}
          <div className="px-4 py-3 border-b border-[#f3f3f3] bg-[#fafafa]">
            <p className="font-montserrat font-bold text-[13px] text-[#252b42] truncate">{user.name}</p>
            <p className="font-montserrat font-normal text-[11px] text-[#737373] truncate mt-0.5">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 font-montserrat font-bold text-[13px] text-[#252b42] hover:bg-[#eff8ff] hover:text-[#23a6f0] transition-colors"
            >
              <ClipboardList className="w-4 h-4 shrink-0" />
              Siparişlerim
            </Link>

            <button
              onClick={() => { dispatch(logoutUser()); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 font-montserrat font-bold text-[13px] text-[#e74040] hover:bg-[#fef2f2] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Mobile variant */
export function UserMenuMobile() {
  const dispatch = useDispatch();
  const user     = useSelector((s) => s.client.user);

  if (!user) {
    return (
      <Link
        to="/login"
        className="font-montserrat font-bold leading-[45px] text-[#23a6f0] text-[30px] text-center tracking-[0.2px] whitespace-nowrap hover:opacity-80 transition-opacity"
      >
        Login / Register
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center gap-[12px]">
      <img
        src={gravatarUrl(user.email, 64)}
        alt={user.name}
        className="w-[64px] h-[64px] rounded-full border-2 border-[#23a6f0]"
      />
      <span className="font-montserrat font-bold text-[24px] text-[#252b42] tracking-[0.1px]">
        {user.name}
      </span>
      <button
        onClick={() => dispatch(logoutUser())}
        className="font-montserrat font-bold text-[20px] text-[#e74040] tracking-[0.2px] hover:underline"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
