import React from 'react';
import Card from '../../Shared/Card';
import { FadeUp, StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';

const classes = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
    category: "Strength Training",
    title: "Advanced Powerlifting",
    trainerName: "Alex Johnson",
    price: "$45",
    bookingCount: "120+",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop",
    category: "Cardio",
    title: "HIIT Intensity Burn",
    trainerName: "Sarah Connor",
    price: "$35",
    bookingCount: "250+",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1470&auto=format&fit=crop",
    category: "Yoga & Flexibility",
    title: "Morning Vinyasa Flow",
    trainerName: "Elena Rostova",
    price: "$30",
    bookingCount: "85+",
  }
];

const FeaturedClasses = () => {
  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
              Featured <span className="text-[#22C55E]">Classes</span>
            </h2>
            <p className="text-[#64748B] text-lg leading-relaxed">
              Discover our top-rated fitness classes designed to push your limits and achieve your personal best.
            </p>
          </div>
          <button className="mt-6 md:mt-0 text-[#16A34A] font-bold tracking-tight hover:text-[#15803D] transition-colors flex items-center space-x-2 group">
            <span>View All Classes</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <StaggerItem key={cls.id}>
              <Card {...cls} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturedClasses;
