"use client";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export type Option = { value: string; label: string };

type SelectProps = {
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  centerItem?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  value,
  className,
  options,
  onChange,
  centerItem,
}) => {
  const [selected, setSelected] = useState<Option>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      const found = options.find((val) => val.value === value);
      if (found) setSelected(found);
    }
  }, [value]);

  return (
    <div className={twMerge("relative w-64", className)} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full rounded-md border border-gray-300 bg-white p-2 text-left focus:ring-2 focus:ring-blue-500 ${centerItem ? "text-center" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.label}
      </button>
      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 hover:bg-blue-500 hover:text-white ${
                selected === option ? "bg-blue-100" : ""
              } ${centerItem ? "text-center" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
