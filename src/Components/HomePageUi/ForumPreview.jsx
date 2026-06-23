import Image from 'next/image';
import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';
import CommunityForumApi from '@/lib/api/CommunityForumApi';
import Link from 'next/link';
import ForumPostCard from '../CommunityForumPage/ForumPostCard';

const ForumPreview = async () => {
  // Fetch latest 3 posts
  const response = await CommunityForumApi(1, 3);
  let posts = response?.data?.posts || response?.data || response?.posts || [];
  if (!Array.isArray(posts)) posts = [];
  
  // Ensure we only show a maximum of 3 posts in case the API limit doesn't work perfectly
  posts = posts.slice(0, 3);

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
            <Link href="/forum">
              <button className="mt-6 cursor-pointer max-w-max md:mt-0 py-3 px-6 rounded-full border border-[#22C55E] text-[#16A34A] font-bold tracking-tight hover:bg-[#22C55E] hover:text-white transition-all duration-300">
                Visit Forum
              </button>
            </Link>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <StaggerItem
              key={post._id || Math.random().toString()}
              className="h-full"
            >
              <ForumPostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ForumPreview;
