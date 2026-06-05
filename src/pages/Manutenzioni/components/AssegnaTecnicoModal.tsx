import { useState } from "react";
import type { ManutenzioneTicket, Tecnico } from "../types/manutenzioni";
import { HARDCODED_TECNICI } from "../constants/manutenzioniMocks";

interface AssegnaTecnicoModalProps {
  ticket: ManutenzioneTicket;
  onClose: () => void;
  onConfirm: (tecnico: Tecnico) => void;
}

export default function AssegnaTecnicoModal({ ticket, onClose, onConfirm }: AssegnaTecnicoModalProps) {
  const [search, setSearch] = useState("");
  const [selectedTecnico, setSelectedTecnico] = useState<Tecnico | null>(null);

  const filteredTecnici = HARDCODED_TECNICI.filter(t => 
    t.nome.toLowerCase().includes(search.toLowerCase()) || 
    t.id.toLowerCase().includes(search.toLowerCase())
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
              {" "}Veicolo: {ticket.tipoVeicolo} {ticket.veicoloId} ({ticket.problema}, Priorità: <span className="text-danger-bold">{ticket.priorita.toUpperCase()}</span>)
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
            {filteredTecnici.map(t => (
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
                    type="button"
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
            />
          </div>
        </div>

        <div className="m-modal__footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Annulla</button>
          <button 
            type="button"
            className="btn-submit-green" 
            disabled={!selectedTecnico}
            onClick={() => selectedTecnico && onConfirm(selectedTecnico)}
          >
            Conferma Assegnazione
          </button>
        </div>
      </div>
    </div>
  );
}