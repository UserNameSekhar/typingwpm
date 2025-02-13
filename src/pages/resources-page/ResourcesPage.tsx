import { Film, Globe, Image as ImageIcon } from "lucide-react";
import React from "react";
import Footer from "../../components/layout/Footer";

const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-light-bg dark:bg-dark-bg text-light-textPrimary dark:text-dark-textPrimary">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 pt-8 space-y-2 md:space-y-4 lg:space-y-6">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-support leading-tight">
            Resources
          </h1>
        </header>

        {/* Introduction */}
        <section className=" rounded-lg p-8 pt-2">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-support text-center mb-4 tracking-wide">
            A Heartfelt Thank You
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-center text-light-textSecondary dark:text-dark-textSecondary">
            This project wouldn't have been possible without the creativity,
            hard work, and contributions of talented individuals and platforms.
            Here's a special thanks to the contributors of icons, vectors,
            illustrations, and favicons that made this project shine.
          </p>
        </section>

        {/* Icons Section */}
        <section className="bg-light-card dark:bg-dark-card  rounded-lg p-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 flex items-center">
            Icon Contributors
          </h2>
          <ul className="space-y-2 md:space-y-4">
            <li>
              <a
                target="_blank"
                href="https://lucide.dev/"
                rel="noopener noreferrer"
                className="text-light-primary text-sm md:text-base dark:text-dark-primary hover:underline flex items-center"
              >
                <Globe className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                Lucide Icons Library
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://icons8.com/"
                rel="noopener noreferrer"
                className="text-light-primary text-sm md:text-base dark:text-dark-primary hover:underline flex items-center"
              >
                <ImageIcon className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                Icons8
              </a>
            </li>
          </ul>
        </section>

        {/* Vectors and Illustrations Section */}
        <section className="bg-light-card dark:bg-dark-card  rounded-lg p-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 flex items-center">
            Vector & Illustration Contributors
          </h2>
          <ul className="space-y-4">
            <li>
              <a
                target="_blank"
                href="https://undraw.co/"
                rel="noopener noreferrer"
                className="text-light-primary text-sm md:text-base dark:text-dark-primary hover:underline flex items-center"
              >
                <ImageIcon className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                unDraw
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://storyset.com/"
                rel="noopener noreferrer"
                className="text-light-primary text-sm md:text-base dark:text-dark-primary hover:underline flex items-center"
              >
                <Film className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                Storyset
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://icons8.com/"
                rel="noopener noreferrer"
                className="text-light-primary text-sm md:text-base dark:text-dark-primary hover:underline flex items-center"
              >
                <ImageIcon className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                Icons8
              </a>
            </li>
          </ul>
        </section>

        {/* Closing Acknowledgment */}
        <section className="bg-light-card dark:bg-dark-card  rounded-lg p-8">
          <p className="text-sm md:text-base lg:text-lg text-center text-light-textSecondary dark:text-dark-textSecondary">
            A huge *thank you* to everyone involved in creating these incredible
            resources. Your work inspires and enables projects like ours to
            excel. 🌟
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
