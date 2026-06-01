const heroImage = '/images/hero.png';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#96e9fb] to-[#abecd6] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center min-h-[620px]">
          {/* Text */}
          <div className="flex-1 flex flex-col gap-6 py-16 md:py-0 md:pl-[80px] z-10">
            <p className="text-primary-hover font-bold text-base tracking-[0.1px]">SUMMER 2020</p>
            <h1 className="text-dark font-bold text-[58px] leading-[80px] tracking-[0.2px]">
              NEW COLLECTION
            </h1>
            <p className="text-muted text-xl leading-[30px] tracking-[0.2px]">
              We know how large objects will act,<br />
              but things on a small scale.
            </p>
            <div>
              <button className="bg-primary text-white font-bold text-2xl tracking-[0.1px] px-10 py-4 rounded-md hover:bg-primary-hover transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-end items-end h-full max-h-[620px] overflow-hidden">
            <img
              src={heroImage}
              alt="New Collection"
              className="object-cover object-top h-[620px] w-full max-w-[696px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
