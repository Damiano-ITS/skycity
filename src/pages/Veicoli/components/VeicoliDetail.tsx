import { useState } from "react";
import type { VeicoloData, StatoVeicolo } from "../types/veicoli";
import RadiazioneVeicoloModal from "./RadiazioneVeicoloModal";

interface DetailProps {
  veicolo: VeicoloData;
  onSave: (updated: VeicoloData) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

interface EditState {
  stato: StatoVeicolo;
  batteria: number;
  prossimaManutenzione: string;
  ultimaPosizione: string;
  distanzaTotale: string;
  cicliRicarica: number;
  noteIniziali: string;
}

export default function VeicoliDetail({ veicolo, onSave, onDelete, onBack }: DetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const getInitialEditState = (v: VeicoloData): EditState => ({
    stato: v.stato,
    batteria: v.batteria,
    prossimaManutenzione: v.prossimaManutenzione,
    ultimaPosizione: v.ultimaPosizione,
    distanzaTotale: v.distanzaTotale,
    cicliRicarica: v.cicliRicarica,
    noteIniziali: v.noteIniziali || ""
  });

  const [editState, setEditState] = useState<EditState>(getInitialEditState(veicolo));

  const handleFieldChange = (field: keyof EditState, value: any) => {
    setEditState(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...veicolo,
      stato: editState.stato,
      batteria: Number(editState.batteria),
      prossimaManutenzione: editState.prossimaManutenzione,
      ultimaPosizione: editState.ultimaPosizione,
      distanzaTotale: editState.distanzaTotale,
      cicliRicarica: Number(editState.cicliRicarica),
      noteIniziali: editState.noteIniziali
    });
    setIsEditing(false);
  };

  const handleAnnulla = () => {
    setEditState(getInitialEditState(veicolo));
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
                <select 
                  value={editState.stato} 
                  onChange={(e) => handleFieldChange("stato", e.target.value as StatoVeicolo)} 
                  className="v-input-select"
                >
                  <option value="In servizio">In servizio</option>
                  <option value="In manutenzione">In manutenzione</option>
                  <option value="Inattivo">Inattivo</option>
                  <option value="Guasto">Guasto</option>
                </select>
              ) : (
                <span className={`v-badge v-badge--status-${veicolo.stato.toLowerCase().replace(" ", "")}`}>{veicolo.stato}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Stato Batteria</span>
              {isEditing ? (
                <input 
                  type="number" 
                  value={editState.batteria} 
                  onChange={(e) => handleFieldChange("batteria", Number(e.target.value))} 
                  className="v-input-field v-input-short" 
                />
              ) : (
                <span className={`info-value ${veicolo.batteria <= 20 ? 'text-muted font-bold' : ''}`}>
                  {veicolo.batteria}% {veicolo.batteria <= 20 ? '(Critico)' : ''}
                </span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Prossima Manutenzione Programmata</span>
              {isEditing ? (
                <input 
                  type="date" 
                  value={editState.prossimaManutenzione} 
                  onChange={(e) => handleFieldChange("prossimaManutenzione", e.target.value)} 
                  className="v-input-field" 
                />
              ) : (
                <span className="info-value">{veicolo.prossimaManutenzione}</span>
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
              <div className="mock-map__label">{editState.ultimaPosizione}</div>
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
                <input 
                  type="text" 
                  value={editState.ultimaPosizione} 
                  onChange={(e) => handleFieldChange("ultimaPosizione", e.target.value)} 
                  className="v-input-field" 
                />
              ) : (
                <span className="info-value">{veicolo.ultimaPosizione}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Distanza Totale Percorsa (km)</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editState.distanzaTotale} 
                  onChange={(e) => handleFieldChange("distanzaTotale", e.target.value)} 
                  className="v-input-field" 
                />
              ) : (
                <span className="info-value">{veicolo.distanzaTotale}</span>
              )}
            </div>
            <div className="info-row">
              <span className="info-label">Salute Batteria (%)</span>
              <span className="info-value">88%</span>
            </div>
            <div className="info-row">
              <span className="info-label">Cicli di Ricarica Totali</span>
              {isEditing ? (
                <input 
                  type="number" 
                  value={editState.cicliRicarica} 
                  onChange={(e) => handleFieldChange("cicliRicarica", Number(e.target.value))} 
                  className="v-input-field" 
                />
              ) : (
                <span className="info-value">{veicolo.cicliRicarica}</span>
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
              <textarea 
                value={editState.noteIniziali} 
                onChange={(e) => handleFieldChange("noteIniziali", e.target.value)} 
                className="v-input-textarea" 
              />
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
        <RadiazioneVeicoloModal 
          veicolo={veicolo} 
          onConfirm={() => onDelete(veicolo.id)} 
          onClose={() => setShowConfirmModal(false)} 
        />
      )}
    </div>
  );
}