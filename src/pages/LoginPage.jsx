import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import md5 from 'md5';
import { loginUser } from '../store/actions/clientActions';

function gravatarUrl(email, size = 80) {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const [loading, setLoading] = useState(false);
  const user = useSelector((s) => s.client.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* redirect away if already logged in */
  useEffect(() => {
    if (user) {
      history.length > 2 ? history.goBack() : history.replace('/');
    }
  }, [user, history]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(
        loginUser({ email: data.email, password: data.password, rememberMe: data.rememberMe })
      );
      toast.success(`Hoş geldiniz, ${result.name}!`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Giriş başarısız. Bilgilerinizi kontrol edin.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-12 font-montserrat">
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] p-[48px]">

          {/* Logo */}
          <div className="text-center mb-[40px]">
            <h1 className="font-bold text-[24px] leading-[32px] text-[#252b42] tracking-[0.1px]">
              Bandage
            </h1>
            <p className="mt-[8px] font-normal text-[14px] leading-[20px] text-[#737373] tracking-[0.2px]">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[20px]">

            {/* Email */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-bold text-[14px] leading-[24px] text-[#252b42] tracking-[0.1px]">
                E-posta
              </label>
              <input
                type="email"
                placeholder="ornek@email.com"
                className={inputCls(errors.email)}
                {...register('email', {
                  required: 'E-posta zorunludur.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Geçerli bir e-posta adresi giriniz.',
                  },
                })}
              />
              {errors.email && (
                <p className="text-[12px] text-[#e74040] leading-[16px] tracking-[0.2px]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-bold text-[14px] leading-[24px] text-[#252b42] tracking-[0.1px]">
                Şifre
              </label>
              <input
                type="password"
                placeholder="Şifreniz"
                className={inputCls(errors.password)}
                {...register('password', { required: 'Şifre zorunludur.' })}
              />
              {errors.password && (
                <p className="text-[12px] text-[#e74040] leading-[16px] tracking-[0.2px]">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-[10px] cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] accent-[#23a6f0] cursor-pointer"
                {...register('rememberMe')}
              />
              <span className="font-normal text-[14px] leading-[20px] text-[#737373] tracking-[0.2px]">
                Beni hatırla
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-[4px] bg-[#23a6f0] hover:bg-[#2a7cc7] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] px-[40px] py-[15px] flex items-center justify-center gap-[10px]"
            >
              {loading ? (
                <>
                  <Spinner />
                  Giriş Yapılıyor…
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-[12px] my-[4px]">
              <div className="flex-1 h-px bg-[#e6e6e6]" />
              <span className="font-normal text-[12px] text-[#737373] tracking-[0.2px]">veya</span>
              <div className="flex-1 h-px bg-[#e6e6e6]" />
            </div>

            <p className="text-center font-normal text-[12px] text-[#737373] tracking-[0.2px]">
              Hesabınız yok mu?{' '}
              <a href="/signup" className="text-[#23a6f0] font-bold hover:underline">
                Kayıt Olun
              </a>
            </p>

            {/* Test users hint */}
            <div className="bg-[#f0f9ff] border border-[#bae0fd] rounded-[6px] p-[14px]">
              <p className="font-bold text-[11px] text-[#0369a1] tracking-[0.2px] mb-[6px]">
                Test Kullanıcıları (Şifre: 123456)
              </p>
              {[
                'customer@commerce.com',
                'store@commerce.com',
                'admin@commerce.com',
              ].map((email) => (
                <div key={email} className="flex items-center gap-[8px] mb-[4px]">
                  <img
                    src={gravatarUrl(email, 24)}
                    alt={email}
                    className="w-[24px] h-[24px] rounded-full"
                  />
                  <span className="font-normal text-[11px] text-[#0369a1] tracking-[0.2px]">
                    {email}
                  </span>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function inputCls(error) {
  return [
    'bg-[#f9f9f9] border rounded-[5px] px-[16px] py-[12px]',
    'font-normal text-[14px] leading-[20px] text-[#252b42] tracking-[0.2px]',
    'placeholder:text-[#737373] outline-none transition-colors w-full',
    error
      ? 'border-[#e74040] focus:border-[#e74040]'
      : 'border-[#e6e6e6] focus:border-[#23a6f0]',
  ].join(' ');
}

function Spinner() {
  return (
    <svg className="animate-spin h-[18px] w-[18px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
