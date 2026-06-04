import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VeicoloData } from "./VeicoliPage";

interface ListProps {
  veicoli: VeicoloData[];
  onCreateOpen: () => void;
}

export default function VeicoliList({ veicoli, onCreateOpen }: ListProps) {
  const navigate = useNavigate();
  
  const [filtroStato, setFiltroStato] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroStazione, setFiltroStazione] = useState("");
  const [search, setSearch] = useState("");

  const filteredVeicoli = veicoli.filter(v => {
    const matchStato = filtroStato === "" || v.stato === filtroStato;
    const matchTipo = filtroTipo === "" || v.tipo === filtroTipo;
    const matchStazione = filtroStazione === "" || v.stazione === filtroStazione;
    const matchSearch = search === "" || v.id.toLowerCase().includes(search.toLowerCase()) || v.modello.toLowerCase().includes(search.toLowerCase());
    
    return matchStato && matchTipo && matchStazione && matchSearch;
  });

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
          <div className="filter-group">
            <label>Stato</label>
            <select value={filtroStato} onChange={(e) => setFiltroStato(e.target.value)} className="v-select">
              <option value="">Seleziona Stato</option>
              <option value="In servizio">In servizio</option>
              <option value="In manutenzione">In manutenzione</option>
              <option value="Inattivo">Inattivo</option>
              <option value="Guasto">Guasto</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tipo</label>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="v-select">
              <option value="">Seleziona Tipo</option>
              <option value="Bici">Bici</option>
              <option value="Monopattino">Monopattino</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Stazione</label>
            <select value={filtroStazione} onChange={(e) => setFiltroStazione(e.target.value)} className="v-select">
              <option value="">Seleziona Stazione</option>
              <option value="Stazione A">Stazione A</option>
              <option value="Stazione B">Stazione B</option>
              <option value="Parco">Parco</option>
            </select>
          </div>

          <div className="filter-group search-group">
            <label>&nbsp;</label>
            <div className="v-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Cerca veicolo..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="veicoli-table-card">
        <h3>Elenco Veicoli</h3>
        <table className="v-table">
          <thead>
            <tr>
              <th>Veicolo</th>
              <th>Stato</th>
              <th>Stazione</th>
              <th>Batteria Residua</th>
              <th className="text-right">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredVeicoli.map((v) => (
              <tr key={v.id}>
                <td className="font-medium">
                  <i className={`fa-solid ${v.tipo === "Bici" ? "fa-bicycle" : "fa-wheelchair-move"} v-type-icon`}></i>
                  {v.tipo} #{v.id}
                </td>
                <td>
                  <span className={`v-badge v-badge--status-${v.stato.toLowerCase().replace(" ", "")}`}>
                    {v.stato}
                  </span>
                </td>
                <td className="text-muted">{v.stazione}</td>
                <td>
                  <div className="v-battery-container">
                    <span className={`v-battery-icon v-battery-icon--${v.batteria <= 20 ? 'low' : v.batteria <= 60 ? 'mid' : 'high'}`}></span>
                    <span className="font-semibold">{v.batteria}%</span>
                  </div>
                </td>
                <td className="text-right">
                  <button 
                    className="btn-action-view" 
                    onClick={() => navigate(`/veicoli/${v.id}`)}
                  >
                    Visualizza
                  </button>
                </td>
              </tr>
            ))}
            {filteredVeicoli.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted v-table-empty-cell">
                  Nessun veicolo corrisponde ai filtri selezionati.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}