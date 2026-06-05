import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ManutenzioneTicket, NuovaSegnalazionePayload } from "../types/manutenzioni";
import NuovaSegnalazioneModal from "./NuovaSegnalazioneModal";
import Table, { type TableColumn } from "../../../components/ui/Table/Table";

interface ManutenzioniListProps {
  tickets: ManutenzioneTicket[];
  onAddTicket: (ticket: NuovaSegnalazionePayload) => void;
}

export default function ManutenzioniList({ tickets, onAddTicket }: ManutenzioniListProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTickets = tickets.filter(t => 
    t.veicoloId.toLowerCase().includes(search.toLowerCase()) ||
    t.problema.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumn<ManutenzioneTicket>[] = [
    {
      header: "ID Veicolo",
      accessor: "veicoloId",
      render: (veicoloId, row) => (
        <span className="font-medium">
          <i 
            className={`fa-solid ${row.tipoVeicolo === "Bici" ? "fa-bicycle" : "fa-kick-scooter"} v-type-icon`} 
            style={{ marginRight: "8px" }}
          />
          #{veicoloId}
        </span>
      )
    },
    {
      header: "Problema",
      accessor: "problema"
    },
    {
      header: "Stato",
      accessor: "stato",
      render: (stato: string) => (
        <span className={`m-badge m-badge--status-${stato.toLowerCase().replace(" ", "")}`}>
          {stato}
        </span>
      )
    },
    {
      header: "Priorità",
      accessor: "priorita",
      render: (priorita: string) => (
        <span className={`m-badge m-badge--priority-${priorita.toLowerCase()}`}>
          {priorita}
        </span>
      )
    },
    {
      header: "Orario",
      accessor: "orario",
      render: (orario) => <span className="text-muted">{orario}</span>
    },
    {
      header: "Azioni",
      align: "right",
      render: (_, row) => (
        <button 
          type="button"
          className="btn-action-view" 
          onClick={() => navigate(`/manutenzioni/${row.veicoloId}`)}
        >
          <i className="fa-regular fa-eye"></i> Apri
        </button>
      )
    }
  ];

  return (
    <div className="manutenzioni-list">
      <div className="manutenzioni-list__top-bar">
        <h2>Manutenzioni</h2>
        <button type="button" className="btn-primary" onClick={() => setIsModalOpen(true)}>
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
        <Table 
          columns={columns}
          data={filteredTickets}
          rowKey="id"
          className="m-table"
          emptyMessage="Nessun intervento trovato."
        />
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