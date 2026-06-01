const features = [
  { icon: '/images/feature-1.svg', title: 'Easy Wins',    desc: 'Get your best looking smile now!' },
  { icon: '/images/feature-2.svg', title: 'Concrete',     desc: 'Defalcate is most focused in helping you discover your most beautiful smile' },
  { icon: '/images/feature-3.svg', title: 'Hack Growth',  desc: 'Overcome any hurdle or challenge.' },
];

export default function Features() {
  return (
    <section className="bg-light py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <p className="text-muted text-xl font-normal leading-[30px] tracking-[0.2px]">Featured Products</p>
          <h2 className="text-dark font-bold text-2xl leading-8 tracking-[0.1px]">THE BEST SERVICES</h2>
          <p className="text-muted text-sm tracking-[0.2px]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-sm p-10 flex flex-col items-center text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-shadow">
              <div className="w-[72px] h-[72px] mb-8">
                <img src={icon} alt={title} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-dark font-bold text-2xl leading-8 tracking-[0.1px] mb-5">{title}</h3>
              <p className="text-muted text-sm leading-5 tracking-[0.2px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
