import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
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
import AssegnaTecnicoModal from "../Manutenzioni/AssegnaTecnicoModal";
import CustomSelect, { type SelectOption } from "../../components/ui/CustomSelect/CustomSelect";
import "./DashboardPage.scss";

interface IssueItem {
  id: string;
  problem: string;
  priority: string;
  time: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);

  const [rentalsWeek, setRentalsWeek] = useState<string>("week-this-month");
  const [vehicleWeek, setVehicleWeek] = useState<string>("week-this-month");

  const chartDateOptions: SelectOption[] = [
    { value: "week-this-month", label: "Questo mese" },
    { value: "week-prev-month", label: "Mese scorso" }
  ];

  const miniLineData = [
    { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, 
    { value: 45 }, { value: 60 }, { value: 55 }, { value: 70 }
  ];

  const miniBarData = [
    { value: 4 }, { value: 6 }, { value: 8 }, { value: 5 }, 
    { value: 7 }, { value: 9 }, { value: 6 }, { value: 8 }, 
    { value: 10 }, { value: 7 }, { value: 9 }, { value: 11 }
  ];

  const rentalsData = [
    { name: "25 Mag", noleggi: 2000, precedente: 1500 },
    { name: "26 Mag", noleggi: 3400, precedente: 3200 },
    { name: "27 Mag", noleggi: 2900, precedente: 3100 },
    { name: "28 Mag", noleggi: 3300, precedente: 3500 },
    { name: "29 Mag", noleggi: 2900, precedente: 2500 },
    { name: "30 Mag", noleggi: 3100, precedente: 1900 },
  ];

  const vehicleTypeData = [
    { name: "Monopattini Elettrici", value: 450, color: "#0ea5e9" },
    { name: "Bici Elettriche", value: 1350, color: "#10b981" },
  ];

  const issuesData: IssueItem[] = [
    { id: "Bici #bk-882", problem: "Catena rotta", priority: "Alta", time: "2 min fa" },
    { id: "Monopattino #mk-1267", problem: "Freno malfunzionante", priority: "Media", time: "5 min fa" },
    { id: "Bici #bk-015", problem: "Fanale posteriore spento", priority: "Media", time: "15 min fa" },
    { id: "Monopattino #mk-1301", problem: "Batteria scarica rapida", priority: "Alta", time: "30 min fa" },
  ];

  const handleApriDettaglio = (fullId: string) => {
    const extractedId = fullId.includes("#") ? fullId.split("#")[1] : fullId;
    navigate(`/manutenzioni/${extractedId}`);
  };

  const handleOpenAssegnaModal = (issue: IssueItem) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleConfermaAssegnazione = (nomeTecnico: string) => {
    alert(`Assegnato con successo a: ${nomeTecnico}`);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__kpis">
        <div className="kpi-card">
          <div className="kpi-card__main">
            <div className="kpi-card__info">
              <span className="kpi-card__title">Bici Elettriche Attive</span>
              <h3 className="kpi-card__value">1.355 <span className="kpi-card__unit">unità</span></h3>
            </div>
            <i className="fa-solid fa-bicycle kpi-card__icon"></i>
          </div>
          <div className="kpi-card__chart">
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={miniLineData}>
                <defs>
                  <linearGradient id="colorBici" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorBici)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <span className="kpi-card__trend kpi-card__trend--up">+12% rispetto a ieri</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__main">
            <div className="kpi-card__info">
              <span className="kpi-card__title">Monopattini Elettrici Attivi</span>
              <h3 className="kpi-card__value">1.355 <span className="kpi-card__unit">unità</span></h3>
            </div>
            <i className="fa-solid fa-wheelchair-move kpi-card__icon"></i>
          </div>
          <div className="kpi-card__chart">
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={miniLineData}>
                <defs>
                  <linearGradient id="colorMono" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMono)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <span className="kpi-card__trend kpi-card__trend--up">+3% rispetto a ieri</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__main">
            <div className="kpi-card__info">
              <span className="kpi-card__title">Veicoli in Carica</span>
              <h3 className="kpi-card__value">437 <span className="kpi-card__unit">unità</span></h3>
            </div>
            <i className="fa-solid fa-plug kpi-card__icon"></i>
          </div>
          <div className="kpi-card__chart">
            <ResponsiveContainer width="100%" height={40}>
              <BarChart data={miniBarData}>
                <Bar dataKey="value" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="kpi-card__trend kpi-card__trend--up">+67% rispetto a ieri</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card__main">
            <div className="kpi-card__info">
              <span className="kpi-card__title">CO₂ Risparmiata</span>
              <h3 className="kpi-card__value">1.250 <span className="kpi-card__unit">kg</span></h3>
            </div>
            <i className="fa-solid fa-leaf kpi-card__icon"></i>
          </div>
          <div className="kpi-card__chart">
            <ResponsiveContainer width="100%" height={40}>
              <BarChart data={miniBarData}>
                <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="kpi-card__trend kpi-card__trend--up">+67% rispetto a ieri</span>
        </div>
      </div>

      <div className="dashboard__fleet-availability">
        <div className="fleet-status">
          <span className="fleet-status__label">Disponibilità Flotta</span>
          <span className="fleet-status__percentage">88% Disponibili</span>
        </div>
        <div className="fleet-status__bars">
          {[...Array(14)].map((_, i) => (
            <span 
              key={i} 
              className={`fleet-status__bar ${i < 11 ? "fleet-status__bar--active" : ""}`}
            ></span>
          ))}
        </div>
      </div>

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
            <span className="legend-item"><span className="legend-item__line legend-item__line--solid"></span> Noleggi</span>
            <span className="legend-item"><span className="legend-item__line legend-item__line--dashed"></span> Noleggi (mese precedente)</span>
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

      <div className="dashboard__table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID Veicolo</th>
              <th>Problema</th>
              <th>Priorità</th>
              <th>Orario</th>
              <th className="dashboard-table__actions-head">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {issuesData.map((row, index) => (
              <tr key={index}>
                <td className="dashboard-table__id">{row.id}</td>
                <td>{row.problem}</td>
                <td>
                  <span className={`badge badge--${row.priority.toLowerCase()}`}>
                    {row.priority}
                  </span>
                </td>
                <td className="dashboard-table__time">{row.time}</td>
                <td className="dashboard-table__actions">
                  <button 
                    className="btn-action btn-action--primary"
                    onClick={() => handleOpenAssegnaModal(row)}
                  >
                    Prendi in carico
                  </button>
                  <button 
                    className="btn-action"
                    onClick={() => handleApriDettaglio(row.id)}
                  >
                    Apri
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedIssue && (
        <AssegnaTecnicoModal
          ticket={{
            id: selectedIssue.id,
            tipoVeicolo: selectedIssue.id.toLowerCase().includes("bici") ? "Bici" : "Monopattino",
            veicoloId: selectedIssue.id.includes("#") ? selectedIssue.id.split("#")[1] : selectedIssue.id,
            problema: selectedIssue.problem,
            priorita: selectedIssue.priority
          } as any}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfermaAssegnazione}
        />
      )}
    </div>
  );
}