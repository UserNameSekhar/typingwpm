import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button3D from "../../components/common/button/button3d";
import Footer from "../../components/layout/Footer";

const ContactPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-10 sm:py-12 md:py-14 lg:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 px-4 text-gray-600 dark:text-gray-300">
          Have questions? Reach out to us anytime.
        </p>
      </section>

      {/* Contact Info */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Get In Touch
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {[
            {
              icon: Mail,
              title: "Email Us",
              text: "support@example.com",
              color: "text-blue-500",
            },
            {
              icon: Phone,
              title: "Call Us",
              text: "+1 234 567 890",
              color: "text-green-500",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              text: "123 Main Street, NY, USA",
              color: "text-red-500",
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

      {/* Contact Form */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
          Send Us a Message
        </h2>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-lg shadow-md">
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <Button3D
              text="Send Message"
              onClick={() => navigate(`/contact`)}
              className="w-full mt-3"
            />
          </form>
        </div>
      </section>

      {/* Find Us Here - Map Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
          Find Us Here
        </h2>
        <div className="max-w-4xl mx-auto">
          <iframe
            className="w-full h-64 md:h-96 rounded-xl shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d237.8351063850914!2d78.39869879830978!3d17.49023892412274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1738923032963!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="text-center py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Follow Us</h2>
        <div className="flex justify-center gap-6">
          {[
            { icon: Facebook, color: "text-indigo-600 dark:text-indigo-500" },
            { icon: Twitter, color: "text-indigo-600 dark:text-indigo-500" },
            { icon: Linkedin, color: "text-indigo-600 dark:text-indigo-500" },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className={`p-3 bg-gray-50 dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-125 ${item.color}`}
            >
              <item.icon size={24} />
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
