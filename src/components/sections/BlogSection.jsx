const posts = [
  {
    img: '/images/blog-1.png',
    tag: 'Google',
    date: 'March 22, 2021',
    comments: 10,
    title: "Loudest à la Madison #1 (L'integral)",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  },
  {
    img: '/images/blog-2.png',
    tag: 'Google',
    date: 'March 22, 2021',
    comments: 10,
    title: "Loudest à la Madison #1 (L'integral)",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  },
];

function BlogCard({ img, tag, date, comments, title, desc }) {
  return (
    <div className="bg-white rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-shadow group cursor-pointer">
      <div className="md:w-[48%] h-[240px] md:h-auto overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex-1 p-8 flex flex-col gap-4">
        <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2px]">
          <span className="text-primary">{tag}</span>
          <span className="text-muted">{date}</span>
          <span className="text-muted">{comments} comments</span>
        </div>
        <h3 className="text-dark font-bold text-2xl leading-8 tracking-[0.1px]">{title}</h3>
        <p className="text-muted text-sm leading-5 tracking-[0.2px]">{desc}</p>
        <a href="#" className="text-primary font-bold text-sm tracking-[0.2px] flex items-center gap-2 mt-auto hover:text-primary-hover transition-colors">
          Learn More →
        </a>
      </div>
    </div>
  );
}

export default function BlogSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <p className="text-secondary font-bold text-sm tracking-[0.2px]">Practice Advice</p>
          <h2 className="text-dark font-bold text-[40px] leading-[50px] tracking-[0.2px]">Featured Posts</h2>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <BlogCard key={i} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
