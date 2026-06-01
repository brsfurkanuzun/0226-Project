const products = [
  { img: '/images/product-1.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-2.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-3.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-4.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-5.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-6.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-7.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-8.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-1.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
  { img: '/images/product-2.png', name: 'Graphic Design', category: 'English Department', oldPrice: '$16.48', newPrice: '$6.48' },
];

function ProductCard({ img, name, category, oldPrice, newPrice }) {
  return (
    <div className="bg-white group cursor-pointer">
      <div className="h-[238px] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center text-center pt-6 pb-9 px-6 gap-2">
        <h5 className="text-dark font-bold text-base tracking-[0.1px]">{name}</h5>
        <p className="text-muted font-bold text-sm tracking-[0.2px]">{category}</p>
        <div className="flex items-center gap-1 pt-1">
          <span className="text-[#bdbdbd] font-bold text-base tracking-[0.1px] line-through">{oldPrice}</span>
          <span className="text-secondary font-bold text-base tracking-[0.1px]">{newPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProductCards() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <p className="text-muted text-xl leading-[30px] tracking-[0.2px]">Featured Products</p>
          <h2 className="text-dark font-bold text-2xl leading-8 tracking-[0.1px]">BESTSELLER PRODUCTS</h2>
          <p className="text-muted text-sm tracking-[0.2px]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {products.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-12">
          <button className="border-2 border-primary text-primary font-bold text-sm tracking-[0.2px] px-10 py-3 rounded-md hover:bg-primary hover:text-white transition-colors">
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
