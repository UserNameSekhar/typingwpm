import React from "react";
import "./tabSwitch.css";

interface Item {
  id: number;
  label: string;
}

interface TabSwitchProps {
  items: Item[];
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ items, setIsLogin }) => {
  return (
    <div className="radio-input">
      {items.map((item: Item) => (
        <label className="label" key={item.id}>
          <input
            value="value-1"
            name="value-radio"
            id="value-1"
            type="radio"
            onClick={
              item.label === "SignIn" ? () => setIsLogin(true) : () => setIsLogin(false)
            }
          />
          <span className="text">{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default TabSwitch;
