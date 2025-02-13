import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
            About Our Film Forest
          </h1>
          <p className="mt-4 text-lg text-light-textSecondary dark:text-dark-textSecondary">
            Your ultimate destination for everything related to movies.
          </p>
        </header>

        {/* About Web App */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            What is This Web App?
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            Our web app is dedicated to movie enthusiasts, providing the latest updates about 
            upcoming movies, occasion movies, and everything related to the film industry. Whether 
            you're a casual viewer or a film aficionado, we've built this platform to bring the 
            magic of cinema closer to you.
          </p>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            Features
          </h2>
          <ul className="space-y-4">
            <li className="text-light-textSecondary dark:text-dark-textSecondary">
              🎬 **Discover Upcoming Movies**: Get detailed insights into movies releasing soon.
            </li>
            <li className="text-light-textSecondary dark:text-dark-textSecondary">
              🗓️ **Occasion Movies**: Explore movies based on special occasions and events.
            </li>
            <li className="text-light-textSecondary dark:text-dark-textSecondary">
              🌟 **Film Industry News**: Stay updated with the latest news and announcements.
            </li>
            <li className="text-light-textSecondary dark:text-dark-textSecondary">
              💬 **Reviews and Discussions**: Read and share reviews with a passionate community.
            </li>
            <li className="text-light-textSecondary dark:text-dark-textSecondary">
              ❤️ **Personalized Favorites**: Like movies and create your own list of favorites.
            </li>
          </ul>
        </section>

        {/* Why This Web App */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            Why Choose This Web App?
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            In a world full of movie information scattered across various platforms, our web app 
            brings everything you need into one place. Designed with movie lovers in mind, our goal 
            is to create a seamless, user-friendly experience where you can explore, learn, and 
            celebrate cinema. Join us in our journey to build the best movie discovery platform.
          </p>
        </section>

        {/* About Developers */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            About the Team
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            We are a team of passionate developers and designers who share a deep love for movies. 
            Our mission is to enhance the movie-going experience by offering a platform that is both 
            informative and enjoyable. With cutting-edge technology and creative design, we aim to 
            bring the world of cinema closer to you.
          </p>
        </section>

        {/* Version Info */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            Version Information
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            Web App Version: <span className="font-bold">1.0.0</span>
          </p>
          <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            Last Updated: <span className="font-bold">February 2024</span>
          </p>
        </section>

        {/* Call to Action */}
        <footer className="text-center">
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
            Thank you for being a part of our journey. Let's celebrate the magic of movies together.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
