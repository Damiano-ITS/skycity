import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ManutenzioneTicket } from "./ManutenzioniPage";
import NuovaSegnalazioneModal from "./NuovaSegnalazioneModal";

interface ListProps {
  tickets: ManutenzioneTicket[];
  onAddTicket: (ticket: any) => void;
}

export default function ManutenzioniList({ tickets, onAddTicket }: ListProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTickets = tickets.filter(t => 
    t.veicoloId.toLowerCase().includes(search.toLowerCase()) ||
    t.problema.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manutenzioni-list">
      <div className="manutenzioni-list__top-bar">
        <h2>Manutenzioni</h2>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-plus"></i> Nuova Segnalazione
        </button>
      </div>

      <div className="manutenzioni-list__actions">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Cerca veicolo o problema..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="manutenzioni-list__table-card">
        <h3>Tabella Manutenzioni</h3>
        <table className="m-table">
          <thead>
            <tr>
              <th>ID Veicolo</th>
              <th>Problema</th>
              <th>Stato</th>
              <th>Priorità</th>
              <th>Orario</th>
              <th className="text-right">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((row) => (
              <tr key={row.id}>
                <td className="font-medium">
                  {row.tipoVeicolo} #{row.veicoloId}
                </td>
                <td>{row.problema}</td>
                <td>
                  <span className={`m-badge m-badge--status-${row.stato.toLowerCase().replace(" ", "")}`}>
                    {row.stato}
                  </span>
                </td>
                <td>
                  <span className={`m-badge m-badge--priority-${row.priorita.toLowerCase()}`}>
                    {row.priorita}
                  </span>
                </td>
                <td className="text-muted">{row.orario}</td>
                <td className="text-right">
                  <button 
                    className="btn-action-view" 
                    onClick={() => navigate(`/manutenzioni/${row.veicoloId}`)}
                  >
                    <i className="fa-regular fa-eye"></i> Apri
                  </button>
                </td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted m-table__empty-cell">
                  Nessun intervento trovato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <NuovaSegnalazioneModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={(data) => {
            onAddTicket(data);
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  );
}