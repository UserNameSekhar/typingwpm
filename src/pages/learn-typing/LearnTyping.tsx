import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const TypingTestPage: React.FC = () => {
  //   const location = useLocation();
  // //   const params = new URLSearchParams(location.search);
  // // //   const type = params.get("type") || "Text";
  // // //   const level = params.get("level") || "Basic";

  // State for dropdowns and levels
  const [selectedCategory, setSelectedCategory] = useState("Learn Text");
  const [selectedLevel, setSelectedLevel] = useState("Level 1: ASDF");
  const [keyboardInput, setKeyboardInput] = useState("");

  // Sample data for levels
  const categories = ["Learn Text", "Learn Numbers", "Learn Symbols"];
  const levels = [
    "Level 1: ASDF",
    "Level 2: JKL;",
    "Level 3: QWER",
    "Level 4: UIOP",
    "Level 5: ZXCV",
  ];

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedLevel("Level 1: ASDF"); // Reset level on category change
  };

  // Handle level change
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };

  // Handle keyboard input
  const handleKeyboardInput = (key: string) => {
    setKeyboardInput((prev) => prev + key);
  };

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        handleKeyboardInput(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Sidebar (20%) */}
      <aside className="w-full md:w-1/5 p-6 bg-white dark:bg-gray-800 shadow-lg">
        <div className="space-y-6">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>

          {/* Level Buttons */}
          <div className="space-y-3">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                  selectedLevel === level
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content (80%) */}
      <main className="w-full md:w-4/5 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Level Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{selectedLevel}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {selectedLevel === "Level 1: ASDF"
                ? "asdf asdf asdf asdf"
                : selectedLevel === "Level 2: JKL;"
                ? "jkl; jkl; jkl; jkl;"
                : "Type the following..."}
            </p>
          </div>

          {/* Input Box */}
          <div className="mb-8">
            <input
              type="text"
              value={keyboardInput}
              onChange={(e) => setKeyboardInput(e.target.value)}
              placeholder="Start typing here..."
              className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Virtual Keyboard */}
          <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg">
            <div className="grid grid-cols-10 gap-2">
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "0",
                "Q",
                "W",
                "E",
                "R",
                "T",
                "Y",
                "U",
                "I",
                "O",
                "P",
                "A",
                "S",
                "D",
                "F",
                "G",
                "H",
                "J",
                "K",
                "L",
                ";",
                "Z",
                "X",
                "C",
                "V",
                "B",
                "N",
                "M",
                ",",
                ".",
                "/",
              ].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyboardInput(key.toLowerCase())}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default TypingTestPage;
