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
import getFeaturedClasses from '@/lib/api/getFeaturedClasses';

const HomePage = async () => {
  const featuredClass = await getFeaturedClasses();

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#1E293B] overflow-x-hidden">
      <HeroSection />

      {/* Social Proof */}
      <TrustStats />

      {/* How It Works */}
      <FitnessJourney />

      {/* Main Offer */}
      <FeaturedClasses featuredClass={featuredClass} />

      {/* Benefits */}
      <WhyChooseUs />

      {/* Trainers */}
      <TrainerSpotlight />

      {/* Platform Features */}
      <AppFeatures />

      {/* Success Stories */}
      <TransformationStories />

      {/* Community */}
      <ForumPreview />

      {/* Final CTA */}
      <CallToAction />

      <Footer />
    </main>
  );
};

export default HomePage;
