import React from "react";
import "./KpiCard.scss";

interface KpiCardProps {
  title: string;
  value: React.ReactNode; 
  unit?: string;
  trendText: string;
  trendType?: "up" | "down";
  iconClass: string;
}

export default function KpiCard({
  title,
  value,
  unit,
  trendType = "up",
  trendText,
  iconClass
}: KpiCardProps) {
  return (
    <div className="kpi-card">
      <div className="kpi-card__main">
        <div className="kpi-card__info">
          <span className="kpi-card__title">{title}</span>
          <div className="kpi-card__value">
            {value} {unit && <span className="kpi-card__unit">{unit}</span>}
          </div>
          {trendText && (
            <span className={`kpi-card__trend kpi-card__trend--${trendType}`}>
              {trendText}
            </span>
          )}
        </div>
        <i className={`${iconClass} kpi-card__icon`}></i>
      </div>
    </div>
  );
}