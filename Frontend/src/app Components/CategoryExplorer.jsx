import React from 'react';

const CATEGORIES = [
  { id: 1, title: 'SHOP FASHION', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'HOME ESSENTIALS', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'RUNNING SHOES', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'TECH ACCESSORIES', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' }
];

export default function CategoryExplorer() {
  return (
    <section className="w-full bg-stone-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-bold tracking-wider text-stone-800 text-lg uppercase mb-10">
          Browse Our Collections
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="relative group aspect-[3/4] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-stone-200"
            >
              {/* Background Category Image */}
              <img 
                src={cat.img} 
                alt={cat.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Linear Bottom Shadow Overlay for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              {/* Title Text positioned at base */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-black tracking-tight leading-tight uppercase whitespace-pre-line">
                  {cat.title.split(' ').join('\n')}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}