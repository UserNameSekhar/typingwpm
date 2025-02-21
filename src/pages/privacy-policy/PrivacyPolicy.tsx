import { FileText, Lock, Phone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const policies = [
    {
      icon: <Lock size={24} className="text-indigo-500" />,
      title: "Data Collection",
      content:
        "We collect personal data such as name, email, and payment details to enhance our services. We do not sell your data to third parties.",
    },
    {
      icon: <Shield size={24} className="text-indigo-500" />,
      title: "Data Security",
      content:
        "Your information is secured using encryption and other safety measures to prevent unauthorized access.",
    },
    {
      icon: <FileText size={24} className="text-indigo-500" />,
      title: "Cookies & Tracking",
      content:
        "We use cookies to improve user experience and analyze site traffic. You can manage your cookie preferences anytime.",
    },
    {
      icon: <Lock size={24} className="text-indigo-500" />,
      title: "Third-Party Services",
      content:
        "We may share certain data with trusted third-party services for payment processing and analytics.",
    },
    {
      icon: <Shield size={24} className="text-indigo-500" />,
      title: "User Rights",
      content:
        "You have the right to access, update, or delete your personal data. Contact us for any privacy-related requests.",
    },
    {
      icon: <FileText size={24} className="text-indigo-500" />,
      title: "Policy Updates",
      content:
        "We may update this privacy policy from time to time. Continued use of our platform signifies acceptance of any changes.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)]  text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative text-center py-14 md:py-16 lg:py-20 rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
          Privacy Policy
        </h1>
        <p className="text-base md:text-lg px-4 max-w-3xl mx-auto mt-4">
          Learn how we collect, use, and protect your personal information when
          you use our platform.
        </p>
      </section>

      {/* Privacy Policy Content */}
      <section className="px-6 md:px-20 py-10 md:py-12 lg:py-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10">
          Our Privacy Practices
        </h2>
        <div className="max-w-4xl mx-auto space-y-10">
          {policies.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-light-bg dark:bg-dark-bg rounded-lg shadow-lg flex items-start space-x-4"
            >
              {item.icon}
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Have Questions?
        </h2>
        <p className="text-base px-4 md:text-lg text-gray-200 max-w-2xl mx-auto mb-6">
          If you need more details about our privacy policy, feel free to
          contact us.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg flex items-center mx-auto hover:bg-gray-100  shadow-lg hover:translate-x-2 transition-all duration-500 delay-75"
        >
          <Phone size={20} className="mr-2" /> Contact Us
        </button>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
