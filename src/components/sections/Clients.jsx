const brands = [
  { src: '/images/brand-1.png', alt: 'Hooli' },
  { src: '/images/brand-2.png', alt: 'Lyft' },
  { src: '/images/brand-3.png', alt: 'Pied Piper' },
  { src: '/images/brand-4.png', alt: 'Stripe' },
  { src: '/images/brand-5.png', alt: 'AWS' },
  { src: '/images/brand-6.png', alt: 'Reddit' },
];

export default function Clients() {
  return (
    <section className="bg-white py-12 border-b border-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-14">
          {brands.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
