import { ArrowRightCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-blue-600 text-white text-center rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Typing?</h2>
      <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6">
        Take your typing skills to the next level with our advanced typing test and training tools.
      </p>
      <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg flex items-center mx-auto hover:bg-gray-100 transition duration-300">
        Get Started <ArrowRightCircle size={20} className="ml-2" />
      </button>
    </section>
  );
};

export default CTASection;
