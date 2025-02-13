import { MousePointerClick, Type, CheckCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <MousePointerClick size={28} className="text-blue-500" />,
    title: "1. Select a Typing Test",
    description: "Choose from different test durations and difficulty levels.",
  },
  {
    icon: <Type size={28} className="text-green-500" />,
    title: "2. Start Typing",
    description: "Type the displayed text as accurately and quickly as possible.",
  },
  {
    icon: <CheckCircle size={28} className="text-orange-500" />,
    title: "3. Submit Your Test",
    description: "Once done, submit your test to analyze your performance.",
  },
  {
    icon: <TrendingUp size={28} className="text-purple-500" />,
    title: "4. Improve & Repeat",
    description: "Review your stats and keep practicing to improve speed and accuracy.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl transform transition duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              {step.icon}
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
