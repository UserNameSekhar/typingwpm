import { Search, X } from "lucide-react";
import { FC } from "react";

interface InputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBox: FC<InputProps> = ({
  type = "text",
  value,
  placeholder = "",
  onChange,
  className = "",
}) => {
  const handleClear = () => {
    onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>); // Notify parent of cleared input
  };

  return (
    <div className="relative w-full md:w-auto md:flex-1 min-w-max">
      <Search
        size={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      />

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`w-full py-1.5 sm:py-2 pl-8 pr-10 bg-light-card dark:bg-dark-card text-light-textPrimary dark:text-dark-textPrimary outline-none rounded-lg shadow-none hover:shadow-sm transition-all ease-in-out duration-300 delay-75 border-2 hover:border-indigo-300 border-transparent focus:border-indigo-400 dark:focus:border-indigo-200 ${className}`}
        onChange={onChange}
      />

      {value && (
        <X
          size={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default SearchBox;
