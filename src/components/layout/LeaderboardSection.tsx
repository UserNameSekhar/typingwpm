import { ChevronDown, ChevronUp, Medal, User } from "lucide-react";
import React, { useState } from "react";

const leaderboardData: any = {
  allTime: [
    { name: "Alice", speed: "95 WPM", accuracy: "98%" },
    { name: "Bob", speed: "90 WPM", accuracy: "96%" },
    { name: "Charlie", speed: "88 WPM", accuracy: "95%" },
    { name: "David", speed: "85 WPM", accuracy: "94%" },
    { name: "Emma", speed: "84 WPM", accuracy: "93%" },
    { name: "Frank", speed: "82 WPM", accuracy: "92%" },
    { name: "Grace", speed: "80 WPM", accuracy: "91%" },
    { name: "Henry", speed: "78 WPM", accuracy: "90%" },
    { name: "Isabella", speed: "76 WPM", accuracy: "89%" },
    { name: "Jack", speed: "75 WPM", accuracy: "88%" },
    { name: "Kevin", speed: "73 WPM", accuracy: "87%" },
  ],
  yourTop: [{ name: "You", speed: "85 WPM", accuracy: "94%" }],
  recentTop: [{ name: "Charlie", speed: "88 WPM", accuracy: "95%" }],
  yourRecent: [{ name: "You", speed: "80 WPM", accuracy: "93%" }],
};

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof leaderboardData>("allTime");
  const [showAll, setShowAll] = useState(false);

  const usersToShow = showAll
    ? leaderboardData[activeTab]
    : leaderboardData[activeTab].slice(0, 10);

  return (
    <section id="leaderboard" className="min-h-[calc(100vh-80px)] scroll-m-14 px-4 sm:px-8 md:px-20 py-12 bg-transparent">
      {/* Leaderboard Header */}
      <div className="relative flex items-center justify-center gap-1.5 mb-6 text-center">
        <Medal className="text-yellow-500 dark:text-yellow-400 w-8 h-8 md:w-9 md:h-9"/>
        <h2 className="text-3xl md:text-4xl font-bold  text-center text-light-textPrimary dark:text-dark-textPrimary">Leaderboard</h2>
      </div>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto flex justify-center gap-2 mt-6">
        {["allTime", "yourTop", "recentTop", "yourRecent"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as keyof typeof leaderboardData);
              setShowAll(false);
            }}
            className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base capitalize
              ${
                activeTab === tab
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-950"
              }`}
          >
            {tab.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className=" max-w-3xl mx-auto bg-light-bg dark:bg-dark-bg p-6 rounded-lg shadow-xl mt-6">
        <ul className="space-y-4">
          {usersToShow.map((user: any, index: number) => (
            <li
              key={user.name}
              className="flex justify-between items-center px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <span
                  className={`font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full ${
                    index === 0
                      ? "bg-yellow-500 text-white dark:bg-yellow-400 dark:text-gray-100 "
                      : index === 1
                      ? "bg-gray-500 dark:bg-gray-400 text-white "
                      : index === 2
                      ? "bg-orange-500 dark:bg-orange-400 text-white"
                      : "bg-indigo-500 dark:bg-indigo-400 text-white"
                  }`}
                >
                  {index + 1}
                </span>

                {/* User Name */}
                <span className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-white">
                  <User
                    size={18}
                    className="text-indigo-500 dark:text-indigo-400"
                  />{" "}
                  {user.name}
                </span>
              </div>

              {/* WPM & Accuracy */}
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                {user.speed} | {user.accuracy}
              </span>
            </li>
          ))}
        </ul>

        {/* Show More / Show Less Button */}
        {leaderboardData[activeTab].length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold mx-auto transition-all duration-300"
          >
            {showAll ? "Show Less" : "See All"}{" "}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
