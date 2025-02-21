import {
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-950 py-12 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          {/* <div className="flex items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 13c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4v1h6.17l-1.59 1.59L18 13l4-4l-4-4l-1.41 1.41L18.17 8h-4.25C13.44 5.16 10.97 3 8 3C4.69 3 2 5.69 2 9c0 2.97 2.16 5.44 5 5.92V21h2v-8z"
                />
              </svg>
            </span>{" "}
            <AppLogo />
          </div> */}
          <p className="text-sm text-gray-300">
            We provide the best typing experience to help you improve speed &
            accuracy with real-time lessons and tests.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a
                href="/learn-typing"
                className="hover:text-indigo-400 transition"
              >
                Learn Typing
              </a>
            </li>
            <li>
              <a href="/test" className="hover:text-indigo-400 transition">
                Typing Test
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-indigo-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-indigo-400 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a
                href="/privacy-policy"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <ShieldCheck size={18} /> Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <FileText size={18} /> Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact & Socials</h3>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <Mail size={18} /> support@typingmaster.com
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2 mt-2">
            <Phone size={18} /> +123 456 7890
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              <Twitter size={22} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © 2025 TypeWPM. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
