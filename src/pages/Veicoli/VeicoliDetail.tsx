import { useState } from "react";
import type { VeicoloData } from "./VeicoliPage";

interface DetailProps {
  veicolo: VeicoloData;
  onSave: (updated: VeicoloData) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export default function VeicoliDetail({ veicolo, onSave, onDelete, onBack }: DetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [stato, setStato] = useState(veicolo.stato);
  const [batteria, setBatteria] = useState(veicolo.batteria);
  const [prossimaManutenzione, setProssimaManutenzione] = useState(veicolo.prossimaManutenzione);
  const [ultimaPosizione, setUltimaPosizione] = useState(veicolo.ultimaPosizione);
  const [distanzaTotale, setDistanzaTotale] = useState(veicolo.distanzaTotale);
  const [cicliRicarica, setCicliRicarica] = useState(veicolo.cicliRicarica);
  const [noteIniziali, setNoteIniziali] = useState(veicolo.noteIniziali || "");

  const handleSave = () => {
    onSave({
      ...veicolo,
      stato,
      batteria: Number(batteria),
      prossimaManutenzione,
      ultimaPosizione,
      distanzaTotale,
      cicliRicarica: Number(cicliRicarica),
      noteIniziali
    });
    setIsEditing(false);
  };

  const handleAnnulla = () => {
    setStato(veicolo.stato);
    setBatteria(veicolo.batteria);
    setProssimaManutenzione(veicolo.prossimaManutenzione);
    setUltimaPosizione(veicolo.ultimaPosizione);
    setDistanzaTotale(veicolo.distanzaTotale);
    setCicliRicarica(veicolo.cicliRicarica);
    setNoteIniziali(veicolo.noteIniziali || "");
    setIsEditing(false);
  };

  return (
    <div className="veicoli-detail-page">
      <div className="detail-header">
        <h2>Dettagli Veicolo - {veicolo.tipo} #{veicolo.id}</h2>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card__title">SCHEDA VEICOLO: {veicolo.tipo} #{veicolo.id}</div>
          
          <div className="vehicle-icon-row">
            <i className={`fa-solid ${veicolo.tipo === "Bici" ? "fa-bicycle" : "fa-motorcycle"}`}></i>
          </div>

          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Tipo</span>
              <span className="info-value">{veicolo.tipo} Elettrica</span>
            </div>
            <div className="info-row">
              <span className="info-label">Marca/Modello</span>
              <span className="info-value">{veicolo.modello}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Stato Attuale</span>
              {isEditing ? (
                <select value={stato} onChange={(e) => setStato(e.target.value as any)} className="v-input-select">
                  <option value="In servizio">In servizio</option>
                  <option value="In manutenzione">In manutenzione</option>
                  <option value="Inattivo">Inattivo</option>
                  <option value="Guasto">Guasto</option>
                </select>
              ) : (
                <span className={`v-badge v-badge--status-${stato.toLowerCase().replace(" ", "")}`}>{stato}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Stato Batteria</span>
              {isEditing ? (
                <input type="number" value={batteria} onChange={(e) => setBatteria(Number(e.target.value))} className="v-input-field v-input-short" />
              ) : (
                <span className={`info-value ${batteria <= 20 ? 'text-muted font-bold' : ''}`}>
                  {batteria}% {batteria <= 20 ? '(Critico)' : ''}
                </span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Prossima Manutenzione Programmata</span>
              {isEditing ? (
                <input type="date" value={prossimaManutenzione} onChange={(e) => setProssimaManutenzione(e.target.value)} className="v-input-field" />
              ) : (
                <span className="info-value">{prossimaManutenzione}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Numero di Noleggi</span>
              <span className="info-value">{veicolo.noleggiTotali} (Total)</span>
            </div>
          </div>

          <div className="mock-map">
            <div className="mock-map__placeholder">
              <div className="mock-map__pin">
                <i className="fa-solid fa-location-dot"></i>
                <span>{veicolo.id}</span>
              </div>
              <div className="mock-map__label">{ultimaPosizione}</div>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card__title">INFO OPERATIVE AGGIUNTIVE E STORICO</div>
          
          <div className="info-section-title">Posizione &amp; Salute</div>
          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Ultima Posizione Registrata</span>
              {isEditing ? (
                <input type="text" value={ultimaPosizione} onChange={(e) => setUltimaPosizione(e.target.value)} className="v-input-field" />
              ) : (
                <span className="info-value">{ultimaPosizione}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Distanza Totale Percorsa (km)</span>
              {isEditing ? (
                <input type="text" value={distanzaTotale} onChange={(e) => setDistanzaTotale(e.target.value)} className="v-input-field" />
              ) : (
                <span className="info-value">{distanzaTotale}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Salute Batteria (%)</span>
              <span className="info-value">88%</span>
            </div>
            <div className="info-row">
              <span className="info-label">Cicli di Ricarica Totali</span>
              {isEditing ? (
                <input type="number" value={cicliRicarica} onChange={(e) => setCicliRicarica(Number(e.target.value))} className="v-input-field" />
              ) : (
                <span className="info-value">{cicliRicarica}</span>
              )}
            </div>
          </div>

          <div className="info-section-title v-section-spaced">Noleggio</div>
          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Ultimo Noleggio</span>
              <span className="info-value">{veicolo.ultimoNoleggio}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Durata Ultimo Noleggio</span>
              <span className="info-value">{veicolo.durataUltimoNoleggio}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Distanza Ultimo Noleggio (km)</span>
              <span className="info-value">{veicolo.distanzaUltimoNoleggio}</span>
            </div>
          </div>

          {isEditing && (
            <div className="description-block v-block-spaced">
              <label className="info-label">Note Interne Operatore</label>
              <textarea value={noteIniziali} onChange={(e) => setNoteIniziali(e.target.value)} className="v-input-textarea" />
            </div>
          )}

          <div className="detail-card__actions">
            {isEditing ? (
              <>
                <button className="btn-submit-green" onClick={handleSave}>Salva Modifiche</button>
                <button className="btn-cancel" onClick={handleAnnulla}>Annulla</button>
              </>
            ) : (
              <>
                <button className="btn-submit-green" onClick={() => setIsEditing(true)}>Modifica</button>
                <button className="btn-delete-trigger" onClick={() => setShowConfirmModal(true)}>
                  Elimina Veicolo
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <button onClick={onBack} className="btn-back-link">
          <i className="fa-solid fa-chevron-left"></i> Torna all'Elenco Veicoli
        </button>
      </div>

      {showConfirmModal && (
        <div className="shared-modal-overlay">
          <div className="shared-modal-card">
            <div className="shared-modal-header">
              <i className="fa-solid fa-triangle-exclamation shared-modal-icon-alert"></i>
              <h3>Rimozione Veicolo dalla Flotta</h3>
            </div>
            <div className="shared-modal-body">
              <p>Sei sicuro di voler radiare permanentemente il veicolo <strong>{veicolo.modello}</strong> con ID flotta <strong>{veicolo.id}</strong>?</p>
              <div className="shared-modal-alert-box">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>
                  <strong>ALERT OPERATIVO:</strong> Il mezzo risulterà rimosso dalla mappa di monitoraggio e lo slot presso l'hub <strong>{veicolo.stazione}</strong> verrà liberato automaticamente.
                </span>
              </div>
            </div>
            <div className="shared-modal-footer">
              <button className="btn-modal-confirm" onClick={() => onDelete(veicolo.id)}>
                Conferma Radiazione
              </button>
              <button className="btn-cancel" onClick={() => setShowConfirmModal(false)}>
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}