import { useState } from "react";
import type { VeicoloData } from "./VeicoliPage";

interface FormProps {
  onSave: (newVeicolo: VeicoloData) => void;
  onCancel: () => void;
}

export default function NuovoVeicoloForm({ onSave, onCancel }: FormProps) {
  const [seriale, setSeriale] = useState("");
  const [tipo, setTipo] = useState<"Bici" | "Monopattino">("Bici");
  const [modello, setModello] = useState("Super73-RX");
  const [statoIniziale, setStatoIniziale] = useState<any>("In servizio");
  const [batteria, setBatteria] = useState(100);
  const [stazione, setStazione] = useState<any>("Piazza San Marco");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seriale) return;

    const nuovoVeicolo: VeicoloData = {
      id: seriale.toLowerCase().trim(),
      tipo,
      modello,
      stato: statoIniziale,
      stazione: stazione === "Piazza San Marco" ? "Stazione A" : "Parco",
      batteria: Number(batteria) || 100,
      prossimaManutenzione: "2025-09-01",
      noleggiTotali: 0,
      ultimaPosizione: `${stazione}, Pordenone`,
      distanzaTotale: "0 km",
      cicliRicarica: 0,
      ultimoNoleggio: "Nessuno - Nuovo Inserimento",
      durataUltimoNoleggio: "--",
      distanzaUltimoNoleggio: "--",
      noteIniziali: note
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
            <i className={`fa-solid ${tipo === "Bici" ? "fa-bicycle" : "fa-fa-wheelchair-move"}`}></i>
          </div>

          <div className="form-vertical-stack">
            <div className="form-group-field">
              <label className="info-label">Codice Veicolo (Seriale/Telaio)</label>
              <input type="text" placeholder="es. bk-882" value={seriale} onChange={(e) => setSeriale(e.target.value)} className="v-input-field" required />
              <span className="input-hint">Sistema ID (#bk-[Generato])</span>
            </div>

            <div className="form-group-field">
              <label className="info-label">Tipo</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value as any)} className="v-input-select">
                <option value="Bici">Bici Elettrica (SkyCity Comfort-E)</option>
                <option value="Monopattino">Monopattino Elettrico</option>
              </select>
            </div>

            <div className="form-group-field">
              <label className="info-label">Marca/Modello</label>
              <input type="text" value={modello} onChange={(e) => setModello(e.target.value)} className="v-input-field" />
            </div>

            <div className="form-group-field">
              <label className="info-label">Stato Iniziale</label>
              <select value={statoIniziale} onChange={(e) => setStatoIniziale(e.target.value)} className="v-input-select">
                <option value="In servizio">Pronto all'Uso</option>
                <option value="Inattivo">Inattivo / Deposito</option>
              </select>
            </div>

            <div className="form-group-field">
              <label className="info-label">Stato Batteria Iniziale (%)</label>
              <input type="number" max="100" min="0" value={batteria} onChange={(e) => setBatteria(Number(e.target.value))} className="v-input-field" />
            </div>
          </div>
        </div>

        <div className="detail-card v-card-split-spaced">
          <div>
            <div className="detail-card__title">DETTAGLI DI ASSEGNAZIONE E NOTE</div>
            
            <div className="form-vertical-stack">
              <div className="form-group-field">
                <label className="info-label">Stazione Iniziale Assegnata</label>
                <select value={stazione} onChange={(e) => setStazione(e.target.value as any)} className="v-input-select">
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
                <textarea placeholder="Inserisci eventuali note sul blocco o la spedizione..." value={note} onChange={(e) => setNote(e.target.value)} className="v-input-textarea v-textarea-large" />
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