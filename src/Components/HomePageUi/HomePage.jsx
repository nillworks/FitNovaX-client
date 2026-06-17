import React from 'react';
import HeroSection from './HeroSection';
import TrustStats from './TrustStats';
import FeaturedClasses from './FeaturedClasses';
import FitnessJourney from './FitnessJourney';
import WhyChooseUs from './WhyChooseUs';
import TrainerSpotlight from './TrainerSpotlight';
import TransformationStories from './TransformationStories';
import ForumPreview from './ForumPreview';
import AppFeatures from './AppFeatures';
import CallToAction from './CallToAction';
import Footer from './Footer';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#1E293B]">
      <HeroSection />
      <TrustStats />
      <FeaturedClasses />
      <FitnessJourney />
      <WhyChooseUs />
      <TrainerSpotlight />
      <TransformationStories />
      <ForumPreview />
      <AppFeatures />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default HomePage;
