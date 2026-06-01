import { useState, useEffect, useRef } from "react";
import "./CustomSelect.scss";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  isDanger?: boolean;
}

interface CustomSelectProps {
  options: SelectOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  triggerIcon?: string;
}

export default function CustomSelect({
  options,
  selectedValue,
  onChange,
  placeholder = "Seleziona...",
  triggerIcon
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const toggleSelect = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="custom-select__trigger" onClick={toggleSelect}>
        {triggerIcon && (
          <span className="custom-select__icon custom-select__icon--left">
            <i className={`fa-solid ${triggerIcon}`}></i>
          </span>
        )}
        
        <span className="custom-select__label">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className={`custom-select__icon custom-select__icon--chevron ${isOpen ? "custom-select__icon--open" : ""}`}>
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>

      {isOpen && (
        <ul className="custom-select__dropdown">
          {options.map((option) => (
            <li
              key={option.value}
              className={`custom-select__item ${option.isDanger ? "custom-select__item--danger" : ""}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.icon && <i className={`${option.icon} custom-select__item-icon`}></i>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}