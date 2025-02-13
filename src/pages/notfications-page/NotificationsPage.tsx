import { ChevronRight } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FilmNotification {
  id: number;
  title: string;
  description: string;
  category:
    | "Upcoming Movies"
    | "Released Movies"
    | "Actor Updates"
    | "Film Industry News";
  date: string;
}

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.replace("/", "");
  const notifications: FilmNotification[] = [
    {
      id: 1,
      title: "Avengers: Endgame Re-Release",
      description:
        "The movie is being re-released with additional footage and special features.",
      category: "Upcoming Movies",
      date: "2024-12-15",
    },
    {
      id: 2,
      title: "Oppenheimer Streaming Now",
      description:
        "Christopher Nolan's masterpiece is now available on popular streaming platforms.",
      category: "Released Movies",
      date: "2024-12-10",
    },
    {
      id: 3,
      title: "Actor John Doe's New Project",
      description:
        "John Doe joins an ambitious sci-fi thriller set in the far reaches of space.",
      category: "Actor Updates",
      date: "2024-12-08",
    },
    {
      id: 4,
      title: "Box Office Records Broken",
      description:
        "The latest blockbuster sets a new global milestone, surpassing $1 billion.",
      category: "Film Industry News",
      date: "2024-12-05",
    },
  ];

  const groupedNotifications = notifications.reduce((acc, curr) => {
    acc[curr.category] = acc[curr.category] || [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, FilmNotification[]>);

  return (
    <div className="bg-gradient-to-b from-light-bg via-light-card to-light-bg dark:from-dark-bg dark:via-dark-card dark:to-dark-bg text-light-textPrimary dark:text-dark-textPrimary min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-light-textSecondary dark:text-dark-textSecondary mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center hover:text-light-textPrimary dark:hover:text-dark-textPrimary transition-all ease-in-out duration-200"
          >
            Home
          </button>
          <ChevronRight size={12} className="mx-2" />
          <button className="flex items-center text-light-textPrimary capitalize dark:text-dark-textPrimary cursor-default">
            {path}
          </button>
        </div>

        {/* Header */}
        <header className="mb-10 text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-primary font-semibold text-light-textPrimary dark:text-dark-textPrimary">
            Notifications
          </h1>
        </header>

        {/* Notification Categories */}
        <div className="space-y-10 md:space-y-14">
          {Object.entries(groupedNotifications).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-lg md:text-xl font-semibold mb-8 border-b border-dashed pb-2 text-light-textPrimary dark:text-dark-textPrimary border-gray-200 dark:border-gray-700">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-gray-100 dark:border-gray-800 duration-300 "
                  >
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {notification.date}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium">
                        {category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* No Notifications */}
        {notifications.length === 0 && (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            No notifications are available at the moment. Check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
