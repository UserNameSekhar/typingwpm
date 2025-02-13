import { Keyboard, BarChart3, Clock, Languages, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Keyboard size={28} className="text-blue-500" />,
    title: "Real-Time Accuracy Tracking",
    description: "Track your accuracy and speed as you type in real-time.",
  },
  {
    icon: <BarChart3 size={28} className="text-green-500" />,
    title: "Advanced Analytics",
    description: "Get detailed reports on your typing speed, errors, and progress.",
  },
  {
    icon: <Clock size={28} className="text-orange-500" />,
    title: "Custom Time Limits",
    description: "Choose from multiple test durations to match your pace.",
  },
  {
    icon: <Languages size={28} className="text-purple-500" />,
    title: "Multilingual Support",
    description: "Practice typing in multiple languages and keyboard layouts.",
  },
  {
    icon: <ShieldCheck size={28} className="text-red-500" />,
    title: "Secure & Private",
    description: "Your data is encrypted and securely stored for a safe experience.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform transition duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
