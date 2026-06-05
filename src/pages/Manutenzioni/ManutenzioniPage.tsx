import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ManutenzioneTicket, NuovaSegnalazionePayload } from "./types/manutenzioni";
import { INITIAL_TICKETS } from "./constants/manutenzioniMocks";
import ManutenzioniList from "./components/ManutenzioniList";
import ManutenzioniDetail from "./components/ManutenzioniDetail";
import "./ManutenzioniPage.scss";

export default function ManutenzioniPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<ManutenzioneTicket[]>(INITIAL_TICKETS);

  const handleUpdateTicket = (updatedTicket: ManutenzioneTicket) => {
    setTickets(prev => prev.map(t => t.veicoloId === updatedTicket.veicoloId ? updatedTicket : t));
  };

  const handleAddTicket = (newTicket: NuovaSegnalazionePayload) => {
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
          <button type="button" onClick={() => navigate("/manutenzioni")} className="btn-base">
            Torna alla lista
          </button>
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