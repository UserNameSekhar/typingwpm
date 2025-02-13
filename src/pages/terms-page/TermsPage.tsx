import { FileText, Gavel, Phone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  const terms = [
    {
      icon: <Shield size={24} className="text-indigo-500" />,
      title: "Acceptance of Terms",
      content:
        "By accessing and using our platform, you agree to abide by these terms and conditions. If you do not agree, please do not use our services.",
    },
    {
      icon: <FileText size={24} className="text-indigo-500" />,
      title: "User Responsibilities",
      content:
        "Users must provide accurate information, respect others on the platform, and not engage in fraudulent activities or misconduct.",
    },
    {
      icon: <Gavel size={24} className="text-indigo-500" />,
      title: "Intellectual Property",
      content:
        "All content, including text, design, and branding, is owned by us. Unauthorized use, reproduction, or distribution is strictly prohibited.",
    },
    {
      icon: <Shield size={24} className="text-indigo-500" />,
      title: "Account Termination",
      content:
        "We reserve the right to suspend or terminate any user account that violates our policies, engages in illegal activity, or disrupts our platform.",
    },
    {
      icon: <FileText size={24} className="text-indigo-500" />,
      title: "Limitation of Liability",
      content:
        "We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our platform.",
    },
    {
      icon: <Gavel size={24} className="text-indigo-500" />,
      title: "Amendments to Terms",
      content:
        "We may update these terms at any time. Continued use of the platform signifies your acceptance of any modifications.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative text-center py-14 md:py-16 lg:py-20 rounded-b-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
          Terms & Conditions
        </h1>
        <p className="text-base md:text-lg px-4 max-w-3xl mx-auto mt-4">
          Please read our terms carefully before using our platform to ensure a
          safe and responsible experience.
        </p>
      </section>

      {/* Terms Content */}
      <section className="px-6 md:px-20 py-10 md:py-12 lg:py-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10">
          Terms of Service
        </h2>
        <div className="max-w-4xl mx-auto space-y-10">
          {terms.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex items-start space-x-4"
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
          Need Help?
        </h2>
        <p className="text-base px-4 md:text-lg text-gray-200 max-w-2xl mx-auto mb-6">
          If you have any questions regarding our Terms & Conditions, feel free
          to reach out to us.
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

export default TermsPage;
