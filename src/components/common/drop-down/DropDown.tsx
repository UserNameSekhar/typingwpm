import { useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Dropdown: React.FC<{
  label: string;
  state: string;
  setState: (value: string) => void;
  options: string[];
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
}> = ({ label, state, setState, options, openDropdown, setOpenDropdown }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setOpenDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-gray-800 dark:text-gray-200 font-medium mb-1 block">
        {label}
      </label>
      <div
        className="relative text-light-textPrimary dark:text-dark-textPrimary bg-transparent border-2 border-transparent ring-2 ring-gray-300 dark:ring-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500 rounded-lg p-3 cursor-pointer flex justify-between items-center transition-all"
        onMouseDown={(e) => e.stopPropagation()} // Prevents immediate close
        onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
      >
        {state}
        {openDropdown === label ? <ChevronUp /> : <ChevronDown />}
      </div>
      {openDropdown === label && (
        <div
          role="menu"
          className="absolute left-0 mt-2 w-full text-light-textPrimary dark:text-dark-textPrimary bg-white dark:bg-dark-bg border border-gray-400 dark:border-gray-600 rounded-lg shadow-lg z-50 animate-fadeIn"
        >
          {options.map((opt) => (
            <div
              key={opt}
              role="menuitem"
              className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
              onMouseDown={(e) => e.stopPropagation()} // Prevents outside click from closing dropdown
              onClick={() => {
                setState(opt);
                setTimeout(() => setOpenDropdown(null), 150); // Slight delay prevents flicker
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
