import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";
import React, { useState } from "react";

const faqs = [
  {
    question: "How does the typing test work?",
    answer:
      "You can select different time limits, difficulty levels, and types of text to practice typing accuracy and speed.",
  },
  {
    question: "Can I improve my typing speed?",
    answer:
      "Yes! Consistent practice with our structured lessons can help you improve over time.",
  },
  {
    question: "Are coding challenges available?",
    answer:
      "Yes! We offer typing challenges for coding, numbers, symbols, and text.",
  },
  {
    question: "How is my accuracy calculated?",
    answer:
      "Your accuracy is calculated based on the percentage of correctly typed characters out of the total characters typed.",
  },
  {
    question: "Can I track my typing progress?",
    answer:
      "Yes! You can view your progress, including speed and accuracy stats, over time in the dashboard.",
  },
  {
    question: "Is the platform free to use?",
    answer:
      "Yes! Our basic typing tests and challenges are free. We also offer premium features for advanced tracking and lessons.",
  },
];

const FAQSection: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-20 py-16 bg-light-bg dark:bg-gray-900">
      <div className="relative flex items-center justify-center gap-1.5 mb-6 text-center text-light-textPrimary dark:text-dark-textPrimary">
        <MessageCircleQuestion className="w-8 h-8 md:w-9 md:h-9" />
        <h2 className="text-3xl md:text-4xl font-bold  text-center ">
          FAQs
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden transition-all duration-300"
          >
            {/* FAQ Question */}
            <button
              onClick={() =>
                setExpandedFAQ(expandedFAQ === index ? null : index)
              }
              className="w-full flex justify-between items-center px-6 py-5 text-lg font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              {faq.question}
              {expandedFAQ === index ? (
                <ChevronUp
                  size={22}
                  className="text-gray-600 dark:text-gray-300"
                />
              ) : (
                <ChevronDown
                  size={22}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </button>

            {/* FAQ Answer with Smooth Height Animation */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                expandedFAQ === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden px-6 py-0.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                <div className="py-2 my-1">{faq.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
