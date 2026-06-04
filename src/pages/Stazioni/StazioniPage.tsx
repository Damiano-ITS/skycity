import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import StazioniList from "./StazioniList";
import StazioniDetail from "./StazioniDetail";
import NuovaStazioneForm from "./NuovaStazioneForm";
import "./StazioniPage.scss";

export interface StazioneData {
  id: string;
  nome: string;
  stato: "Online" | "Manutenzione" | "Chiusa";
  capacita: number;
  biciPresenti: number;
  monopattiniPresenti: number;
  tipo: string;
  modelloTotem: string;
  statoSlotLiberi: string;
  prossimaManutenzione: string;
  totaleTransazioni: number;
  coordinatGPS: string;
  totaleGiorniOperativi: number;
  integritaDocks: number;
  utilizzoRicariche: number;
  conteggioAnomalie: number;
  indirizzo: string;
  intervento?: {
    idIntervento: string;
    tipoProblema: string;
    segnalatoDa: string;
    orarioSegnalazione: string;
    priorita: "ALTA" | "MEDIA" | "BASSA";
    tecnicoAssegnato: string;
    descrizione: string;
    ricambiNecessari: string;
  };
}

const INITIAL_STAZIONI: StazioneData[] = [
  {
    id: "#stz-001",
    nome: "Piazza San Marco",
    stato: "Manutenzione",
    capacita: 30,
    biciPresenti: 12,
    monopattiniPresenti: 8,
    tipo: "Stazione Dock (standard)",
    modelloTotem: "DockMaster-5000",
    statoSlotLiberi: "15 / 30",
    prossimaManutenzione: "2026-06-15",
    totaleTransazioni: 1250,
    coordinatGPS: "45.9567, 12.6598",
    totaleGiorniOperativi: 450,
    integritaDocks: 88,
    utilizzoRicariche: 850,
    conteggioAnomalie: 2,
    indirizzo: "Via San Marco, 12",
    intervento: {
      idIntervento: "#INT-001",
      tipoProblema: "Meccanismo di aggancio bloccato",
      segnalatoDa: "Sistema Automonitoraggio",
      orarioSegnalazione: "30 Mag 2026 - 10:30",
      priorita: "ALTA",
      tecnicoAssegnato: "(non assegnato)",
      descrizione: "Il meccanismo di aggancio del dock #7 è bloccato. Verificare possibili danni alla serratura elettronica e all'alimentazione.",
      ricambiNecessari: "Serratura elettronica di ricambio, kit pulizia connettori."
    }
  },
  {
    id: "#stz-002",
    nome: "Piazza Parco",
    stato: "Manutenzione",
    capacita: 30,
    biciPresenti: 12,
    monopattiniPresenti: 7,
    tipo: "Punto Ricarica Monopattini",
    modelloTotem: "ChargePoint-STZ",
    statoSlotLiberi: "11 / 30",
    prossimaManutenzione: "2026-06-20",
    totaleTransazioni: 940,
    coordinatGPS: "45.9591, 12.6612",
    totaleGiorniOperativi: 310,
    integritaDocks: 75,
    utilizzoRicariche: 620,
    conteggioAnomalie: 1,
    indirizzo: "Parco Galvani, 5",
    intervento: {
      idIntervento: "#INT-004",
      tipoProblema: "Cortocorticuito Piastra Base",
      segnalatoDa: "Operatore Pier Paolo",
      orarioSegnalazione: "31 Mag 2026 - 08:15",
      priorita: "MEDIA",
      tecnicoAssegnato: "Luigi Rossi",
      descrizione: "Infiltrazione d'acqua piovana nello slot #3. La piastra non eroga corrente.",
      ricambiNecessari: "Fusibili 16A, guarnizione siliconica stagna."
    }
  },
  {
    id: "#stz-003",
    nome: "Piazza San Marco",
    stato: "Online",
    capacita: 30,
    biciPresenti: 12,
    monopattiniPresenti: 6,
    tipo: "Stazione Dock (standard)",
    modelloTotem: "DockMaster-5000",
    statoSlotLiberi: "12 / 30",
    prossimaManutenzione: "2026-07-02",
    totaleTransazioni: 2100,
    coordinatGPS: "45.9555, 12.6571",
    totaleGiorniOperativi: 600,
    integritaDocks: 100,
    utilizzoRicariche: 1400,
    conteggioAnomalie: 0,
    indirizzo: "Via San Marco, 16"
  },
  {
    id: "#stz-004",
    nome: "Piazza Parco",
    stato: "Online",
    capacita: 40,
    biciPresenti: 15,
    monopattiniPresenti: 15,
    tipo: "Area Parcheggio Libera",
    modelloTotem: "EcoDock-Pro",
    statoSlotLiberi: "10 / 40",
    prossimaManutenzione: "2026-07-15",
    totaleTransazioni: 3200,
    coordinatGPS: "45.9610, 12.6640",
    totaleGiorniOperativi: 750,
    integritaDocks: 98,
    utilizzoRicariche: 0,
    conteggioAnomalie: 0,
    indirizzo: "Parco Galvani, 3"
  },
  {
    id: "#stz-005",
    nome: "Stazione FS Centrale",
    stato: "Chiusa",
    capacita: 20,
    biciPresenti: 0,
    monopattiniPresenti: 0,
    tipo: "Stazione Dock (standard)",
    modelloTotem: "DockMaster-5000",
    statoSlotLiberi: "20 / 20",
    prossimaManutenzione: "---- -- --",
    totaleTransazioni: 4500,
    coordinatGPS: "45.9490, 12.6510",
    totaleGiorniOperativi: 900,
    integritaDocks: 40,
    utilizzoRicariche: 2500,
    conteggioAnomalie: 8,
    indirizzo: "Viale Stazione, 1"
  }
];

export default function StazioniPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stazioni, setStazioni] = useState<StazioneData[]>(INITIAL_STAZIONI);
  const [view, setView] = useState<'list' | 'create'>('list');

  const handleUpdateStazione = (updated: StazioneData) => {
    setStazioni(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleCreateStazione = (newStazione: StazioneData) => {
    setStazioni(prev => [newStazione, ...prev]);
    setView('list');
  };

  const handleDeleteStazione = (targetId: string) => {
    setStazioni(prev => prev.filter(s => s.id !== targetId));
    navigate("/stazioni");
  };

  if (view === 'create') {
    return <NuovaStazioneForm stazioni={stazioni} onSave={handleCreateStazione} onCancel={() => setView('list')} />;
  }

  if (id) {
    const currentStazione = stazioni.find(s => s.id.replace("#", "") === id);
    if (!currentStazione) {
      return (
        <div className="stazioni-error">
          <h3>Errore: Hub Stazione {id} non censito a sistema.</h3>
          <button onClick={() => navigate("/stazioni")} className="btn-base">Torna alla Rete</button>
        </div>
      );
    }
    return (
      <StazioniDetail 
        stazione={currentStazione} 
        onSave={handleUpdateStazione} 
        onDelete={handleDeleteStazione}
        onBack={() => navigate("/stazioni")} 
      />
    );
  }

  return <StazioniList stazioni={stazioni} onCreateOpen={() => setView('create')} />;
}