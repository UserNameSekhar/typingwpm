import { FileText, Clock } from "lucide-react";

const blogPosts = [
  {
    title: "Top 5 Tips to Improve Your Typing Speed",
    date: "January 15, 2024",
    description: "Learn expert tips to type faster with better accuracy.",
  },
  {
    title: "Why Typing Accuracy is More Important Than Speed",
    date: "January 10, 2024",
    description: "Discover why accuracy should be your primary focus in typing.",
  },
  {
    title: "Best Keyboard Layouts for Fast Typing",
    date: "January 5, 2024",
    description: "Find out which keyboard layout suits you best for productivity.",
  },
];

const BlogSection = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl transform transition duration-300 hover:scale-105"
          >
            <FileText size={28} className="text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock size={16} className="mr-1" /> {post.date}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
