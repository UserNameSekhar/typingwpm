import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Developer",
    feedback:
      "This typing test has significantly improved my typing speed and accuracy. The analytics feature is amazing!",
  },
  {
    name: "Sarah Johnson",
    role: "Freelance Writer",
    feedback:
      "I love how smooth and interactive the platform is. Practicing daily has really boosted my efficiency.",
  },
  {
    name: "Michael Smith",
    role: "Data Analyst",
    feedback:
      "The best typing test tool I've ever used. The UI is professional and easy to use.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform transition duration-300 hover:scale-105"
          >
            <Quote size={32} className="text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-300">{testimonial.feedback}</p>
            <div className="mt-4 text-right">
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
