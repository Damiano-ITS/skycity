import { useState } from "react";
import type { StazioneData } from "./StazioniPage";

interface FormProps {
  stazioni: StazioneData[];
  onSave: (newStazione: StazioneData) => void;
  onCancel: () => void;
}

export default function NuovaStazioneForm({ stazioni, onSave, onCancel }: FormProps) {
  const [codice, setCodice] = useState("");
  const [nome, setNome] = useState("Piazza San Marco");
  const [tipo, setTipo] = useState("Stazione Dock Bici");
  const [modello, setModello] = useState("EcoDock-Pro");
  const [statoIniziale, setStatoIniziale] = useState<any>("Online");
  const [capacita, setCapacita] = useState(30);
  const [indirizzo, setIndirizzo] = useState("Via San Marco, 12");
  
  const [errore, setErrore] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codice) return;

    const nuovoId = `#stz-${codice.replace("#", "").trim()}`;
    const nomeNormalizzato = nome.trim().toLowerCase();

    const idDuplicato = stazioni.some(s => s.id === nuovoId);
    if (idDuplicato) {
      setErrore(`Errore: Il codice stazione "${codice}" è già in uso.`);
      return;
    }

    const nomeDuplicato = stazioni.some(s => s.nome.trim().toLowerCase() === nomeNormalizzato);
    if (nomeDuplicato) {
      setErrore(`Errore: Il nome "${nome}" è già stato assegnato a un'altra stazione.`);
      return;
    }

    setErrore("");

    const nuova: StazioneData = {
      id: nuovoId,
      nome: nome.trim(),
      stato: statoIniziale === "Attiva" ? "Online" : statoIniziale,
      capacita: Number(capacita) || 30,
      biciPresenti: 0,
      monopattiniPresenti: 0,
      tipo,
      modelloTotem: modello,
      statoSlotLiberi: `0 / ${capacita}`,
      prossimaManutenzione: "Nessuna programmata",
      totaleTransazioni: 0,
      coordinatGPS: "45.9500, 12.6600",
      totaleGiorniOperativi: 1,
      integritaDocks: 100,
      utilizzoRicariche: 0,
      conteggioAnomalie: 0,
      indirizzo
    };

    onSave(nuova);
  };

  return (
    <form onSubmit={handleCreate} className="stazioni-create-page">
      <h2>Crea Nuova Stazione</h2>
      
      <div className="s-layout-split">
        <div className="s-detail-card">
          <div className="s-card-title">DATI ANAGRAFICI STAZIONE</div>
          
          <div className="form-vertical-inputs">
            <div className="i-group">
              <label>Codice Stazione (ID Seriale)</label>
              <input type="text" placeholder="es. 006" value={codice} onChange={(e) => setCodice(e.target.value)} className="s-field-input" required />
            </div>

            <div className="i-group">
              <label>Nome Area / Stazione</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="s-field-input" required />
            </div>

            <div className="i-group">
              <label>Tipo Architettura</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="s-field-select">
                <option value="Stazione Dock Bici">Stazione Dock Bici</option>
                <option value="Punto Ricarica Monopattini">Punto Ricarica Monopattini</option>
                <option value="Area Parcheggio Libera">Area Parcheggio Libera</option>
              </select>
            </div>

            <div className="i-group">
              <label>Modello Docks Hub</label>
              <select value={modello} onChange={(e) => setModello(e.target.value)} className="s-field-select">
                <option value="EcoDock-Pro">EcoDock-Pro</option>
                <option value="ChargePoint-STZ">ChargePoint-STZ</option>
              </select>
            </div>

            <div className="i-group">
              <label>Stato di Attivazione</label>
              <select value={statoIniziale} onChange={(e) => setStatoIniziale(e.target.value as any)} className="s-field-select">
                <option value="Online">Online</option>
                <option value="Chiusa">Inattiva</option>
              </select>
            </div>
          </div>
        </div>

        <div className="s-detail-card">
          <div className="s-card-title">LOCALIZZAZIONE E CONFIGURAZIONE</div>
          
          <div className="form-vertical-inputs">
            <div className="i-group">
              <label>Indirizzo Stradale</label>
              <select value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} className="s-field-select">
                <option value="Via San Marco, 12">Via San Marco, 12</option>
                <option value="Parco Galvani, 5">Parco Galvani, 5</option>
                <option value="Viale Stazione, 1">Viale Stazione, 1</option>
              </select>
            </div>

            <div className="i-group">
              <label>Capacità Massima Alloggiamenti (Slot)</label>
              <input type="number" value={capacita} onChange={(e) => setCapacita(Number(e.target.value))} className="s-field-input" />
            </div>

            <div className="mock-interactive-map-area">
              <i className="fa-solid fa-map-location-dot"></i>
              <span>Integrated Interactive Map Area Attiva</span>
            </div>
          </div>

          <div className="s-form-error-container">
            {errore && (
              <div className="s-error-banner">
                <span className="badge-global badge-global--danger">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errore}
                </span>
              </div>
            )}
            
            <div className="s-form-actions">
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Annulla
              </button>
              <button type="submit" className="btn-primary-green">
                Crea Stazione
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}