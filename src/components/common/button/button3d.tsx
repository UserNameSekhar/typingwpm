import React from "react";
import { LucideIcon } from "lucide-react";
import "./button3d.css";

interface Button3DProps {
  text: string;
  onClick: () => void;
  icon?: LucideIcon;
  className?: string;
}

const Button3D: React.FC<Button3DProps> = ({ text, onClick, icon: Icon, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      <span className="shadow"></span>
      <span className="edge bg-gradient-to-l from-indigo-950 via-indigo-800 to-indigo-950 dark:from-indigo-900 dark:via-indigo-700 dark:to-indigo-900"></span>
      <span className="front flex items-center justify-center gap-2 bg-indigo-600 dark:bg-indigo-500  font-semibold text-white dark:text-gray-100">
        {Icon && <Icon size={22} />}
        {text}
      </span>
    </button>
  );
};

export default Button3D;
