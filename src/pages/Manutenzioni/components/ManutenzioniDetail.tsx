import { useState } from "react";
import type { ManutenzioneTicket } from "../types/manutenzioni";
import AssegnaTecnicoModal from "./AssegnaTecnicoModal";

interface ManutenzioniDetailProps {
  ticket: ManutenzioneTicket;
  onSave: (ticket: ManutenzioneTicket) => void;
  onBack: () => void;
}

export default function ManutenzioniDetail({ ticket, onSave, onBack }: ManutenzioniDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTecnicoModalOpen, setIsTecnicoModalOpen] = useState(false);

  const [formState, setFormState] = useState({
    stato: ticket.stato,
    priorita: ticket.priorita,
    problema: ticket.problema,
    descrizione: ticket.descrizione,
    ricambi: ticket.ricambi,
  });

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveModifiche = () => {
    onSave({
      ...ticket,
      ...formState
    });
    setIsEditing(false);
  };

  const handleAnnulla = () => {
    setFormState({
      stato: ticket.stato,
      priorita: ticket.priorita,
      problema: ticket.problema,
      descrizione: ticket.descrizione,
      ricambi: ticket.ricambi,
    });
    setIsEditing(false);
  };

  return (
    <div className="manutenzioni-detail-page">
      <div className="detail-header">
        <h2>Dettagli Veicolo e Intervento - {ticket.tipoVeicolo} #{ticket.veicoloId}</h2>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card__title">SCHEDA VEICOLO: {ticket.tipoVeicolo} #{ticket.veicoloId}</div>
          
          <div className="vehicle-icon-row">
            <i className={`fa-solid ${ticket.tipoVeicolo === "Bici" ? "fa-bicycle" : "fa-kick-scooter"}`}></i>
          </div>

          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Tipo</span>
              <span className="info-value">{ticket.tipoVeicolo} Elettrica (SkyCity Comfort-E)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Marca/Modello</span>
              <span className={isEditing ? "info-value-text" : "info-value"}>{ticket.modello}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Stato Attuale</span>
              {isEditing ? (
                <select 
                  value={formState.stato} 
                  onChange={(e) => handleInputChange("stato", e.target.value as any)} 
                  className="m-input-select"
                >
                  <option value="Nuovo">Nuovo (In attesa)</option>
                  <option value="In lavoro">Fuori Servizio (Manutenzione)</option>
                  <option value="Completata">Attivo (Completata)</option>
                </select>
              ) : (
                <span className="info-value">
                  {ticket.stato === "Completata" ? "Attivo (Completata)" : "Fuori Servizio (Manutenzione)"}
                </span>
              )}
            </div>
            {!isEditing && (
              <div className="info-row">
                <span className="info-label">Stato Batteria</span>
                <span className="info-value color-danger">
                  {ticket.statoBatteria} <i className="fa-solid fa-battery-quarter"></i>
                </span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">Prossima Manutenzione Programmata</span>
              <span className="info-value">
                {isEditing ? <input type="date" defaultValue={ticket.prossimaManutenzione} className="m-input-field" /> : "15 Giu 2025"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Numero di Noleggi</span>
              <span className="info-value">{ticket.noleggiTotali} (Total)</span>
            </div>
          </div>

          <div className="mock-map">
            <div className="mock-map__placeholder">
              <div className="mock-map__pin">
                <i className="fa-solid fa-location-dot"></i>
                <span>{ticket.veicoloId}</span>
              </div>
              <div className="mock-map__label">Piazza San Marco - Pordenone</div>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card__title">SCHEDA INTERVENTO: {ticket.id}</div>
          
          <div className="detail-card__priority">
            <span className={`m-badge m-badge--priority-${formState.priorita.toLowerCase()}`}>{formState.priorita}</span>
          </div>

          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Tipo Problema</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formState.problema} 
                  onChange={(e) => handleInputChange("problema", e.target.value)} 
                  className="m-input-field" 
                />
              ) : (
                <span className="info-value">{ticket.problema}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Segnalato da</span>
              <span className="info-value">{ticket.segnalatoDa}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Orario Segnalazione</span>
              <span className="info-value">30 Mag 2025 - 10:30</span>
            </div>
            <div className="info-row">
              <span className="info-label">Priorità</span>
              {isEditing ? (
                <select 
                  value={formState.priorita} 
                  onChange={(e) => handleInputChange("priorita", e.target.value as any)} 
                  className="m-input-select"
                >
                  <option value="Alta">ALTA</option>
                  <option value="Media">MEDIA</option>
                </select>
              ) : (
                <span className="info-value">{ticket.priorita}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Tecnico Assegnato</span>
              <span className="info-value font-bold">{ticket.tecnicoAssegnato}</span>
            </div>
          </div>

          <div className="description-block">
            <label className="info-label">Descrizione</label>
            {isEditing ? (
              <textarea 
                value={formState.descrizione} 
                onChange={(e) => handleInputChange("descrizione", e.target.value)} 
                className="m-input-textarea" 
              />
            ) : (
              <p className="description-p">{ticket.descrizione}</p>
            )}
          </div>

          <div className="description-block">
            <label className="info-label">Ricambi Necessari</label>
            {isEditing ? (
              <input 
                type="text" 
                value={formState.ricambi} 
                onChange={(e) => handleInputChange("ricambi", e.target.value)} 
                className="m-input-field" 
              />
            ) : (
              <p className="description-p">{ticket.ricambi}</p>
            )}
          </div>

          <div className="detail-card__actions">
            {isEditing ? (
              <>
                <button type="button" className="btn-submit-green" onClick={handleSaveModifiche}>Salva Modifiche</button>
                <button type="button" className="btn-cancel" onClick={handleAnnulla}>Annulla</button>
              </>
            ) : (
              <>
                <button type="button" className="btn-submit-green" onClick={() => setIsEditing(true)}>Modifica</button>
                {ticket.stato !== "Completata" && (
                  <button type="button" className="btn-primary" onClick={() => setIsTecnicoModalOpen(true)}>
                    {ticket.tecnicoAssegnato === "(non assegnato)" ? "Assegna Tecnico" : "Cambia Tecnico"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <button type="button" onClick={onBack} className="btn-back-link">
          <i className="fa-solid fa-chevron-left"></i> Torna alla Lista Interventi
        </button>
      </div>

      {isTecnicoModalOpen && (
        <AssegnaTecnicoModal 
          ticket={ticket}
          onClose={() => setIsTecnicoModalOpen(false)}
          onConfirm={(tecnico) => {
            onSave({ ...ticket, tecnicoAssegnato: tecnico.nome, stato: "In lavoro" });
            setIsTecnicoModalOpen(false);
          }}
        />
      )}
    </div>
  );
}