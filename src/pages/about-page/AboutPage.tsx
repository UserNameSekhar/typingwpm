import { CheckCircle, Lightbulb, Rocket, Star, Users } from "lucide-react";
import Footer from "../../components/layout/Footer";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sarah Johnson",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Michael Smith",
    role: "Product Designer",
    image: "https://via.placeholder.com/150",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative text-center py-10 sm:py-12 md:py-14 lg:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          About Us
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 px-4 text-gray-600 dark:text-gray-300">
          Empowering users with top-tier typing tools to enhance speed and
          accuracy.
        </p>
      </section>

      {/* Company Overview */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Who We Are
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
          Our typing platform is built for learners, professionals, and
          competitive typists. We offer real-time analytics, AI-powered
          insights, and a seamless user experience to help users achieve
          excellence.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {[
            {
              icon: Users,
              title: "10,000+ Users",
              text: "Trusted by thousands worldwide.",
              color: "text-blue-500",
            },
            {
              icon: Star,
              title: "4.9/5 Rating",
              text: "Highly rated by users.",
              color: "text-yellow-500",
            },
            {
              icon: CheckCircle,
              title: "98% Accuracy",
              text: "Helping users type smarter.",
              color: "text-green-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <item.icon
                size={36}
                className={`mx-auto ${item.color} mb-3 sm:mb-4`}
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-white/60 dark:bg-gray-900/30 backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {[
            {
              icon: Lightbulb,
              title: "AI-Powered Learning",
              text: "Get personalized typing insights.",
              color: "text-purple-500",
            },
            {
              icon: Rocket,
              title: "Fast & Interactive",
              text: "Real-time feedback & challenges.",
              color: "text-red-500",
            },
            {
              icon: CheckCircle,
              title: "Trusted by Experts",
              text: "Used by professionals worldwide.",
              color: "text-green-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <item.icon
                size={36}
                className={`mx-auto ${item.color} mb-3 sm:mb-4`}
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full mb-3 sm:mb-4 border-4 border-blue-500 transition-transform transform hover:scale-105"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
