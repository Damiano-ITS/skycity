import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ManutenzioniList from "./ManutenzioniList";
import ManutenzioniDetail from "./ManutenzioniDetail";
import "./ManutenzioniPage.scss";

export interface ManutenzioneTicket {
  id: string;
  veicoloId: string;
  tipoVeicolo: "Bici" | "Monopattino";
  modello: string;
  problema: string;
  stato: "Nuovo" | "In lavoro" | "Completata";
  priorita: "Alta" | "Media";
  orario: string;
  segnalatoDa: string;
  statoBatteria: string;
  prossimaManutenzione: string;
  noleggiTotali: number;
  descrizione: string;
  ricambi: string;
  tecnicoAssegnato: string;
}

const INITIAL_TICKETS: ManutenzioneTicket[] = [
  {
    id: "#INT-001",
    veicoloId: "bk-882",
    tipoVeicolo: "Bici",
    modello: "Super73-RX",
    problema: "Catena rotta",
    stato: "Nuovo",
    priorita: "Alta",
    orario: "2 min fa",
    segnalatoDa: "Sistema Automonitoraggio",
    statoBatteria: "12% (Critico)",
    prossimaManutenzione: "2025-06-15",
    noleggiTotali: 145,
    descrizione: "La catene è spezzata. Verificare possibili danni al tendicatena e alla trasmissione.",
    ricambi: "Catena compatibile, kit pulizia.",
    tecnicoAssegnato: "(non assegnato)"
  },
  {
    id: "#INT-002",
    veicoloId: "mk-1267",
    tipoVeicolo: "Monopattino",
    modello: "Xiaomi Pro 4",
    problema: "Freno malfunzionante",
    stato: "Nuovo",
    priorita: "Media",
    orario: "5 min fa",
    segnalatoDa: "Segnalazione Utente",
    statoBatteria: "68%",
    prossimaManutenzione: "2025-07-01",
    noleggiTotali: 312,
    descrizione: "Leva del freno sinistro lenta, lo spazio di frenata è raddoppiato.",
    ricambi: "Pastiglie freno, cavo d'acciaio.",
    tecnicoAssegnato: "(non assegnato)"
  },
  {
    id: "#INT-003",
    veicoloId: "bk-015",
    tipoVeicolo: "Bici",
    modello: "SkyCity Comfort-E",
    problema: "Fanale posteriore spento",
    stato: "In lavoro",
    priorita: "Media",
    orario: "16 min fa",
    segnalatoDa: "Controllo Manuale",
    statoBatteria: "92%",
    prossimaManutenzione: "2025-06-10",
    noleggiTotali: 88,
    descrizione: "Il led posteriore non si accende all'attivazione del veicolo.",
    ricambi: "Lampadina LED 12V.",
    tecnicoAssegnato: "Maria Bianchi"
  },
  {
    id: "#INT-004",
    veicoloId: "mk-1301",
    tipoVeicolo: "Monopattino",
    modello: "Ninebot G30 Max",
    problema: "Batteria scarica rapida",
    stato: "In lavoro",
    priorita: "Alta",
    orario: "30 min fa",
    segnalatoDa: "Sistema Automonitoraggio",
    statoBatteria: "5%",
    prossimaManutenzione: "2025-06-05",
    noleggiTotali: 540,
    descrizione: "Crollo di tensione anomalo sotto carico. Celle degradate.",
    ricambi: "Pacco batteria sostitutivo.",
    tecnicoAssegnato: "Luigi Rossi"
  }
];

export default function ManutenzioniPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<ManutenzioneTicket[]>(INITIAL_TICKETS);

  const handleUpdateTicket = (updatedTicket: ManutenzioneTicket) => {
    setTickets(prev => prev.map(t => t.veicoloId === updatedTicket.veicoloId ? updatedTicket : t));
  };

  const handleAddTicket = (newTicket: Omit<ManutenzioneTicket, "id" | "orario" | "tecnicoAssegnato" | "stato">) => {
    const nextId = `#INT-00${tickets.length + 1}`;
    const fullTicket: ManutenzioneTicket = {
      ...newTicket,
      id: nextId,
      stato: "Nuovo",
      orario: "Adesso",
      tecnicoAssegnato: "(non assegnato)"
    };
    setTickets(prev => [fullTicket, ...prev]);
  };

  if (id) {
    const currentTicket = tickets.find(t => t.veicoloId === id);
    if (!currentTicket) {
      return (
        <div className="manutenzioni-error">
          <h3>Errore: Veicolo #{id} non trovato in manutenzione.</h3>
          <button onClick={() => navigate("/manutenzioni")} className="btn-base">Torna alla lista</button>
        </div>
      );
    }
    return (
      <ManutenzioniDetail 
        ticket={currentTicket} 
        onSave={handleUpdateTicket} 
        onBack={() => navigate("/manutenzioni")} 
      />
    );
  }

  return <ManutenzioniList tickets={tickets} onAddTicket={handleAddTicket} />;
}