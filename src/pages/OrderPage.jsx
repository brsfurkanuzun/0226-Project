import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  ChevronRight, Plus, Pencil, Trash2, MapPin,
  CheckCircle2, Home, Building2, Loader2, CreditCard,
  Lock, ShieldCheck, PartyPopper, ShoppingBag,
} from 'lucide-react';
import TopBar  from '../components/layout/TopBar';
import Navbar  from '../components/layout/Navbar';
import Footer  from '../components/layout/Footer';
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setSelectedAddress,
} from '../store/actions/addressActions';
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
  setSelectedCard,
} from '../store/actions/cardActions';
import { submitOrder } from '../store/actions/orderActions';

/* ── Turkish provinces ── */
const TR_CITIES = [
  'Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya',
  'Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik',
  'Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum',
  'Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir',
  'Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Iğdır','Isparta','İstanbul',
  'İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kilis',
  'Kırıkkale','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa',
  'Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize',
  'Sakarya','Samsun','Şanlıurfa','Siirt','Sinop','Sivas','Şırnak','Tekirdağ',
  'Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak',
];

/* ── Step indicator ── */
function StepIndicator({ current }) {
  const steps = [
    { n: 1, label: 'Adres Bilgileri' },
    { n: 2, label: 'Ödeme Bilgileri' },
  ];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map(({ n, label }, i) => (
        <div key={n} className="flex items-center gap-0">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors ${
              current >= n ? 'bg-[#23a6f0] text-white' : 'bg-[#e8e8e8] text-[#737373]'
            }`}>
              {current > n ? <CheckCircle2 className="w-4 h-4" /> : n}
            </div>
            <span className={`font-bold text-[14px] tracking-[0.1px] whitespace-nowrap ${
              current >= n ? 'text-[#252b42]' : 'text-[#737373]'
            }`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-12 mx-3 ${current > n ? 'bg-[#23a6f0]' : 'bg-[#e8e8e8]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Address form ── */
function AddressForm({ initial, onSubmit, onCancel, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initial || {
      title: '', name: '', surname: '', phone: '',
      city: '', district: '', neighborhood: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label className="block font-bold text-[13px] text-[#252b42] mb-1">
          Adres Başlığı <span className="text-[#e74040]">*</span>
        </label>
        <input
          {...register('title', { required: 'Adres başlığı zorunludur' })}
          placeholder="Örn: Ev, İş"
          className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
        />
        {errors.title && <p className="text-[#e74040] text-[12px] mt-1">{errors.title.message}</p>}
      </div>

      {/* Name + Surname */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-[13px] text-[#252b42] mb-1">
            Ad <span className="text-[#e74040]">*</span>
          </label>
          <input
            {...register('name', { required: 'Ad zorunludur' })}
            placeholder="Adınız"
            className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
          />
          {errors.name && <p className="text-[#e74040] text-[12px] mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-bold text-[13px] text-[#252b42] mb-1">
            Soyad <span className="text-[#e74040]">*</span>
          </label>
          <input
            {...register('surname', { required: 'Soyad zorunludur' })}
            placeholder="Soyadınız"
            className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
          />
          {errors.surname && <p className="text-[#e74040] text-[12px] mt-1">{errors.surname.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block font-bold text-[13px] text-[#252b42] mb-1">
          Telefon <span className="text-[#e74040]">*</span>
        </label>
        <input
          {...register('phone', {
            required: 'Telefon zorunludur',
            pattern: { value: /^0[5][0-9]{9}$/, message: 'Geçerli bir telefon giriniz (05XXXXXXXXX)' },
          })}
          placeholder="05XXXXXXXXX"
          className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
        />
        {errors.phone && <p className="text-[#e74040] text-[12px] mt-1">{errors.phone.message}</p>}
      </div>

      {/* City + District */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-[13px] text-[#252b42] mb-1">
            İl <span className="text-[#e74040]">*</span>
          </label>
          <select
            {...register('city', { required: 'İl seçimi zorunludur' })}
            className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] bg-white focus:outline-none focus:border-[#23a6f0] transition-colors cursor-pointer"
          >
            <option value="">İl seçiniz</option>
            {TR_CITIES.map((c) => (
              <option key={c} value={c.toLowerCase()}>{c}</option>
            ))}
          </select>
          {errors.city && <p className="text-[#e74040] text-[12px] mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block font-bold text-[13px] text-[#252b42] mb-1">
            İlçe <span className="text-[#e74040]">*</span>
          </label>
          <input
            {...register('district', { required: 'İlçe zorunludur' })}
            placeholder="İlçe"
            className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
          />
          {errors.district && <p className="text-[#e74040] text-[12px] mt-1">{errors.district.message}</p>}
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <label className="block font-bold text-[13px] text-[#252b42] mb-1">
          Mahalle <span className="text-[#e74040]">*</span>
        </label>
        <input
          {...register('neighborhood', { required: 'Mahalle zorunludur' })}
          placeholder="Mahalle adı"
          className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
        />
        {errors.neighborhood && <p className="text-[#e74040] text-[12px] mt-1">{errors.neighborhood.message}</p>}
      </div>

      {/* Full address */}
      <div>
        <label className="block font-bold text-[13px] text-[#252b42] mb-1">
          Adres Detayı <span className="text-[#e74040]">*</span>
        </label>
        <textarea
          {...register('address', { required: 'Adres detayı zorunludur' })}
          rows={3}
          placeholder="Sokak, bina no, daire no…"
          className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors resize-none"
        />
        {errors.address && <p className="text-[#e74040] text-[12px] mt-1">{errors.address.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#23a6f0] hover:bg-[#2a7cc7] disabled:opacity-60 transition-colors text-white font-bold text-[14px] py-3 rounded-[5px] flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor…</>
            : <>{initial?.id ? 'Güncelle' : 'Adresi Kaydet'}</>}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-[#e8e8e8] rounded-[5px] font-bold text-[14px] text-[#737373] hover:border-[#252b42] hover:text-[#252b42] transition-colors cursor-pointer"
        >
          İptal
        </button>
      </div>
    </form>
  );
}

/* ── Address card ── */
function AddressCard({ addr, selected, onSelect, onEdit, onDelete }) {
  return (
    <div
      onClick={onSelect}
      className={`relative border-2 rounded-[8px] p-4 cursor-pointer transition-all ${
        selected
          ? 'border-[#23a6f0] bg-[#eff8ff]'
          : 'border-[#e8e8e8] bg-white hover:border-[#b3d9f7]'
      }`}
    >
      {/* Selection indicator */}
      <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
        selected ? 'border-[#23a6f0] bg-[#23a6f0]' : 'border-[#bdbdbd]'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-2 pr-8">
        {addr.title?.toLowerCase().includes('iş') || addr.title?.toLowerCase().includes('is')
          ? <Building2 className="w-4 h-4 text-[#23a6f0] shrink-0" />
          : <Home className="w-4 h-4 text-[#23a6f0] shrink-0" />}
        <span className="font-bold text-[14px] text-[#252b42] tracking-[0.1px] capitalize">
          {addr.title}
        </span>
      </div>

      {/* Info */}
      <p className="font-bold text-[13px] text-[#252b42] tracking-[0.1px]">
        {addr.name} {addr.surname}
      </p>
      <p className="font-normal text-[12px] text-[#737373] tracking-[0.2px] mt-0.5">
        {addr.phone}
      </p>
      <p className="font-normal text-[12px] text-[#737373] tracking-[0.2px] mt-1 line-clamp-2">
        <MapPin className="inline w-3 h-3 mr-1" />
        {addr.neighborhood && `${addr.neighborhood}, `}
        {addr.district && `${addr.district} / `}
        {addr.city && addr.city.charAt(0).toUpperCase() + addr.city.slice(1)}
      </p>
      {addr.address && (
        <p className="font-normal text-[12px] text-[#737373] tracking-[0.2px] mt-0.5 line-clamp-1">
          {addr.address}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-[#e8e8e8]">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="flex items-center gap-1 text-[#23a6f0] hover:text-[#2a7cc7] font-bold text-[12px] tracking-[0.2px] transition-colors cursor-pointer"
        >
          <Pencil className="w-3 h-3" />
          Düzenle
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="flex items-center gap-1 text-[#e74040] hover:text-[#c53030] font-bold text-[12px] tracking-[0.2px] transition-colors cursor-pointer ml-auto"
        >
          <Trash2 className="w-3 h-3" />
          Sil
        </button>
      </div>
    </div>
  );
}

/* ── Card form ── */
const CURRENT_YEAR = new Date().getFullYear();
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const YEARS  = Array.from({ length: 15 }, (_, i) => CURRENT_YEAR + i);

function maskCard(no = '') {
  const clean = no.replace(/\D/g, '');
  const parts = [];
  for (let i = 0; i < 16; i += 4) parts.push(clean.slice(i, i + 4) || '');
  return parts.map((p, i) => (i < 3 ? p.padEnd(4, '•') : p.padEnd(4, '•'))).join(' ');
}

function CardForm({ initial, onSubmit, onCancel, loading }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: initial
      ? {
          card_no:       initial.card_no || '',
          name_on_card:  initial.name_on_card || '',
          expire_month:  initial.expire_month || '',
          expire_year:   initial.expire_year || '',
        }
      : { card_no: '', name_on_card: '', expire_month: '', expire_year: '' },
  });

  const cardNo = watch('card_no', '');

  function formatCardNo(e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Visual card preview */}
      <div className="relative h-[130px] rounded-[12px] overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#23a6f0] p-5 flex flex-col justify-between select-none shadow-lg">
        <div className="flex justify-between items-start">
          <CreditCard className="w-6 h-6 text-white/70" />
          <div className="flex gap-1">
            <div className="w-7 h-5 rounded-full bg-[#eb5757]/80" />
            <div className="w-7 h-5 rounded-full bg-[#f9a825]/80 -ml-3" />
          </div>
        </div>
        <div>
          <p className="font-mono text-[16px] text-white tracking-[3px] font-bold">
            {maskCard(cardNo.replace(/\s/g, ''))}
          </p>
          <p className="font-normal text-[11px] text-white/60 mt-1 uppercase tracking-[1px]">
            {watch('name_on_card') || 'KART SAHİBİ'}
          </p>
        </div>
      </div>

      {/* Card number */}
      <div>
        <label className="block font-bold text-[13px] text-[#252b42] mb-1">
          Kart Numarası <span className="text-[#e74040]">*</span>
        </label>
        <input
          {...register('card_no', {
            required: 'Kart numarası zorunludur',
            validate: (v) => v.replace(/\s/g, '').length === 16 || '16 haneli kart numarası giriniz',
          })}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          onInput={formatCardNo}
          className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-mono text-[15px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors tracking-[2px]"
        />
        {errors.card_no && <p className="text-[#e74040] text-[12px] mt-1">{errors.card_no.message}</p>}
      </div>

      {/* Name on card */}
      <div>
        <label className="block font-bold text-[13px] text-[#252b42] mb-1">
          Kart Üzerindeki İsim <span className="text-[#e74040]">*</span>
        </label>
        <input
          {...register('name_on_card', { required: 'İsim zorunludur' })}
          placeholder="Ad Soyad"
          className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] placeholder-[#bdbdbd] focus:outline-none focus:border-[#23a6f0] transition-colors"
        />
        {errors.name_on_card && <p className="text-[#e74040] text-[12px] mt-1">{errors.name_on_card.message}</p>}
      </div>

      {/* Month + Year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-[13px] text-[#252b42] mb-1">
            Son Kullanım Ay <span className="text-[#e74040]">*</span>
          </label>
          <select
            {...register('expire_month', { required: 'Ay seçiniz', valueAsNumber: true })}
            className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] bg-white focus:outline-none focus:border-[#23a6f0] transition-colors cursor-pointer"
          >
            <option value="">Ay</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
            ))}
          </select>
          {errors.expire_month && <p className="text-[#e74040] text-[12px] mt-1">{errors.expire_month.message}</p>}
        </div>
        <div>
          <label className="block font-bold text-[13px] text-[#252b42] mb-1">
            Son Kullanım Yıl <span className="text-[#e74040]">*</span>
          </label>
          <select
            {...register('expire_year', { required: 'Yıl seçiniz', valueAsNumber: true })}
            className="w-full border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 font-normal text-[14px] text-[#252b42] bg-white focus:outline-none focus:border-[#23a6f0] transition-colors cursor-pointer"
          >
            <option value="">Yıl</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.expire_year && <p className="text-[#e74040] text-[12px] mt-1">{errors.expire_year.message}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#23a6f0] hover:bg-[#2a7cc7] disabled:opacity-60 transition-colors text-white font-bold text-[14px] py-3 rounded-[5px] flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor…</>
            : initial?.id ? 'Kartı Güncelle' : 'Kartı Kaydet'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-[#e8e8e8] rounded-[5px] font-bold text-[14px] text-[#737373] hover:border-[#252b42] hover:text-[#252b42] transition-colors cursor-pointer"
        >
          İptal
        </button>
      </div>
    </form>
  );
}

/* ── Card display card ── */
function CardItem({ card, selected, onSelect, onEdit, onDelete }) {
  const last4 = String(card.card_no || '').slice(-4);
  return (
    <div
      onClick={onSelect}
      className={`relative border-2 rounded-[8px] p-4 cursor-pointer transition-all ${
        selected
          ? 'border-[#23a6f0] bg-[#eff8ff]'
          : 'border-[#e8e8e8] bg-white hover:border-[#b3d9f7]'
      }`}
    >
      {/* Radio */}
      <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
        selected ? 'border-[#23a6f0] bg-[#23a6f0]' : 'border-[#bdbdbd]'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>

      {/* Mini card visual */}
      <div className="flex items-center gap-3 pr-8 mb-3">
        <div className="w-10 h-7 rounded-[4px] bg-gradient-to-br from-[#1a3a5c] to-[#23a6f0] flex items-center justify-center shrink-0">
          <CreditCard className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-bold text-[14px] text-[#252b42] tracking-[1px]">
            •••• •••• •••• {last4}
          </p>
          <p className="font-normal text-[12px] text-[#737373]">
            {card.name_on_card}
          </p>
        </div>
      </div>

      <p className="font-normal text-[12px] text-[#737373]">
        Son Kullanım: {String(card.expire_month).padStart(2, '0')}/{card.expire_year}
      </p>

      {/* Actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-[#e8e8e8]">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="flex items-center gap-1 text-[#23a6f0] hover:text-[#2a7cc7] font-bold text-[12px] transition-colors cursor-pointer"
        >
          <Pencil className="w-3 h-3" />
          Düzenle
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="flex items-center gap-1 text-[#e74040] hover:text-[#c53030] font-bold text-[12px] transition-colors cursor-pointer ml-auto"
        >
          <Trash2 className="w-3 h-3" />
          Sil
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function OrderPage() {
  const dispatch   = useDispatch();
  const history    = useHistory();

  const {
    addresses, selectedAddress, addressLoading,
    cards,     selectedCard,    cardLoading,
  } = useSelector((s) => s.shoppingCart);

  const cart         = useSelector((s) => s.shoppingCart.cart);
  const checkedItems = cart.filter((i) => i.checked);
  const subtotal     = checkedItems.reduce((s, i) => s + i.count * i.product.price, 0);
  const shipping     = subtotal > 500 ? 0 : subtotal === 0 ? 0 : 29.99;
  const grandTotal   = subtotal + shipping;

  const [step,        setStep]        = useState(1);
  const [showForm,    setShowForm]    = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /* card state */
  const [showCardForm,  setShowCardForm]  = useState(false);
  const [editCard,      setEditCard]      = useState(null);
  const [deleteCardConfirm, setDeleteCardConfirm] = useState(null);

  /* order state */
  const [ccv,          setCcv]          = useState('');
  const [ccvError,     setCcvError]     = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError,   setOrderError]   = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCards());
  }, [dispatch]);

  function handleFormSubmit(data) {
    if (editAddress?.id) {
      dispatch(updateAddress({ ...data, id: editAddress.id }, () => {
        setShowForm(false);
        setEditAddress(null);
      }));
    } else {
      dispatch(createAddress(data, (newAddr) => {
        dispatch(setSelectedAddress(newAddr.id));
        setShowForm(false);
      }));
    }
  }

  function openAdd()    { setEditAddress(null); setShowForm(true); }
  function openEdit(a)  { setEditAddress(a);    setShowForm(true); }
  function closeForm()  { setShowForm(false);   setEditAddress(null); }

  function confirmDelete(id) { setDeleteConfirm(id); }
  function doDelete() {
    dispatch(deleteAddress(deleteConfirm));
    setDeleteConfirm(null);
  }

  /* card handlers */
  function openAddCard()    { setEditCard(null); setShowCardForm(true); }
  function openEditCard(c)  { setEditCard(c);    setShowCardForm(true); }
  function closeCardForm()  { setShowCardForm(false); setEditCard(null); }

  function handleCardFormSubmit(data) {
    const payload = {
      ...data,
      card_no:      data.card_no.replace(/\s/g, ''),
      expire_month: Number(data.expire_month),
      expire_year:  Number(data.expire_year),
    };
    if (editCard?.id) {
      dispatch(updateCard({ ...payload, id: editCard.id }, () => closeCardForm()));
    } else {
      dispatch(createCard(payload, (newCard) => {
        dispatch(setSelectedCard(newCard.id));
        closeCardForm();
      }));
    }
  }

  function confirmDeleteCard(id) { setDeleteCardConfirm(id); }
  function doDeleteCard() {
    dispatch(deleteCard(deleteCardConfirm));
    setDeleteCardConfirm(null);
  }

  /* order submission */
  function handlePlaceOrder() {
    if (!ccv || ccv.length < 3) {
      setCcvError('Geçerli bir CVV giriniz (3 hane)');
      return;
    }
    setCcvError('');
    setOrderError('');

    const card = cards.find((c) => c.id === selectedCard);
    const now  = new Date().toISOString().slice(0, 19); // "2024-01-10T14:18:30"

    const payload = {
      address_id:        selectedAddress,
      order_date:        now,
      card_no:           Number(String(card.card_no).replace(/\s/g, '')),
      card_name:         card.name_on_card,
      card_expire_month: Number(card.expire_month),
      card_expire_year:  Number(card.expire_year),
      card_ccv:          Number(ccv),
      price:             grandTotal,
      products: checkedItems.map((item) => ({
        product_id: item.product.id,
        count:      item.count,
        detail:     '',
      })),
    };

    setOrderLoading(true);
    dispatch(
      submitOrder(
        payload,
        () => { setOrderLoading(false); setOrderSuccess(true); },
        (msg) => { setOrderLoading(false); setOrderError(msg); }
      )
    );
  }

  return (
    <div className="bg-[#fafafa] flex flex-col min-h-screen font-montserrat overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="w-full bg-[#fafafa] py-5">
        <div className="max-w-[1050px] mx-auto px-4 flex items-center gap-2">
          <Link to="/"     className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd]" />
          <Link to="/cart" className="font-bold text-[14px] text-[#252b42] hover:text-[#23a6f0] transition-colors">Sepet</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#bdbdbd]" />
          <span className="font-normal text-[14px] text-[#737373]">Sipariş Oluştur</span>
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 pb-20">
        {/* ── SUCCESS SCREEN ── */}
        {orderSuccess && (
          <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
            <div className="w-24 h-24 bg-[#e5f9ef] rounded-full flex items-center justify-center">
              <PartyPopper className="w-12 h-12 text-[#2dc071]" />
            </div>
            <div>
              <h2 className="font-bold text-[28px] text-[#252b42] tracking-[0.1px] mb-2">
                Siparişiniz Alındı! 🎉
              </h2>
              <p className="font-normal text-[16px] text-[#737373] max-w-[420px] leading-relaxed">
                Teşekkürler! Siparişiniz başarıyla oluşturuldu.
                En kısa sürede kargoya verilecektir.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 bg-[#23a6f0] hover:bg-[#2a7cc7] text-white font-bold text-[14px] px-6 py-3 rounded-[5px] transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-2 border border-[#23a6f0] text-[#23a6f0] hover:bg-[#eff8ff] font-bold text-[14px] px-6 py-3 rounded-[5px] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        )}

        {!orderSuccess && <StepIndicator current={step} />}

        {!orderSuccess && <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT: Address step ── */}
          <div className="flex-1 min-w-0">

            {/* ── STEP 1: ADDRESS ── */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                {/* Address list */}
                <div className="bg-white border border-[#e8e8e8] rounded-[8px] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e8e8]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#23a6f0]" />
                      <h2 className="font-bold text-[16px] text-[#252b42] tracking-[0.1px]">
                        Teslimat Adresi
                      </h2>
                    </div>
                    {!showForm && (
                      <button
                        onClick={openAdd}
                        className="flex items-center gap-1.5 bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-bold text-[13px] px-4 py-2 rounded-[5px] cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Yeni Adres Ekle
                      </button>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Inline form */}
                    {showForm && (
                      <div className="mb-6 border border-[#e8e8e8] rounded-[8px] p-5 bg-[#fafafa]">
                        <h3 className="font-bold text-[15px] text-[#252b42] mb-4">
                          {editAddress?.id ? 'Adresi Düzenle' : 'Yeni Adres'}
                        </h3>
                        <AddressForm
                          initial={editAddress}
                          onSubmit={handleFormSubmit}
                          onCancel={closeForm}
                          loading={addressLoading}
                        />
                      </div>
                    )}

                    {/* Loading */}
                    {addressLoading && addresses.length === 0 && (
                      <div className="flex items-center justify-center py-12 gap-3 text-[#737373]">
                        <Loader2 className="w-6 h-6 animate-spin text-[#23a6f0]" />
                        <span className="font-normal text-[14px]">Adresler yükleniyor…</span>
                      </div>
                    )}

                    {/* Address grid */}
                    {!addressLoading && addresses.length === 0 && !showForm && (
                      <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                        <MapPin className="w-10 h-10 text-[#bdbdbd]" />
                        <p className="font-bold text-[14px] text-[#737373]">
                          Henüz kayıtlı adresiniz yok
                        </p>
                        <button
                          onClick={openAdd}
                          className="flex items-center gap-1.5 text-[#23a6f0] hover:text-[#2a7cc7] font-bold text-[14px] transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          İlk adresinizi ekleyin
                        </button>
                      </div>
                    )}

                    {addresses.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <AddressCard
                            key={addr.id}
                            addr={addr}
                            selected={selectedAddress === addr.id}
                            onSelect={() => dispatch(setSelectedAddress(addr.id))}
                            onEdit={() => openEdit(addr)}
                            onDelete={() => confirmDelete(addr.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Continue button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedAddress}
                    className={`flex items-center gap-2 font-bold text-[14px] tracking-[0.2px] px-8 py-3.5 rounded-[5px] transition-colors ${
                      selectedAddress
                        ? 'bg-[#23a6f0] hover:bg-[#2a7cc7] text-white cursor-pointer shadow-[0px_4px_12px_rgba(35,166,240,0.3)]'
                        : 'bg-[#e8e8e8] text-[#bdbdbd] cursor-not-allowed'
                    }`}
                  >
                    Ödemeye Geç
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: PAYMENT ── */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="bg-white border border-[#e8e8e8] rounded-[8px] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e8e8]">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#23a6f0]" />
                      <h2 className="font-bold text-[16px] text-[#252b42] tracking-[0.1px]">
                        Ödeme Yöntemi
                      </h2>
                    </div>
                    {!showCardForm && (
                      <button
                        onClick={openAddCard}
                        className="flex items-center gap-1.5 bg-[#23a6f0] hover:bg-[#2a7cc7] transition-colors text-white font-bold text-[13px] px-4 py-2 rounded-[5px] cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Yeni Kart Ekle
                      </button>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Inline form */}
                    {showCardForm && (
                      <div className="mb-6 border border-[#e8e8e8] rounded-[8px] p-5 bg-[#fafafa]">
                        <h3 className="font-bold text-[15px] text-[#252b42] mb-4">
                          {editCard?.id ? 'Kartı Düzenle' : 'Yeni Kart'}
                        </h3>
                        <CardForm
                          initial={editCard}
                          onSubmit={handleCardFormSubmit}
                          onCancel={closeCardForm}
                          loading={cardLoading}
                        />
                      </div>
                    )}

                    {/* Loading */}
                    {cardLoading && cards.length === 0 && (
                      <div className="flex items-center justify-center py-12 gap-3 text-[#737373]">
                        <Loader2 className="w-6 h-6 animate-spin text-[#23a6f0]" />
                        <span className="font-normal text-[14px]">Kartlar yükleniyor…</span>
                      </div>
                    )}

                    {/* Empty state */}
                    {!cardLoading && cards.length === 0 && !showCardForm && (
                      <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                        <CreditCard className="w-10 h-10 text-[#bdbdbd]" />
                        <p className="font-bold text-[14px] text-[#737373]">
                          Kayıtlı kartınız yok
                        </p>
                        <button
                          onClick={openAddCard}
                          className="flex items-center gap-1.5 text-[#23a6f0] hover:text-[#2a7cc7] font-bold text-[14px] transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          İlk kartınızı ekleyin
                        </button>
                      </div>
                    )}

                    {/* Cards grid */}
                    {cards.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards.map((card) => (
                          <CardItem
                            key={card.id}
                            card={card}
                            selected={selectedCard === card.id}
                            onSelect={() => dispatch(setSelectedCard(card.id))}
                            onEdit={() => openEditCard(card)}
                            onDelete={() => confirmDeleteCard(card.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CCV entry (only shown when a card is selected) */}
                {selectedCard && (
                  <div className="bg-white border border-[#e8e8e8] rounded-[8px] p-5">
                    <p className="font-bold text-[14px] text-[#252b42] mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#23a6f0]" />
                      Güvenlik Kodu (CVV)
                    </p>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <input
                          type="password"
                          value={ccv}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setCcv(v);
                            if (ccvError) setCcvError('');
                          }}
                          placeholder="•••"
                          maxLength={4}
                          className={`w-full border rounded-[5px] px-3 py-2.5 font-mono text-[18px] text-[#252b42] tracking-[6px] placeholder-[#bdbdbd] focus:outline-none transition-colors ${
                            ccvError ? 'border-[#e74040]' : 'border-[#e8e8e8] focus:border-[#23a6f0]'
                          }`}
                        />
                        {ccvError && (
                          <p className="text-[#e74040] text-[12px] mt-1">{ccvError}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#fafafa] border border-[#e8e8e8] rounded-[5px] px-3 py-2.5 shrink-0">
                        <CreditCard className="w-4 h-4 text-[#bdbdbd]" />
                        <span className="font-normal text-[12px] text-[#737373]">Kartın arkasındaki 3 haneli kod</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order error */}
                {orderError && (
                  <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] px-4 py-3">
                    <p className="font-bold text-[13px] text-[#e74040]">{orderError}</p>
                  </div>
                )}

                {/* Security note */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px]">
                  <ShieldCheck className="w-5 h-5 text-[#16a34a] shrink-0" />
                  <p className="font-normal text-[13px] text-[#166534]">
                    Ödeme bilgileriniz 256-bit SSL şifreleme ile güvence altındadır.
                  </p>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    disabled={orderLoading}
                    className="flex items-center gap-2 text-[#737373] hover:text-[#252b42] font-bold text-[14px] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    ← Adrese Dön
                  </button>
                  <button
                    disabled={!selectedCard || orderLoading}
                    onClick={handlePlaceOrder}
                    className={`flex items-center gap-2 font-bold text-[14px] tracking-[0.2px] px-8 py-3.5 rounded-[5px] transition-colors ${
                      selectedCard && !orderLoading
                        ? 'bg-[#2dc071] hover:bg-[#25a05f] text-white cursor-pointer shadow-[0px_4px_12px_rgba(45,192,113,0.3)]'
                        : 'bg-[#e8e8e8] text-[#bdbdbd] cursor-not-allowed'
                    }`}
                  >
                    {orderLoading
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> İşleniyor…</>
                      : <><Lock className="w-4 h-4" /> Siparişi Tamamla</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div className="w-full lg:w-[300px] shrink-0">
            <div className="bg-white border border-[#e8e8e8] rounded-[8px] overflow-hidden sticky top-4">
              <div className="px-5 py-4 border-b border-[#e8e8e8]">
                <h2 className="font-bold text-[16px] text-[#252b42] tracking-[0.1px]">Sipariş Özeti</h2>
              </div>

              {/* Items */}
              <div className="px-5 py-4 max-h-[220px] overflow-y-auto divide-y divide-[#f3f3f3]">
                {checkedItems.length === 0 ? (
                  <p className="font-normal text-[13px] text-[#bdbdbd] py-4 text-center">Seçili ürün yok</p>
                ) : (
                  checkedItems.map(({ product, count }) => (
                    <div key={product.id} className="flex items-center gap-3 py-3">
                      <div className="w-10 h-10 shrink-0 rounded-[4px] overflow-hidden bg-[#f9f9f9]">
                        {product.images?.[0]?.url
                          ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-[#e8e8e8]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[12px] text-[#252b42] truncate">{product.name}</p>
                        <p className="font-normal text-[11px] text-[#737373]">x{count}</p>
                      </div>
                      <span className="font-bold text-[12px] text-[#23856d] shrink-0">
                        ₺{(count * product.price).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="px-5 py-4 border-t border-[#e8e8e8] flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="font-normal text-[13px] text-[#737373]">Ürün Toplamı</span>
                  <span className="font-bold text-[13px] text-[#252b42]">₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-normal text-[13px] text-[#737373]">Kargo</span>
                  <span className={`font-bold text-[13px] ${shipping === 0 && subtotal > 0 ? 'text-[#2dc071]' : 'text-[#252b42]'}`}>
                    {subtotal === 0 ? '—' : shipping === 0 ? 'Ücretsiz' : `+₺${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-px bg-[#e8e8e8]" />
                <div className="flex justify-between">
                  <span className="font-bold text-[15px] text-[#252b42]">Genel Toplam</span>
                  <span className="font-bold text-[18px] text-[#23a6f0]">₺{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery address chip */}
              {selectedAddress && (
                <div className="mx-5 mb-2 bg-[#eff8ff] border border-[#bfdbfe] rounded-[5px] px-3 py-2.5 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#23a6f0] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-bold text-[12px] text-[#1e40af]">Teslimat Adresi</p>
                    <p className="font-normal text-[12px] text-[#1e40af] truncate">
                      {addresses.find((a) => a.id === selectedAddress)?.title}
                      {' — '}
                      {addresses.find((a) => a.id === selectedAddress)?.city}
                    </p>
                  </div>
                </div>
              )}

              {/* Selected card chip */}
              {selectedCard && (
                <div className="mx-5 mb-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-[5px] px-3 py-2.5 flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-bold text-[12px] text-[#166534]">Ödeme Kartı</p>
                    <p className="font-normal text-[12px] text-[#166534] truncate">
                      •••• {String(cards.find((c) => c.id === selectedCard)?.card_no || '').slice(-4)}
                      {' — '}
                      {cards.find((c) => c.id === selectedCard)?.name_on_card}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>}
      </div>

      {/* ── Card delete confirm modal ── */}
      {deleteCardConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[12px] p-6 max-w-[360px] w-full shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fef2f2] rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-[#e74040]" />
              </div>
              <div>
                <p className="font-bold text-[16px] text-[#252b42]">Kartı Sil</p>
                <p className="font-normal text-[13px] text-[#737373]">Bu işlem geri alınamaz.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={doDeleteCard}
                className="flex-1 bg-[#e74040] hover:bg-[#c53030] text-white font-bold text-[14px] py-2.5 rounded-[5px] transition-colors cursor-pointer"
              >
                Sil
              </button>
              <button
                onClick={() => setDeleteCardConfirm(null)}
                className="flex-1 border border-[#e8e8e8] text-[#737373] hover:border-[#252b42] hover:text-[#252b42] font-bold text-[14px] py-2.5 rounded-[5px] transition-colors cursor-pointer"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Address delete confirm modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[12px] p-6 max-w-[360px] w-full shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fef2f2] rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-[#e74040]" />
              </div>
              <div>
                <p className="font-bold text-[16px] text-[#252b42]">Adresi Sil</p>
                <p className="font-normal text-[13px] text-[#737373]">Bu işlem geri alınamaz.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={doDelete}
                className="flex-1 bg-[#e74040] hover:bg-[#c53030] text-white font-bold text-[14px] py-2.5 rounded-[5px] transition-colors cursor-pointer"
              >
                Sil
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-[#e8e8e8] text-[#737373] hover:border-[#252b42] hover:text-[#252b42] font-bold text-[14px] py-2.5 rounded-[5px] transition-colors cursor-pointer"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
