import { ChevronsUpDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ComboBox({ options, selected, onChange, text = "Select" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || text;

  return (
    <div ref={wrapperRef} className="relative inline-block w-[130px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full border px-3 py-1.5 rounded-md text-sm bg-white shadow-sm hover:bg-gray-50"
      >
        {selectedLabel}
        <ChevronsUpDown className="h-4 w-4 ml-2 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto text-sm">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selected === opt.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt.label || opt.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
