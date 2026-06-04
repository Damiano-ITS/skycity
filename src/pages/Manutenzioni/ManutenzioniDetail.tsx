import { useState } from "react";
import type { ManutenzioneTicket } from "./ManutenzioniPage";
import AssegnaTecnicoModal from "./AssegnaTecnicoModal";

interface DetailProps {
  ticket: ManutenzioneTicket;
  onSave: (ticket: ManutenzioneTicket) => void;
  onBack: () => void;
}

export default function ManutenzioniDetail({ ticket, onSave, onBack }: DetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTecnicoModalOpen, setIsTecnicoModalOpen] = useState(false);

  const [statoAttuale, setStatoAttuale] = useState(ticket.stato);
  const [priorita, setPriorita] = useState(ticket.priorita);
  const [problema, setProblema] = useState(ticket.problema);
  const [descrizione, setDescrizione] = useState(ticket.descrizione);
  const [ricambi, setRicambi] = useState(ticket.ricambi);

  const handleSaveModifiche = () => {
    onSave({
      ...ticket,
      stato: statoAttuale,
      priorita: priorita,
      problema: problema,
      descrizione: descrizione,
      ricambi: ricambi
    });
    setIsEditing(false);
  };

  const handleAnnulla = () => {
    setStatoAttuale(ticket.stato);
    setPriorita(ticket.priorita);
    setProblema(ticket.problema);
    setDescrizione(ticket.descrizione);
    setRicambi(ticket.ricambi);
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
              {isEditing ? (
                <span className="info-value-text">{ticket.modello}</span>
              ) : (
                <span className="info-value">{ticket.modello}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Stato Attuale</span>
              {isEditing ? (
                <select value={statoAttuale} onChange={(e) => setStatoAttuale(e.target.value as any)} className="m-input-select">
                  <option value="Nuovo">Nuovo (In attesa)</option>
                  <option value="In lavoro">Fuori Servizio (Manutenzione)</option>
                  <option value="Completata">Attivo (Completata)</option>
                </select>
              ) : (
                <span className="info-value">Fuori Servizio (Manutenzione)</span>
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
            <span className={`m-badge m-badge--priority-${priorita.toLowerCase()}`}>{priorita}</span>
          </div>

          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Tipo Problema</span>
              {isEditing ? (
                <input type="text" value={problema} onChange={(e) => setProblema(e.target.value)} className="m-input-field" />
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
                <select value={priorita} onChange={(e) => setPriorita(e.target.value as any)} className="m-input-select">
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
              <textarea value={descrizione} onChange={(e) => setDescrizione(e.target.value)} className="m-input-textarea" />
            ) : (
              <p className="description-p">{ticket.descrizione}</p>
            )}
          </div>

          <div className="description-block">
            <label className="info-label">Ricambi Necessari</label>
            {isEditing ? (
              <input type="text" value={ricambi} onChange={(e) => setRicambi(e.target.value)} className="m-input-field" />
            ) : (
              <p className="description-p">{ticket.ricambi}</p>
            )}
          </div>

          <div className="detail-card__actions">
            {isEditing ? (
              <>
                <button className="btn-submit-green" onClick={handleSaveModifiche}>Salva Modifiche</button>
                <button className="btn-cancel" onClick={handleAnnulla}>Annulla</button>
              </>
            ) : (
              <>
                <button className="btn-submit-green" onClick={() => setIsEditing(true)}>Modifica</button>
                {ticket.tecnicoAssegnato === "(non assegnato)" && (
                  <button className="btn-primary" onClick={() => setIsTecnicoModalOpen(true)}>Assegna Tecnico</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <button onClick={onBack} className="btn-back-link">
          <i className="fa-solid fa-chevron-left"></i> Torna alla Lista Interventi
        </button>
      </div>

      {isTecnicoModalOpen && (
        <AssegnaTecnicoModal 
          ticket={ticket}
          onClose={() => setIsTecnicoModalOpen(false)}
          onConfirm={(nomeTecnico) => {
            onSave({ ...ticket, tecnicoAssegnato: nomeTecnico, stato: "In lavoro" });
            setIsTecnicoModalOpen(false);
          }}
        />
      )}
    </div>
  );
}