import { useState } from "react";
import type { VeicoloData, TipoVeicolo, StatoVeicolo } from "../types/veicoli";

interface FormProps {
  onSave: (newVeicolo: VeicoloData) => void;
  onCancel: () => void;
}

interface FormState {
  seriale: string;
  tipo: TipoVeicolo;
  modello: string;
  statoIniziale: StatoVeicolo;
  batteria: number;
  stazioneInput: "Piazza San Marco" | "Parco Galvani" | "Stazione FS";
  note: string;
}

export default function NuovoVeicoloForm({ onSave, onCancel }: FormProps) {
  const [formState, setFormState] = useState<FormState>({
    seriale: "",
    tipo: "Bici",
    modello: "Super73-RX",
    statoIniziale: "In servizio",
    batteria: 100,
    stazioneInput: "Piazza San Marco",
    note: ""
  });

  const handleInputChange = (field: keyof FormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.seriale.trim()) return;

    let hubAssegnato: "Stazione A" | "Stazione B" | "Parco" = "Stazione A";
    if (formState.stazioneInput === "Parco Galvani") hubAssegnato = "Parco";
    if (formState.stazioneInput === "Stazione FS") hubAssegnato = "Stazione B";

    const nuovoVeicolo: VeicoloData = {
      id: formState.seriale.toLowerCase().trim(),
      tipo: formState.tipo,
      modello: formState.modello,
      stato: formState.statoIniziale,
      stazione: hubAssegnato,
      batteria: Number(formState.batteria) || 100,
      prossimaManutenzione: "2025-09-01",
      noleggiTotali: 0,
      ultimaPosizione: `${formState.stazioneInput}, Pordenone`,
      distanzaTotale: "0 km",
      cicliRicarica: 0,
      ultimoNoleggio: "Nessuno - Nuovo Inserimento",
      durataUltimoNoleggio: "--",
      distanzaUltimoNoleggio: "--",
      noteIniziali: formState.note
    };

    onSave(nuovoVeicolo);
  };

  return (
    <div className="veicoli-create-page">
      <div className="detail-header">
        <h2>Crea Nuovo Veicolo</h2>
      </div>

      <form onSubmit={handleSubmit} className="detail-grid">
        <div className="detail-card">
          <div className="detail-card__title">DATI ANAGRAFICI VEICOLO</div>
          
          <div className="vehicle-icon-row">
            <i className={`fa-solid ${formState.tipo === "Bici" ? "fa-bicycle" : "fa-motorcycle"}`}></i>
          </div>

          <div className="form-vertical-stack">
            <div className="form-group-field">
              <label className="info-label">Codice Veicolo (Seriale/Telaio)</label>
              <input 
                type="text" 
                placeholder="es. bk-882" 
                value={formState.seriale} 
                onChange={(e) => handleInputChange("seriale", e.target.value)} 
                className="v-input-field" 
                required 
              />
              <span className="input-hint">Sistema ID (#bk-[Generato])</span>
            </div>

            <div className="form-group-field">
              <label className="info-label">Tipo</label>
              <select 
                value={formState.tipo} 
                onChange={(e) => handleInputChange("tipo", e.target.value as TipoVeicolo)} 
                className="v-input-select"
              >
                <option value="Bici">Bici Elettrica (SkyCity Comfort-E)</option>
                <option value="Monopattino">Monopattino Elettrico</option>
              </select>
            </div>

            <div className="form-group-field">
              <label className="info-label">Marca/Modello</label>
              <input 
                type="text" 
                value={formState.modello} 
                onChange={(e) => handleInputChange("modello", e.target.value)} 
                className="v-input-field" 
              />
            </div>

            <div className="form-group-field">
              <label className="info-label">Stato Iniziale</label>
              <select 
                value={formState.statoIniziale} 
                onChange={(e) => handleInputChange("statoIniziale", e.target.value as StatoVeicolo)} 
                className="v-input-select"
              >
                <option value="In servizio">Pronto all'Uso</option>
                <option value="Inattivo">Inattivo / Deposito</option>
              </select>
            </div>

            <div className="form-group-field">
              <label className="info-label">Stato Batteria Iniziale (%)</label>
              <input 
                type="number" 
                max="100" 
                min="0" 
                value={formState.batteria} 
                onChange={(e) => handleInputChange("batteria", Number(e.target.value))} 
                className="v-input-field" 
              />
            </div>
          </div>
        </div>

        <div className="detail-card v-card-split-spaced">
          <div>
            <div className="detail-card__title">DETTAGLI DI ASSEGNAZIONE E NOTE</div>
            
            <div className="form-vertical-stack">
              <div className="form-group-field">
                <label className="info-label">Stazione Iniziale Assegnata</label>
                <select 
                  value={formState.stazioneInput} 
                  onChange={(e) => handleInputChange("stazioneInput", e.target.value)} 
                  className="v-input-select"
                >
                  <option value="Piazza San Marco">Piazza San Marco</option>
                  <option value="Parco Galvani">Parco Galvani</option>
                  <option value="Stazione FS">Stazione FS</option>
                </select>
              </div>

              <div className="form-group-field">
                <label className="info-label">Data di Inserimento</label>
                <input type="text" value="31 Mag 2025" className="v-input-field v-input-disabled" disabled />
              </div>

              <div className="form-group-field">
                <label className="info-label">Creato da</label>
                <div className="font-semibold v-creator-name">Pier Paolo Pasolini</div>
              </div>

              <div className="form-group-field">
                <label className="info-label">Note Iniziali</label>
                <textarea 
                  placeholder="Inserisci eventuali note sul blocco o la spedizione..." 
                  value={formState.note} 
                  onChange={(e) => handleInputChange("note", e.target.value)} 
                  className="v-input-textarea v-textarea-large" 
                />
              </div>
            </div>
          </div>

          <div className="detail-card__actions v-actions-no-border">
            <button type="submit" className="btn-submit-green v-btn-fullwidth">Crea Veicolo</button>
          </div>
        </div>
      </form>

      <div className="detail-footer">
        <button type="button" onClick={onCancel} className="btn-back-link">
          Annulla e Torna alla Gestione Veicoli
        </button>
      </div>
    </div>
  );
}