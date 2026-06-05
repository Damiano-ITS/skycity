import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KpiCard from "../../components/ui/KpiCard/KpiCard";
import DashboardCharts from "./components/DashboardCharts";
import DashboardTable from "./components/DashboardTable";
import AssegnaTecnicoModal from "../Manutenzioni/components/AssegnaTecnicoModal";
import { type IssueItem } from "./constants/dashboardMocks";
import type { Tecnico } from "../Manutenzioni/types/manutenzioni";
import "./DashboardPage.scss";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);

  const handleApriDettaglio = (fullId: string) => {
    const extractedId = fullId.includes("#") ? fullId.split("#")[1] : fullId;
    navigate(`/manutenzioni/${extractedId}`);
  };

  const handleOpenAssegnaModal = (issue: IssueItem) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleConfermaAssegnazione = (tecnico: Tecnico) => {
    alert(`Assegnato con successo a: ${tecnico.nome}`);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__kpis">
        <KpiCard 
          title="Bici Elettriche Attive" 
          value="1.355" 
          unit="unità" 
          trendText="+12% rispetto a ieri" 
          iconClass="fa-solid fa-bicycle" 
        />
        <KpiCard 
          title="Monopattini Elettrici Attivi" 
          value="1.355" 
          unit="unità" 
          trendText="+3% rispetto a ieri" 
          iconClass="fa-solid fa-wheelchair-move" 
        />
        <KpiCard 
          title="Veicoli in Carica" 
          value="437" 
          unit="unità" 
          trendText="+67% rispetto a ieri" 
          iconClass="fa-solid fa-plug" 
        />
        <KpiCard 
          title="CO₂ Risparmiata" 
          value="1.250" 
          unit="kg" 
          trendText="+67% rispetto a ieri" 
          iconClass="fa-solid fa-leaf" 
        />
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
            />
          ))}
        </div>
      </div>

      <DashboardCharts />

      <DashboardTable 
        onTakeCharge={handleOpenAssegnaModal} 
        onOpenDetails={handleApriDettaglio} 
      />

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