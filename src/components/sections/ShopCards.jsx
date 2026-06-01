const cards = [
  { img: '/images/shop-card-1.png', title: 'Top Product Of the Week', large: true },
  { img: '/images/shop-card-2.png', title: 'Top Product Of the Week', large: false },
  { img: '/images/shop-card-3.png', title: 'Top Product Of the Week', large: false },
];

function ShopCard({ img, title }) {
  return (
    <div className="relative overflow-hidden rounded-sm group cursor-pointer h-full">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[rgba(45,139,192,0.75)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 p-10">
        <h3 className="text-white font-bold text-2xl leading-8 tracking-[0.1px] mb-6">{title}</h3>
        <button className="border border-white text-white font-bold text-sm tracking-[0.2px] px-10 py-4 rounded-md hover:bg-white hover:text-primary transition-colors">
          EXPLORE ITEMS
        </button>
      </div>
    </div>
  );
}

export default function ShopCards() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-4 h-[572px]">
          {/* Large card */}
          <div className="flex-[0_0_51%]">
            <ShopCard {...cards[0]} />
          </div>
          {/* Two stacked cards */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1">
              <ShopCard {...cards[1]} />
            </div>
            <div className="flex-1">
              <ShopCard {...cards[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
