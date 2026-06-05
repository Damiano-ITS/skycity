import { type IssueItem, issuesData } from "../constants/dashboardMocks";

interface DashboardTableProps {
  onTakeCharge: (issue: IssueItem) => void;
  onOpenDetails: (id: string) => void;
}

export default function DashboardTable({ onTakeCharge, onOpenDetails }: DashboardTableProps) {
  return (
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
                  onClick={() => onTakeCharge(row)}
                >
                  Prendi in carico
                </button>
                <button 
                  className="btn-action"
                  onClick={() => onOpenDetails(row.id)}
                >
                  Apri
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}