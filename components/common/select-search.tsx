import { useState, useRef, useEffect } from "react";
import { Option } from "./select";

type Props = {
  options?: Option[];
  placeholder: string;
  onSearchChanged: (value: string) => void;
  onSelectChanged: (value: string) => void;
};

export const SelectSearch = ({
  placeholder = "Select an option",
  options,
  onSearchChanged,
  onSelectChanged,
}: Props) => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (search) onSearchChanged(search);
  }, [search]);

  useEffect(() => {
    if (selected?.value) onSelectChanged(selected?.value!);
  }, [selected]);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        type="button"
        className="w-full rounded-md border border-border bg-white p-3 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected?.label || placeholder}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md border border-border bg-white shadow-lg">
          <input
            ref={inputRef}
            type="text"
            className="w-full border-b border-border p-2 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {options
              ? options.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-3 hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    {option.label}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </div>
  );
};
