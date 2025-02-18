import React from "react";
import FAQSection from "../../components/layout/FAQSection";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/layout/HeroSection";
import LeaderboardSection from "../../components/layout/LeaderboardSection";
import TypingTestSection from "../../components/layout/TypingTestSection";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-tl from-cyan-50 via-cyan-50 dark:from-cyan-950/20 dark:via-cyan-900/20 dark:to-orange-900/20 to-orange-100">
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
