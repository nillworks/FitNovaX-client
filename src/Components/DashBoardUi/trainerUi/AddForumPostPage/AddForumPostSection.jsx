import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import AddForumPostForm from './AddForumPostForm';

const AddForumPostSection = () => {
  const categories = [
    { value: 'workout-tips', label: 'Workout Tips' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'strength-training', label: 'Strength Training' },
  ];

  const tags = [
    { value: 'fitness', label: 'Fitness' },
    { value: 'gym', label: 'Gym' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Area */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-[#C6F4D6] p-3 rounded-2xl border border-[#8FE3B0] shadow-sm">
              <MessageSquarePlus className="w-8 h-8 text-[#15803D]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">Create Forum Post</h1>
          </div>
          <p className="text-[#64748B] text-lg font-medium max-w-2xl">
            Share your expertise and engage with the fitness community. Write a comprehensive guide, quick tips, or motivating stories.
          </p>
        </div>

        {/* Main Area Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Form */}
          <div className="lg:col-span-8 space-y-8">
            <AddForumPostForm categories={categories} tags={tags} />
          </div>

          {/* Right Side: Information Cards */}
          <div className="lg:col-span-4 space-y-6 sticky top-8">
            {/* Publishing Information Card */}
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#22C55E] to-[#8FE3B0]"></div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-4">Publishing Info</h3>
              <ul className="space-y-4 text-[#64748B] text-sm">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 bg-[#C6F4D6] text-[#15803D] rounded-full p-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="leading-relaxed font-medium">Your post will be visible to all enrolled students and community members.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 bg-[#C6F4D6] text-[#15803D] rounded-full p-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="leading-relaxed font-medium">Featured posts appear at the top of the forum homepage.</span>
                </li>
              </ul>
            </div>

            {/* Writing Tips Card */}
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1E293B] mb-5">Writing Tips</h3>
              <div className="space-y-4">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#8FE3B0] hover:shadow-sm transition-all duration-300">
                  <h4 className="font-bold text-[#1E293B] text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-[#22C55E]">✨</span> Catchy Title
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-medium">Use strong, action-oriented words to grab attention.</p>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#8FE3B0] hover:shadow-sm transition-all duration-300">
                  <h4 className="font-bold text-[#1E293B] text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-[#22C55E]">🖼️</span> High-Quality Image
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-medium">Posts with relevant cover images get 3x more engagement.</p>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#8FE3B0] hover:shadow-sm transition-all duration-300">
                  <h4 className="font-bold text-[#1E293B] text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-[#22C55E]">📝</span> Clear Formatting
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-medium">Use paragraphs, lists, and bold text to make it readable.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForumPostSection;
