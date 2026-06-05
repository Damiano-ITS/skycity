import React, { useState } from "react";
import type { NuovaSegnalazionePayload } from "../types/manutenzioni";

interface NuovaSegnalazioneModalProps {
  onClose: () => void;
  onSave: (data: NuovaSegnalazionePayload) => void;
}

export default function NuovaSegnalazioneModal({ onClose, onSave }: NuovaSegnalazioneModalProps) {
  const [veicoloId, setVeicoloId] = useState("");
  const [tipoVeicolo, setTipoVeicolo] = useState<"Bici" | "Monopattino">("Bici");
  const [problema, setProblema] = useState("");
  const [priorita, setPriorita] = useState<"Alta" | "Media">("Media");
  const [descrizione, setDescrizione] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!veicoloId || !problema) return;

    onSave({
      veicoloId,
      tipoVeicolo,
      modello: tipoVeicolo === "Bici" ? "Super73-RX" : "Ninebot G30 Max",
      problema,
      priorita,
      descrizione,
      segnalatoDa: "Manuale Operatore",
      statoBatteria: "100%",
      prossimaManutenzione: "2025-08-01",
      noleggiTotali: 0,
      ricambi: "Nessuno inserito"
    });
  };

  return (
    <div className="m-modal-overlay">
      <div className="m-modal">
        <div className="m-modal__header">
          <h3>Nuova Segnalazione Guasto</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-modal__body m-modal__body--form">
            <div>
              <label className="info-label">ID Veicolo</label>
              <input 
                type="text" 
                placeholder="es. bk-999" 
                value={veicoloId} 
                onChange={e => setVeicoloId(e.target.value)} 
                className="m-input-field" 
                required 
              />
            </div>
            <div>
              <label className="info-label">Tipo Veicolo</label>
              <select 
                value={tipoVeicolo} 
                onChange={e => setTipoVeicolo(e.target.value as any)} 
                className="m-input-select"
              >
                <option value="Bici">Bici Elettrica</option>
                <option value="Monopattino">Monopattino Elettrico</option>
              </select>
            </div>
            <div>
              <label className="info-label">Guasto / Problema</label>
              <input 
                type="text" 
                placeholder="Descrivi brevemente il problema" 
                value={problema} 
                onChange={e => setProblema(e.target.value)} 
                className="m-input-field" 
                required 
              />
            </div>
            <div>
              <label className="info-label">Priorità</label>
              <select 
                value={priorita} 
                onChange={e => setPriorita(e.target.value as any)} 
                className="m-input-select"
              >
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div>
              <label className="info-label">Note / Descrizione Completa</label>
              <textarea 
                placeholder="Inserisci note aggiuntive..." 
                value={descrizione} 
                onChange={e => setDescrizione(e.target.value)} 
                className="m-input-textarea" 
              />
            </div>
          </div>
          <div className="m-modal__footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Annulla</button>
            <button type="submit" className="btn-submit-green">Crea Segnalazione</button>
          </div>
        </form>
      </div>
    </div>
  );
}