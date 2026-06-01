import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../store/actions/clientActions';
import api from '../services/api';

/* ── Turkish phone regex: +90 / 0 prefix optional, then 10 digits ── */
const TR_PHONE_REGEX = /^(\+90|0)?[5][0-9]{9}$/;
/* ── IBAN basic format (TR IBAN = TR + 24 alphanumeric chars) ── */
const IBAN_REGEX = /^TR\d{2}[0-9A-Z]{22}$/i;
/* ── Tax ID: TXXXXVXXXXXX ── */
const TAX_ID_REGEX = /^T\d{4}V\d{6}$/;
/* ── Password: min 8, at least 1 upper, 1 lower, 1 digit, 1 special ── */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function SignupPage() {
  const history      = useHistory();
  const dispatch     = useDispatch();
  const storeRoles   = useSelector((s) => s.client.roles);
  const [roles, setRoles]             = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { role_id: '' } });

  const selectedRoleId = watch('role_id');
  const password = watch('password');

  /* fetch roles via thunk (skips API if already in store) */
  useEffect(() => {
    dispatch(fetchRoles()).finally(() => setRolesLoading(false));
  }, [dispatch]);

  /* sync local roles state from Redux store */
  useEffect(() => {
    if (storeRoles.length > 0) {
      setRoles(storeRoles);
      setRolesLoading(false);
    }
  }, [storeRoles]);

  /* derive selected role code from id */
  const selectedRole = roles.find((r) => String(r.id) === String(selectedRoleId));
  const isStore = selectedRole?.code === 'store';

  /* find customer role id for default selection */
  const customerRole = roles.find((r) => r.code === 'customer');

  const onSubmit = async (data) => {
    setSubmitting(true);

    const roleId = Number(data.role_id || customerRole?.id);

    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: roleId,
    };

    if (isStore) {
      payload.store = {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account,
      };
    }

    try {
      await api.post('/signup', payload);
      toast.success('You need to click link in email to activate your account!', {
        autoClose: 6000,
      });
      history.goBack();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        'Kayıt sırasında bir hata oluştu.';
      toast.error(String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-12 font-montserrat">
      <div className="w-full max-w-[480px]">
        {/* Card */}
        <div className="bg-white rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] p-[48px]">
          {/* Header */}
          <div className="text-center mb-[40px]">
            <h1 className="font-bold text-[24px] leading-[32px] text-[#252b42] tracking-[0.1px]">
              Bandage
            </h1>
            <p className="mt-[8px] font-normal text-[14px] leading-[20px] text-[#737373] tracking-[0.2px]">
              Hesap oluşturmak için formu doldurun
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[20px]">

            {/* Name */}
            <Field label="Ad Soyad" error={errors.name?.message}>
              <input
                type="text"
                placeholder="Adınız Soyadınız"
                className={inputCls(errors.name)}
                {...register('name', {
                  required: 'Ad zorunludur.',
                  minLength: { value: 3, message: 'En az 3 karakter giriniz.' },
                })}
              />
            </Field>

            {/* Email */}
            <Field label="E-posta" error={errors.email?.message}>
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
            </Field>

            {/* Password */}
            <Field label="Şifre" error={errors.password?.message}>
              <input
                type="password"
                placeholder="En az 8 karakter"
                className={inputCls(errors.password)}
                {...register('password', {
                  required: 'Şifre zorunludur.',
                  pattern: {
                    value: PASSWORD_REGEX,
                    message:
                      'En az 8 karakter, büyük/küçük harf, rakam ve özel karakter içermelidir.',
                  },
                })}
              />
            </Field>

            {/* Password confirm */}
            <Field label="Şifre Tekrar" error={errors.password_confirm?.message}>
              <input
                type="password"
                placeholder="Şifreyi tekrar girin"
                className={inputCls(errors.password_confirm)}
                {...register('password_confirm', {
                  required: 'Şifre tekrarı zorunludur.',
                  validate: (v) => v === password || 'Şifreler eşleşmiyor.',
                })}
              />
            </Field>

            {/* Role */}
            <Field label="Rol" error={errors.role_id?.message}>
              {rolesLoading ? (
                <div className="h-[48px] bg-[#f9f9f9] rounded-[5px] border border-[#e6e6e6] flex items-center px-4 text-[#737373] text-[14px]">
                  Yükleniyor…
                </div>
              ) : (
                <select
                  className={inputCls(errors.role_id)}
                  defaultValue={customerRole?.id ?? ''}
                  {...register('role_id', { required: 'Rol seçimi zorunludur.' })}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            {/* ── Store fields (conditional) ── */}
            {isStore && (
              <div className="flex flex-col gap-[20px] bg-[#f9f9f9] rounded-[8px] p-[20px] border border-[#e6e6e6]">
                <p className="font-bold text-[14px] text-[#252b42] tracking-[0.1px]">
                  Mağaza Bilgileri
                </p>

                {/* Store name */}
                <Field label="Mağaza Adı" error={errors.store_name?.message}>
                  <input
                    type="text"
                    placeholder="Mağaza adı"
                    className={inputCls(errors.store_name)}
                    {...register('store_name', {
                      required: 'Mağaza adı zorunludur.',
                      minLength: { value: 3, message: 'En az 3 karakter giriniz.' },
                    })}
                  />
                </Field>

                {/* Store phone */}
                <Field label="Mağaza Telefonu" error={errors.store_phone?.message}>
                  <input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    className={inputCls(errors.store_phone)}
                    {...register('store_phone', {
                      required: 'Telefon numarası zorunludur.',
                      pattern: {
                        value: TR_PHONE_REGEX,
                        message: 'Geçerli bir Türkiye telefon numarası giriniz. (05XXXXXXXXX)',
                      },
                    })}
                  />
                </Field>

                {/* Store Tax ID */}
                <Field label="Vergi Kimlik No (Tax ID)" error={errors.store_tax_no?.message}>
                  <input
                    type="text"
                    placeholder="TXXXXVXXXXXX"
                    className={inputCls(errors.store_tax_no)}
                    {...register('store_tax_no', {
                      required: 'Vergi kimlik numarası zorunludur.',
                      pattern: {
                        value: TAX_ID_REGEX,
                        message: 'Format: TXXXXVXXXXXX (X = rakam)',
                      },
                    })}
                  />
                </Field>

                {/* Store IBAN */}
                <Field label="Banka Hesabı (IBAN)" error={errors.store_bank_account?.message}>
                  <input
                    type="text"
                    placeholder="TR00 0000 0000 0000 0000 0000 00"
                    className={inputCls(errors.store_bank_account)}
                    {...register('store_bank_account', {
                      required: 'IBAN zorunludur.',
                      pattern: {
                        value: IBAN_REGEX,
                        message: 'Geçerli bir Türkiye IBAN adresi giriniz. (TR + 24 karakter)',
                      },
                    })}
                  />
                </Field>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || rolesLoading}
              className="mt-[8px] bg-[#23a6f0] hover:bg-[#2a7cc7] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] px-[40px] py-[15px] flex items-center justify-center gap-[10px]"
            >
              {submitting ? (
                <>
                  <Spinner />
                  Kayıt Olunuyor…
                </>
              ) : (
                'Kayıt Ol'
              )}
            </button>

            <p className="text-center font-normal text-[12px] text-[#737373] tracking-[0.2px]">
              Zaten hesabınız var mı?{' '}
              <a href="/login" className="text-[#23a6f0] font-bold hover:underline">
                Giriş Yapın
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="font-bold text-[14px] leading-[24px] text-[#252b42] tracking-[0.1px]">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-normal text-[12px] leading-[16px] text-[#e74040] tracking-[0.2px]">
          {error}
        </p>
      )}
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
    <svg
      className="animate-spin h-[18px] w-[18px] text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
