'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const tabs = [
  'All',
  'Company',
  'Marketing',
  'Newsroom',
  'Partners',
  'Engineering',
  'Press',
];

const blogPosts = [
  {
    category: 'Cybersecurity',
    date: 'Oct 15, 2025',
    title: 'Advancements in Cybersecurity',
    description: 'Discover new technologies protecting businesses from digital threats. CVE-2025-55182 is a critical vulnerability in React that requires immediate action. Next.js and other frameworks that React are affected. Read the bulletin and act now.',
    author: {
      name: 'Meschac Irung',
      avatar: 'https://i.pravatar.cc/150?u=Meschac',
    },
    slug: 'advancements-in-cybersecurity',
  },
  {
    category: 'Finance',
    date: 'Nov 1, 2025',
    title: 'The Role of Blockchain in Modern Finance',
    description: 'Understand how blockchain is reshaping the financial landscape. Building agents should feel like shaping an idea rather than fighting a maze of code or infrastructure. And we\'ve seen this story before.',
    author: {
      name: 'Theo Balick',
      avatar: 'https://i.pravatar.cc/150?u=Theo',
    },
    slug: 'role-of-blockchain',
  },
  {
    category: 'Sustainability',
    date: 'Nov 10, 2025',
    title: 'Sustainability in Tech: A Growing Focus',
    description: 'Explore efforts towards sustainable practices in technology. The same ease of use you expect from Vercel, now extended to your backends. Since we introduced the AI Cloud at Vercel Ship.',
    author: {
      name: 'Shadcn',
      avatar: 'https://github.com/shadcn.png',
    },
    slug: 'sustainability-in-tech',
  },
  {
    category: 'Business',
    date: 'Dec 5, 2025',
    title: 'Leveraging Big Data for Business Success',
    description: 'See how big data analytics can unlock new opportunities. Velocity went up, quality followed, and a generation of products appeared as if overnight.',
    author: {
      name: 'Bernard Ngandu',
      avatar: 'https://i.pravatar.cc/150?u=Bernard',
    },
    slug: 'leveraging-big-data-1',
  },
  {
    category: 'Business',
    date: 'Dec 5, 2025',
    title: 'Leveraging Big Data for Business Success',
    description: 'See how big data analytics can unlock new opportunities. Velocity went up, quality followed, and a generation of products appeared as if overnight.',
    author: {
      name: 'Glodie Lukose',
      avatar: 'https://i.pravatar.cc/150?u=Glodie',
    },
    slug: 'leveraging-big-data-2',
  },
  {
    category: 'Business',
    date: 'Dec 5, 2025',
    title: 'Leveraging Big Data for Business Success',
    description: 'See how big data analytics can unlock new opportunities insights and more from. Velocity went up, quality followed, and a generation of products appeared as if overnight.',
    author: {
      name: 'Shadcn',
      avatar: 'https://github.com/shadcn.png',
    }, 
     slug: 'leveraging-big-data-3',
  },
];

export const BlogSection = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-dashed border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'text-sm transition-colors hover:text-foreground',
                activeTab === tab
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid Container - Dashed Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-dashed border-border/50">
           
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={cn(
                'group flex flex-col justify-between p-8 hover:bg-muted/30 transition-colors',
                'border-b border-r border-dashed border-border/50'
              )}
            >
              {/* Content */}
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">{post.date}</div>
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-4 text-sm">
                  {post.description}
                </p>
              </div>

              {/* Author and Read More */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-muted-foreground">
                    {post.author.name}
                  </span>
                </div>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Read
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
