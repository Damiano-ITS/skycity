import { useState, type ChangeEvent } from "react";
import "./DateSelect.scss";

interface DateSelectProps {
  calendarIcon?: string;
  chevronIcon?: string;
}

export default function DateSelect({ 
  calendarIcon = "fa-calendar-days", 
  chevronIcon = "fa-chevron-down" 
}: DateSelectProps) {
  const [selectedWeek, setSelectedWeek] = useState<string>("week-1");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(e.target.value);
  };

  return (
    <div className="date-select">
      <span className="date-select__icon date-select__icon--calendar">
        <i className={`fa-solid ${calendarIcon}`}></i>
      </span>
      
      <select
        className="date-select__input"
        value={selectedWeek}
        onChange={handleChange}
      >
        <option value="week-1">01 Mag 2025 - 07 Mag 2025</option>
        <option value="week-2">08 Mag 2025 - 14 Mag 2025</option>
        <option value="week-3">15 Mag 2025 - 21 Mag 2025</option>
        <option value="week-4">22 Mag 2025 - 28 Mag 2025</option>
        <option value="week-5">29 Mag 2025 - 31 Mag 2025</option>
      </select>
      
      <span className="date-select__icon date-select__icon--chevron">
        <i className={`fa-solid ${chevronIcon}`}></i>
      </span>
    </div>
  );
}