import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import VeicoliList from "./VeicoliList";
import VeicoliDetail from "./VeicoliDetail";
import NuovoVeicoloForm from "./NuovoVeicoloForm";
import "./VeicoliPage.scss";

export interface VeicoloData {
  id: string;
  tipo: "Bici" | "Monopattino";
  modello: string;
  stato: "In servizio" | "In manutenzione" | "Inattivo" | "Guasto";
  stazione: "Stazione A" | "Stazione B" | "Parco";
  batteria: number;
  prossimaManutenzione: string;
  noleggiTotali: number;
  ultimaPosizione: string;
  distanzaTotale: string;
  cicliRicarica: number;
  ultimoNoleggio: string;
  durataUltimoNoleggio: string;
  distanzaUltimoNoleggio: string;
  noteIniziali?: string;
}

const INITIAL_VEICOLI: VeicoloData[] = [
  {
    id: "bk-882",
    tipo: "Bici",
    modello: "Super73-RX",
    stato: "In manutenzione",
    stazione: "Stazione A",
    batteria: 12,
    prossimaManutenzione: "2025-06-15",
    noleggiTotali: 145,
    ultimaPosizione: "Piazza San Marco, Pordenone",
    distanzaTotale: "450 km",
    cicliRicarica: 85,
    ultimoNoleggio: "30 Mag 2025 - Piazza di Centa",
    durataUltimoNoleggio: "45 min",
    distanzaUltimoNoleggio: "4.2 km",
    noteIniziali: "Segnalata catena allentata dall'utente."
  },
  {
    id: "mk-1267",
    tipo: "Monopattino",
    modello: "Xiaomi Pro 4",
    stato: "In manutenzione",
    stazione: "Parco",
    batteria: 65,
    prossimaManutenzione: "2025-07-01",
    noleggiTotali: 312,
    ultimaPosizione: "Parco Galvani, Pordenone",
    distanzaTotale: "890 km",
    cicliRicarica: 140,
    ultimoNoleggio: "29 Mag 2025 - Via Mazzini",
    durataUltimoNoleggio: "12 min",
    distanzaUltimoNoleggio: "1.8 km"
  },
  {
    id: "bk-015",
    tipo: "Bici",
    modello: "SkyCity Comfort-E",
    stato: "Inattivo",
    stazione: "Stazione A",
    batteria: 30,
    prossimaManutenzione: "2025-06-10",
    noleggiTotali: 88,
    ultimaPosizione: "Stazione FS, Pordenone",
    distanzaTotale: "210 km",
    cicliRicarica: 42,
    ultimoNoleggio: "28 Mag 2025 - Corso Garibaldi",
    durataUltimoNoleggio: "22 min",
    distanzaUltimoNoleggio: "3.0 km"
  },
  {
    id: "mk-1301",
    tipo: "Monopattino",
    modello: "Ninebot G30 Max",
    stato: "Guasto",
    stazione: "Parco",
    batteria: 0,
    prossimaManutenzione: "2025-06-05",
    noleggiTotali: 540,
    ultimaPosizione: "Viale Trieste, Pordenone",
    distanzaTotale: "1240 km",
    cicliRicarica: 210,
    ultimoNoleggio: "30 Mag 2025 - Via Montereale",
    durataUltimoNoleggio: "5 min",
    distanzaUltimoNoleggio: "0.4 km"
  },
  {
    id: "mk-1500",
    tipo: "Monopattino",
    modello: "Ninebot G30 Max",
    stato: "In servizio",
    stazione: "Stazione A",
    batteria: 85,
    prossimaManutenzione: "2025-08-12",
    noleggiTotali: 94,
    ultimaPosizione: "Piazza XX Settembre, Pordenone",
    distanzaTotale: "180 km",
    cicliRicarica: 22,
    ultimoNoleggio: "31 Mag 2025 - Piazza Matteotti",
    durataUltimoNoleggio: "18 min",
    distanzaUltimoNoleggio: "2.1 km"
  }
];

export default function VeicoliPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [veicoli, setVeicoli] = useState<VeicoloData[]>(INITIAL_VEICOLI);
  const [view, setView] = useState<'list' | 'create'>('list');

  const handleUpdateVeicolo = (updated: VeicoloData) => {
    setVeicoli(prev => prev.map(v => v.id === updated.id ? updated : v));
  };

  const handleCreateVeicolo = (newVeicolo: VeicoloData) => {
    setVeicoli(prev => [newVeicolo, ...prev]);
    setView('list');
  };

  const handleDeleteVeicolo = (targetId: string) => {
    setVeicoli(prev => prev.filter(v => v.id !== targetId));
    navigate("/veicoli");
  };

  if (view === 'create') {
    return <NuovoVeicoloForm onSave={handleCreateVeicolo} onCancel={() => setView('list')} />;
  }

  if (id) {
    const currentVeicolo = veicoli.find(v => v.id === id);
    if (!currentVeicolo) {
      return (
        <div className="veicoli-error">
          <h3>Errore: Veicolo #{id} non trovato nella flotta.</h3>
          <button onClick={() => navigate("/veicoli")} className="btn-base">Torna all'elenco</button>
        </div>
      );
    }
    return (
      <VeicoliDetail 
        veicolo={currentVeicolo} 
        onSave={handleUpdateVeicolo} 
        onDelete={handleDeleteVeicolo}
        onBack={() => navigate("/veicoli")} 
      />
    );
  }

  return <VeicoliList veicoli={veicoli} onCreateOpen={() => setView('create')} />;
}