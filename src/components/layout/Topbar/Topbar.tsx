import { useState } from "react";
import CustomSelect, { type SelectOption } from "../../ui/CustomSelect/CustomSelect";
import "./TopBar.scss";

interface TopBarProps {
  currentRouteTitle: string;
}

export default function TopBar({ currentRouteTitle }: TopBarProps) {
  const [selectedWeek, setSelectedWeek] = useState<string>("week-5");

  const user = {
    name: "Pier Paolo Pasolini",
    role: "Amministratore"
  };

  const dateOptions: SelectOption[] = [
    { value: "week-1", label: "01 Mag 2025 - 07 Mag 2025" },
    { value: "week-2", label: "08 Mag 2025 - 14 Mag 2025" },
    { value: "week-3", label: "15 Mag 2025 - 21 Mag 2025" },
    { value: "week-4", label: "22 Mag 2025 - 28 Mag 2025" },
    { value: "week-5", label: "01 Mag 2025 - 31 Mag 2025" }
  ];

  const profileOptions: SelectOption[] = [
    { value: "profile", label: "Profilo", icon: "fa-regular fa-user" },
    { value: "city", label: "Cambia Comune", icon: "fa-solid fa-city" },
    { value: "logout", label: "Logout", icon: "fa-solid fa-arrow-right-from-bracket", isDanger: true }
  ];

  const handleProfileMenuClick = (value: string) => {
    alert(`Azione profilo cliccata: ${value}`);
  };

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <h1 className="top-bar__title">{currentRouteTitle}</h1>
      </div>

      <div className="top-bar__center">
        <CustomSelect
          options={dateOptions}
          selectedValue={selectedWeek}
          onChange={setSelectedWeek}
          triggerIcon="fa-calendar-days"
        />
      </div>

      <div className="top-bar__right">
        <div className="profile-actions">
          <button className="profile-actions__notification">
            <i className="fa-regular fa-bell"></i>
            <span className="profile-actions__badge"></span>
          </button>

          <div className="profile-actions__user-wrapper">
            <div className="profile-actions__info">
              <span className="profile-actions__name">{user.name}</span>
              <span className="profile-actions__role">{user.role}</span>
            </div>
            
            <CustomSelect
              options={profileOptions}
              selectedValue=""
              onChange={handleProfileMenuClick}
              placeholder=""
            />
          </div>
        </div>
      </div>
    </header>
  );
}