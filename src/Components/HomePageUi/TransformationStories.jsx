import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';
const stories = [
  {
    id: 1,
    name: 'Michael T.',
    achievement: '-40 lbs in 6 Months',
    story:
      "The personalized programs and the community support kept me accountable every single day. I've never felt stronger or more confident.",
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Jessica R.',
    achievement: 'Marathon Finisher',
    story:
      'From struggling to run a mile to completing my first full marathon. The trainers here literally changed my life and my mindset.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop',
  },
];

const TransformationStories = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#8FE3B0]/20 text-[#15803D] text-sm font-bold tracking-widest uppercase mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
            Real People, <span className="text-[#22C55E]">Real Results</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Read how our members transformed their lives through dedication and
            the right guidance.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {stories.map(story => (
            <StaggerItem
              key={story.id}
              className="bg-[#FFFFFF] p-8 md:p-10 rounded-[2.5rem] border border-[#E2E8F0] flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#C6F4D6]">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8FE3B0]/20 text-[#15803D] text-xs font-bold uppercase tracking-tight mb-4">
                  {story.achievement}
                </div>
                <p className="text-[#64748B] text-lg italic leading-relaxed mb-6">
                  {`"${story.story}"`}
                </p>
                <h4 className="text-xl font-bold text-[#1E293B]">
                  {story.name}
                </h4>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TransformationStories;
