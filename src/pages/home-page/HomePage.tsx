import React from "react";
import FloatingNav from "../../components/home-page/FloatingNav";
import FAQSection from "../../components/layout/FAQSection";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/layout/HeroSection";
import LeaderboardSection from "../../components/layout/LeaderboardSection";
import TypingTestSection from "../../components/layout/TypingTestSection";

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      
      {/* Floating Navigation */}
      <FloatingNav />
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      {/* <FeaturesSection /> */}
      {/* How It Works Section */}
      {/* <HowItWorksSection /> */}
      {/* Typing Test Section */}
      <TypingTestSection />
      {/* Leaderboard */}
      <LeaderboardSection />
      {/* Testimonials */}
      {/* <TestimonialsSection /> */}
      {/* FAQs */}
      <FAQSection />
      {/* Blog/Resources Section */}
      {/* <BlogSection /> */}
      {/* Call to Action Section */}
      {/* <CTASection /> */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
