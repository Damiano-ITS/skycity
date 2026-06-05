import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VeicoloData } from "../types/veicoli";
import Table, { type TableColumn } from "../../../components/ui/Table/Table";

interface ListProps {
  veicoli: VeicoloData[];
  onCreateOpen: () => void;
}

export default function VeicoliList({ veicoli, onCreateOpen }: ListProps) {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [filtroStato, setFiltroStato] = useState("");
  const [filtroStazione, setFiltroStazione] = useState("");
  const [filtroBatteria, setFiltroBatteria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const filteredVeicoli = veicoli.filter(v => {
    const query = search.trim().toLowerCase().replace("#", "");
    const matchSearch = query === "" || 
      v.id.toLowerCase().replace("#", "").includes(query) || 
      v.modello.toLowerCase().includes(query) ||
      v.stazione.toLowerCase().includes(query);

    const matchStato = filtroStato === "" || v.stato === filtroStato;
    const matchStazione = filtroStazione === "" || v.stazione === filtroStazione;

    let matchBatteria = true;
    if (filtroBatteria === "bassa") {
      matchBatteria = v.batteria >= 0 && v.batteria <= 20;
    } else if (filtroBatteria === "media") {
      matchBatteria = v.batteria >= 21 && v.batteria <= 60;
    } else if (filtroBatteria === "alta") {
      matchBatteria = v.batteria >= 61 && v.batteria <= 100;
    }

    const matchTipo = filtroTipo === "" || v.tipo === filtroTipo;
    
    return matchSearch && matchStato && matchStazione && matchBatteria && matchTipo;
  });

  const columns: TableColumn<VeicoloData>[] = [
    {
      header: "Veicolo",
      accessor: "id",
      render: (id, v) => (
        <span className="font-medium">
          <i className={`fa-solid ${v.tipo === "Bici" ? "fa-bicycle" : "fa-motorcycle"} v-type-icon`}></i>
          #{id}
        </span>
      )
    },
    {
      header: "Stato",
      accessor: "stato",
      render: (stato: string) => (
        <span className={`v-badge v-badge--status-${stato.toLowerCase().replace(" ", "")}`}>
          {stato}
        </span>
      )
    },
    {
      header: "Stazione",
      accessor: "stazione",
      render: (stazione) => <span className="text-muted">{stazione}</span>
    },
    {
      header: "Batteria Residua",
      accessor: "batteria",
      render: (batteria: number) => (
        <div className="v-battery-container">
          <span className={`v-battery-icon v-battery-icon--${batteria <= 20 ? 'low' : batteria <= 60 ? 'mid' : 'high'}`}></span>
          <span className="font-semibold">{batteria}%</span>
        </div>
      )
    },
    {
      header: "Azioni",
      align: "right",
      render: (_, v) => (
        <button 
          className="btn-action-view" 
          onClick={() => navigate(`/veicoli/${v.id}`)}
        >
          Visualizza
        </button>
      )
    }
  ];

  return (
    <div className="veicoli-list">
      <div className="veicoli-header-row">
        <h2>Veicoli</h2>
        <button className="btn-primary" onClick={onCreateOpen}>
          <i className="fa-solid fa-plus"></i> Nuovo Veicolo
        </button>
      </div>

      <div className="v-filters-card">
        <div className="v-filters-grid">
          <div className="filter-group search-group">
            <label>Cerca</label>
            <div className="v-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="ID, modello o stazione..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Stato</label>
            <select value={filtroStato} onChange={(e) => setFiltroStato(e.target.value)} className="v-select">
              <option value="">Tutti gli stati</option>
              <option value="In servizio">In servizio</option>
              <option value="In manutenzione">In manutenzione</option>
              <option value="Inattivo">Inattivo</option>
              <option value="Guasto">Guasto</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Stazione</label>
            <select value={filtroStazione} onChange={(e) => setFiltroStazione(e.target.value)} className="v-select">
              <option value="">Tutte le stazioni</option>
              <option value="Stazione A">Stazione A</option>
              <option value="Stazione B">Stazione B</option>
              <option value="Parco">Parco</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Livello Batteria</label>
            <select value={filtroBatteria} onChange={(e) => setFiltroBatteria(e.target.value)} className="v-select">
              <option value="">Qualsiasi carica</option>
              <option value="alta">Alta (61% - 100%)</option>
              <option value="media">Media (21% - 60%)</option>
              <option value="bassa">Critica/Bassa (0% - 20%)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tipo Mezzo</label>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="v-select">
              <option value="">Tutti i tipi</option>
              <option value="Bici">Bici</option>
              <option value="Monopattino">Monopattino</option>
            </select>
          </div>
        </div>
      </div>

      <div className="veicoli-table-card">
        <h3>Elenco Veicoli</h3>
        <Table 
          columns={columns} 
          data={filteredVeicoli} 
          rowKey="id"
          emptyMessage="Nessun veicolo corrisponde ai filtri selezionati."
        />
      </div>
    </div>
  );
}