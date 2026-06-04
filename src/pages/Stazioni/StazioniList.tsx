import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StazioneData } from "./StazioniPage";

interface ListProps {
  stazioni: StazioneData[];
  onCreateOpen: () => void;
}

export default function StazioniList({ stazioni, onCreateOpen }: ListProps) {
  const navigate = useNavigate();

  // Stati preesistenti
  const [filtroStato, setFiltroStato] = useState("Tutti");
  const [capMin, setCapMin] = useState("");
  const [capMax, setCapMax] = useState("");
  const [search, setSearch] = useState("");

  // Nuovi Stati per i filtri operativi richiesti
  const [filtroRiempimento, setFiltroRiempimento] = useState("Tutti");
  const [filtroFlotta, setFiltroFlotta] = useState("Tutti");

  const filteredStazioni = stazioni.filter(s => {
    const matchStato = filtroStato === "Tutti" || s.stato === filtroStato;
    const matchMin = capMin === "" || s.capacita >= Number(capMin);
    const matchMax = capMax === "" || s.capacita <= Number(capMax);
    const matchSearch = search === "" || s.nome.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());

    // 1. Logica Filtro "Soglia di Riempimento %"
    const totaleMezzi = s.biciPresenti + s.monopattiniPresenti;
    const percentualeRiempimento = s.capacita > 0 ? (totaleMezzi / s.capacita) * 100 : 0;

    const matchRiempimento = filtroRiempimento === "Tutti" ||
      (filtroRiempimento === "QuasiVuote" && percentualeRiempimento <= 20) ||
      (filtroRiempimento === "QuasiPiene" && percentualeRiempimento >= 80) ||
      (filtroRiempimento === "Bilanciate" && percentualeRiempimento > 20 && percentualeRiempimento < 80);

    // 2. Logica Filtro "Tipologia di Flotta"
    const matchFlotta = filtroFlotta === "Tutti" ||
      (filtroFlotta === "SoloBici" && s.biciPresenti > 0 && s.monopattiniPresenti === 0) ||
      (filtroFlotta === "SoloMono" && s.monopattiniPresenti > 0 && s.biciPresenti === 0) ||
      (filtroFlotta === "Mista" && s.biciPresenti > 0 && s.monopattiniPresenti > 0) ||
      (filtroFlotta === "Vuota" && totaleMezzi === 0);

    return matchStato && matchMin && matchMax && matchSearch && matchRiempimento && matchFlotta;
  });

  const handleGestisciStazione = (fullId: string) => {
    const extractedId = fullId.includes("#") ? fullId.replace("#", "") : fullId;
    navigate(`/stazioni/${extractedId}`);
  };

  const totali = filteredStazioni.length;
  const online = filteredStazioni.filter(s => s.stato === "Online").length;
  const manutenzione = filteredStazioni.filter(s => s.stato === "Manutenzione").length;
  const chiuse = filteredStazioni.filter(s => s.stato === "Chiusa").length;

  return (
    <div className="stazioni-list">
      <div className="stazioni-header-row">
        <h2>Area Stazioni</h2>
        <button className="btn-primary-green" onClick={onCreateOpen}>
          <i className="fa-solid fa-plus"></i>Nuova Stazione
        </button>
      </div>

      <div className="s-map-card">
        <div className="s-map-title">MONITORAGGIO STATO RETE</div>
        <div className="s-mock-map-canvas">
          <div className="map-grid-effect"></div>
          {filteredStazioni.map((s, idx) => (
            <div 
              key={s.id} 
              className={`s-map-pin s-map-pin--${s.stato.toLowerCase()}`}
              style={{ top: `${25 + (idx * 14) % 60}%`, left: `${15 + (idx * 22) % 75}%` }}
              title={`${s.nome} (${s.stato})`}
            >
              <i className="fa-solid fa-location-dot"></i>
              <span className="pin-popup">{s.nome}</span>
            </div>
          ))}
        </div>
        <div className="s-map-legend-bar">
          Stazioni Totali: <strong>{totali}</strong> | 
          <span className="dot dot--online"></span> Online: <strong>{online}</strong> | 
          <span className="dot dot--manutenzione"></span> Manutenzione: <strong>{manutenzione}</strong> | 
          <span className="dot dot--chiusa"></span> Chiusa: <strong>{chiuse}</strong>
        </div>
      </div>

      <div className="s-filters-panel">
        <span className="filters-title">Filtri Avanzati</span>
        <div className="s-filters-row">
          <div className="s-input-inline">
            <i className="fa-solid fa-layer-group"></i> Stato:
            <select value={filtroStato} onChange={(e) => setFiltroStato(e.target.value)}>
              <option value="Tutti">Tutti</option>
              <option value="Online">Online</option>
              <option value="Manutenzione">Manutenzione</option>
              <option value="Chiusa">Chiusa</option>
            </select>
          </div>

          {/* NUOVO FILTRO 1: SOGLIA DI RIEMPIMENTO */}
          <div className="s-input-inline">
            <i className="fa-solid fa-battery-half"></i> Riempimento:
            <select value={filtroRiempimento} onChange={(e) => setFiltroRiempimento(e.target.value)}>
              <option value="Tutti">Tutti i livelli</option>
              <option value="QuasiVuote">Quasi vuote (≤ 20%)</option>
              <option value="Bilanciate">Bilanciate (21% - 79%)</option>
              <option value="QuasiPiene">Quasi piene (≥ 80%)</option>
            </select>
          </div>

          {/* NUOVO FILTRO 2: TIPOLOGIA DI FLOTTA */}
          <div className="s-input-inline">
            <i className="fa-solid fa-arrows-spin"></i> Flotta Presente:
            <select value={filtroFlotta} onChange={(e) => setFiltroFlotta(e.target.value)}>
              <option value="Tutti">Tutte le flotte</option>
              <option value="SoloBici">Solo Biciclette</option>
              <option value="SoloMono">Solo Monopattini</option>
              <option value="Mista">Flotta Mista</option>
              <option value="Vuota">Stazione Vuota</option>
            </select>
          </div>

          <div className="s-input-inline">
            <i className="fa-solid fa-chart-pie"></i> Cap. Min:
            <input type="number" placeholder="10" value={capMin} onChange={(e) => setCapMin(e.target.value)} />
          </div>

          <div className="s-input-inline">
            Cap. Max:
            <input type="number" placeholder="40" value={capMax} onChange={(e) => setCapMax(e.target.value)} />
          </div>

          <div className="s-input-inline search-right">
            <i className="fa-solid fa-magnifying-glass"></i> Cerca:
            <input type="text" placeholder="Nome Stazione o ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="stazioni-table-container">
        <table className="s-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Stazione</th>
              <th>Stato</th>
              <th>Capacità</th>
              <th>Bici</th>
              <th>Monopattini</th>
              <th className="text-center">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredStazioni.map((s) => (
              <tr key={s.id}>
                <td className="font-mono text-muted">{s.id}</td>
                <td className="font-bold">{s.nome}</td>
                <td>
                  <span className={`s-status-pill s-status-pill--${s.stato.toLowerCase()}`}>
                    {s.stato}
                  </span>
                </td>
                <td>{s.capacita} slot</td>
                <td><i className="fa-solid fa-bicycle"></i> {s.biciPresenti}</td>
                <td><i className="fa-solid fa-kick-scooter"></i> {s.monopattiniPresenti}</td>
                <td className="text-center">
                  <button className="btn-manage-select" onClick={() => handleGestisciStazione(s.id)}>
                    Gestisci <i className="fa-solid fa-caret-down"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}