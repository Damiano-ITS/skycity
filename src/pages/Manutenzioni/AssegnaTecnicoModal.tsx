import { useState } from "react";
import type { ManutenzioneTicket } from "./ManutenzioniPage";

interface Tecnico {
  id: string;
  nome: string;
  stato: "Disponibile" | "Occupato" | "Non Disponibile";
  specializzazione: "Meccanica" | "Elettronica" | "Software";
  voto: number;
  notaStato?: string;
}

interface TecnicoProps {
  ticket: ManutenzioneTicket;
  onClose: () => void;
  onConfirm: (nome: string) => void;
}

const HARDCODED_TECNICI: Tecnico[] = [
  { id: "LR01", nome: "Luigi Rossi", stato: "Disponibile", specializzazione: "Meccanica", voto: 4.8 },
  { id: "MB02", nome: "Maria Bianchi", stato: "Disponibile", specializzazione: "Elettronica", voto: 4.9 },
  { id: "PV03", nome: "Pietro Verde", stato: "Occupato", specializzazione: "Meccanica", voto: 4.7, notaStato: "Fino alle 12:30" },
  { id: "AG04", nome: "Anna Gialli", stato: "Non Disponibile", specializzazione: "Software", voto: 4.6, notaStato: "In ferie" },
];

export default function AssegnaTecnicoModal({ ticket, onClose, onConfirm }: TecnicoProps) {
  const [search, setSearch] = useState("");
  const [selectedTecnico, setSelectedTecnico] = useState<Tecnico | null>(null);

  const filtered = HARDCODED_TECNICI.filter(t => 
    t.nome.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="m-modal-overlay">
      <div className="m-modal m-modal--large">
        <div className="m-modal__header">
          <h3>ASSEGNA TECNICO - {ticket.id}</h3>
        </div>

        <div className="m-modal__body">
          <div className="riepilogo-box">
            <h4>Riepilogo Intervento: {ticket.id}</h4>
            <p>
              <i className={`fa-solid ${ticket.tipoVeicolo === "Bici" ? "fa-bicycle" : "fa-kick-scooter"}`}></i> 
              Veicolo: {ticket.tipoVeicolo} {ticket.veicoloId} ({ticket.problema}, Priorità: <span className="text-danger-bold">{ticket.priorita.toUpperCase()}</span>)
            </p>
          </div>

          <div className="search-bar-modal">
            <input 
              type="text" 
              placeholder="Cerca tecnico per nome o ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div className="filters-mock-label">
            Stato: <strong>Tutti / Solo Disponibili</strong> | Specializzazione: <strong>Tutti / Meccanica / Elettronica</strong>
          </div>

          <div className="tecnici-grid">
            {filtered.map(t => (
              <div 
                key={t.id} 
                className={`tecnico-card ${selectedTecnico?.id === t.id ? "tecnico-card--selected" : ""}`}
              >
                <div className="tecnico-card__avatar">
                  <i className="fa-solid fa-camera"></i>
                  <span>Foto</span>
                </div>
                <div className="tecnico-card__info">
                  <div className="tecnico-card__name-row">
                    <strong>{t.nome}</strong>
                    <span className="tecnico-id-badge">{t.id}</span>
                  </div>
                  <div className="tecnico-card__status">
                    <span className={`status-dot status-dot--${t.stato.toLowerCase().replace(" ", "")}`}></span>
                    Stato: {t.stato} {t.notaStato && `• ${t.notaStato}`}
                  </div>
                  <div className="tecnico-card__spec">Specializzazione: {t.specializzazione}</div>
                  <div className="tecnico-card__rating">
                    {t.voto} <i className="fa-solid fa-star"></i>
                  </div>
                  <button 
                    className={`btn-select-tecnico ${selectedTecnico?.id === t.id ? "btn-select-tecnico--active" : ""}`}
                    disabled={t.stato === "Non Disponibile"}
                    onClick={() => setSelectedTecnico(t)}
                  >
                    {selectedTecnico?.id === t.id ? "Selezionato" : "Seleziona"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="assignment-details">
            <label>Dettagli Assegnazione {selectedTecnico ? `per [${selectedTecnico.nome}]` : ""}:</label>
            <div className="time-row">
              Orario di Inizio Previsto: <span className="mock-time-input"><i className="fa-regular fa-calendar"></i> Oggi - 11:00</span>
            </div>
            <textarea 
              placeholder="Note opzionali per il tecnico..." 
              className="m-input-textarea assignment-details__textarea"
            ></textarea>
          </div>
        </div>

        <div className="m-modal__footer">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button 
            className="btn-submit-green" 
            disabled={!selectedTecnico}
            onClick={() => selectedTecnico && onConfirm(selectedTecnico.nome)}
          >
            Conferma Assegnazione
          </button>
        </div>
      </div>
    </div>
  );
}