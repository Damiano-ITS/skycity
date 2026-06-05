import { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import CustomSelect from "../../../components/ui/CustomSelect/CustomSelect";
import { chartDateOptions, rentalsData, vehicleTypeData } from "../constants/dashboardMocks";

export default function DashboardCharts() {
  const [rentalsWeek, setRentalsWeek] = useState<string>("week-this-month");
  const [vehicleWeek, setVehicleWeek] = useState<string>("week-this-month");

  return (
    <div className="dashboard__charts">
      <div className="chart-box">
        <div className="chart-box__header">
          <div className="chart-box__title-wrapper">
            <h4 className="chart-box__title">Andamento Noleggi</h4>
            <i className="fa-regular fa-circle-info chart-box__info-icon"></i>
          </div>
          <CustomSelect
            options={chartDateOptions}
            selectedValue={rentalsWeek}
            onChange={setRentalsWeek}
          />
        </div>
        <div className="chart-box__legend">
          <span className="legend-item">
            <span className="legend-item__line legend-item__line--solid"></span> Noleggi
          </span>
          <span className="legend-item">
            <span className="legend-item__line legend-item__line--dashed"></span> Noleggi (mese precedente)
          </span>
        </div>
        <div className="chart-box__render">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={rentalsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis domain={[1000, 4000]} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="noleggi" stroke="#1d4ed8" strokeWidth={2} dot={{ fill: "#1d4ed8", r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="precedente" stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-box">
        <div className="chart-box__header">
          <div className="chart-box__title-wrapper">
            <h4 className="chart-box__title">Utilizzo per Tipologia di Veicolo</h4>
            <i className="fa-regular fa-circle-info chart-box__info-icon"></i>
          </div>
          <CustomSelect
            options={chartDateOptions}
            selectedValue={vehicleWeek}
            onChange={setVehicleWeek}
          />
        </div>
        <div className="chart-box__render chart-box__render--donut">
          <div className="donut-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <span className="donut-center__label">TOTALE</span>
              <span className="donut-center__value">1800</span>
              <span className="donut-center__sub">Veicoli</span>
            </div>
            <div className="donut-labels">
              <div className="donut-label donut-label--left">
                <span className="donut-label__percentage">25%</span>
                <span className="donut-label__text">Monopattini Elettrici</span>
              </div>
              <div className="donut-label donut-label--right">
                <span className="donut-label__percentage">75%</span>
                <span className="donut-label__text">Bici Elettriche</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}