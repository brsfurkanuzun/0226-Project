const imgLeft  = '/images/content-left.png';
const imgRight = '/images/content-right.png';

export default function ContentSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Images */}
          <div className="flex-1 flex gap-6 h-[498px]">
            <img src={imgLeft}  alt="Fashion" className="w-[42%] h-full object-cover rounded-sm" />
            <img src={imgRight} alt="Fashion" className="flex-1 h-full object-cover rounded-sm" />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col gap-6 md:pl-8">
            <p className="text-secondary font-bold text-base tracking-[0.1px]">Featured Products</p>
            <h2 className="text-dark font-bold text-[40px] leading-[50px] tracking-[0.2px]">
              We love what we do
            </h2>
            <p className="text-muted text-base leading-[20px] tracking-[0.2px]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
            <p className="text-muted text-sm leading-5 tracking-[0.2px]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
