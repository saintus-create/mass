'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const featuredItems = [
  {
    id: 1,
    title: 'Angry Birds Reloaded',
    category: 'Games',
    image: 'https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=2070&auto=format&fit=crop', // Bird/Game placeholder
    action: 'Play now',
    theme: 'light',
  },
  {
    id: 2,
    title: 'Sabrina Carpenter',
    subtitle: '& Zane Lowe',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop', // B&W/Music placeholder
    action: 'Listen now',
    theme: 'dark',
  },
  {
    id: 3,
    title: 'Core with Gregg',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop', // Fitness placeholder
    action: 'Watch now',
    theme: 'dark',
  },
  {
    id: 4,
    title: 'New Originals',
    category: 'Shows',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop', // Movie placeholder
    action: 'Watch now',
    theme: 'dark',
  },
  {
      id: 5,
      title: 'Arcade Classics',
      category: 'Games',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
      action: 'Play now',
      theme: 'dark',
  }
];

export const FeaturedCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const itemWidth = scrollRef.current.clientWidth; // Assuming full width snap for simplicity or calculate relative
             // Or better: find which element is center.
            const center = scrollLeft + (itemWidth / 2);
            
            // Simple calculation assuming standard widths
            // For a robust implementation we might use IntersectionObserver, but scroll calculations work for equal sized items.
             // Let's assume the items take up e.g. 70-80% of container.
             // Actually, let's use the scroll ratio.
             
             const items = scrollRef.current.children;
             let closestIndex = 0;
             let minDistance = Number.MAX_VALUE;
             
             for (let i = 0; i < items.length; i++) {
                 const item = items[i] as HTMLElement;
                 const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
                 const distance = Math.abs(center - itemCenter);
                 if (distance < minDistance) {
                     minDistance = distance;
                     closestIndex = i;
                 }
             }
             setActiveIndex(closestIndex);
        }
    };

    useEffect(() => {
        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll, { passive: true });
            return () => ref.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            const items = scrollRef.current.children;
            if (items[index]) {
                const item = items[index] as HTMLElement;
                // Center the item
                const scrollLeft = item.offsetLeft - (scrollRef.current.offsetWidth / 2) + (item.offsetWidth / 2);
                scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-8 md:py-12 bg-background border-b border-border/40">
            <div className="container-wrapper">
                 <div className="container mb-6 px-4 md:px-6">
                    <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
                 </div>
                 
                 {/* Carousel Container */}
                 {/* Full width scroll container but centered items */}
                 <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-6 pb-8 -mx-4 md:mx-0 scrollbar-hide no-scrollbar"
                    style={{ scrollPaddingLeft: '1.5rem', scrollPaddingRight: '1.5rem' }}
                 >
                    {/* Spacer for start alignment if needed, or using padding on container */}
                    {featuredItems.map((item, index) => (
                        <div 
                            key={item.id}
                            className="snap-center shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden group border border-border/50 shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                        >
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Overlay/Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div className="text-white space-y-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{item.category}</span>
                                    <h3 className="text-2xl md:text-4xl font-bold leading-tight">
                                        {item.title}
                                        {item.subtitle && <span className="block text-white/70 font-normal">{item.subtitle}</span>}
                                    </h3>
                                </div>
                                
                                <Button 
                                    className="rounded-full bg-white text-black hover:bg-white/90 font-semibold px-6 h-10 w-fit transition-all hover:scale-105 active:scale-95"
                                >
                                    {item.action}
                                </Button>
                            </div>
                        </div>
                    ))}
                 </div>

                 {/* Pagination Dots */}
                 <div className="flex justify-center gap-2 mt-4">
                     {featuredItems.map((_, index) => (
                         <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all duration-300 bg-muted-foreground/30",
                                activeIndex === index && "bg-foreground w-2" // Active
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                         />
                     ))}
                 </div>
            </div>
        </section>
    );
};
