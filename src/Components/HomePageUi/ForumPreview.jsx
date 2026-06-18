import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';
const posts = [
  {
    id: 1,
    title: '5 Nutrition Myths You Need to Stop Believing',
    author: 'Dr. Emily Chen',
    description:
      'Uncover the truth behind common diet misconceptions and learn how to fuel your body efficiently.',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1453&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Mastering the Perfect Deadlift Form',
    author: 'Alex Johnson',
    description:
      'A step-by-step guide to improving your deadlift technique to maximize gains and prevent injury.',
    image:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'How to Stay Motivated During Winter',
    author: 'Sarah Connor',
    description:
      'Practical tips to keep your fitness journey on track even when the weather gets tough.',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop',
  },
];

const ForumPreview = () => {
  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
              Community <span className="text-[#22C55E]">Forum</span>
            </h2>
            <p className="text-[#64748B] text-lg leading-relaxed">
              Stay updated with the latest tips, guides,{' '}
              <br className="hidden sm:block" /> and discussions from our expert
              community.
            </p>
          </div>
          <button className="mt-6 cursor-pointer max-w-max md:mt-0 py-3 px-6 rounded-full border border-[#22C55E] text-[#16A34A] font-bold tracking-tight hover:bg-[#22C55E] hover:text-white transition-all duration-300">
            Visit Forum
          </button>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <StaggerItem
              key={post.id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl overflow-hidden group flex flex-col hover:shadow-xl transition-all duration-300"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#22C55E] transition-colors leading-relaxed">
                  {post.title}
                </h3>
                <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-4">
                  By {post.author}
                </p>
                <p className="text-[#64748B] leading-relaxed mb-6 flex-grow">
                  {post.description}
                </p>
                <button className="text-[#16A34A] font-bold text-sm tracking-tight hover:text-[#15803D] flex items-center space-x-1 group-hover:underline">
                  <span>Read Article</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ForumPreview;
