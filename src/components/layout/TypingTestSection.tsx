import { Keyboard } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button3D from "../common/button/button3d";
import Dropdown from "../common/drop-down/DropDown";

export default function TypingTestSection() {
  const navigate = useNavigate();
  const [time, setTime] = useState("1min");
  const [level, setLevel] = useState("Basic");
  const [type, setType] = useState("Text");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdowns = useMemo(
    () => [
      {
        label: "Time",
        state: time,
        setState: setTime,
        options: ["1min", "2min", "3min", "5min"],
      },
      {
        label: "Level",
        state: level,
        setState: setLevel,
        options: ["Basic", "Intermediate", "Advanced"],
      },
      {
        label: "Type",
        state: type,
        setState: setType,
        options: ["Text", "Numbers", "Coding", "Symbols"],
      },
    ],
    [time, level, type]
  );

  return (
    <section
      id="typing-test"
      className="min-h-[calc(100vh-50px)] scroll-m-10 flex items-center px-4 py-4 sm:px-8 md:px-16 lg:px-24 md:py-12 bg-transparent"
    >
      <div className="w-full">
        <div className="relative flex items-center justify-center gap-1.5 mb-6 text-center text-light-textPrimary dark:text-dark-textPrimary">
          <Keyboard className="w-8 h-8 md:w-9 md:h-9" />
          <h2 className="text-3xl md:text-4xl font-bold">Typing Test</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-light-bg dark:bg-dark-bg  p-8 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {dropdowns.map((props) => (
              <Dropdown
                key={props.label}
                {...props}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
          </div>
          <Button3D
            text="Start Typing Test"
            onClick={() =>
              navigate(
                `/test?type=${type.toLowerCase()}&time=${time}&level=${level}`
              )
            }
            className="w-full mt-8"
          />
        </div>
      </div>
    </section>
  );
}
