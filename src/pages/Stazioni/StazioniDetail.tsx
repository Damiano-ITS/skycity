import { useState } from "react";
import type { StazioneData } from "./StazioniPage";

interface DetailProps {
  stazione: StazioneData;
  onSave: (updated: StazioneData) => void;
  onBack: () => void;
}

export default function StazioniDetail({ stazione, onSave, onBack }: DetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [stato, setStato] = useState(stazione.stato);
  const [tipoStazione, setTipoStazione] = useState(stazione.tipo);
  const [modelloTotem, setModelloTotem] = useState(stazione.modelloTotem);
  const [capacita, setCapacita] = useState(stazione.capacita);
  
  const [tipoProblema, setTipoProblema] = useState(stazione.intervento?.tipoProblema || "");
  const [priorita, setPriorita] = useState<any>(stazione.intervento?.priorita || "MEDIA");
  const [descrizione, setDescrizione] = useState(stazione.intervento?.descrizione || "");
  const [ricambi, setRicambi] = useState(stazione.intervento?.ricambiNecessari || "");

  const handleSave = () => {
    const updatedData: StazioneData = {
      ...stazione,
      stato,
      tipo: tipoStazione,
      modelloTotem,
      capacita: Number(capacita),
    };

    if (stato === "Manutenzione") {
      updatedData.intervento = {
        idIntervento: stazione.intervento?.idIntervento || `#INT-${Math.floor(Math.random() * 800) + 100}`,
        tipoProblema,
        priorita,
        descrizione,
        ricambiNecessari: ricambi,
        segnalatoDa: stazione.intervento?.segnalatoDa || "Sistema Automonitoraggio",
        orarioSegnalazione: stazione.intervento?.orarioSegnalazione || "03 Giu 2026 - 14:15",
        tecnicoAssegnato: stazione.intervento?.tecnicoAssegnato || "(non assegnato)"
      };
    } else {
      delete updatedData.intervento;
    }

    onSave(updatedData);
    setIsEditing(false);
  };

  const handleAnnulla = () => {
    setStato(stazione.stato);
    setTipoStazione(stazione.tipo);
    setModelloTotem(stazione.modelloTotem);
    setCapacita(stazione.capacita);
    setTipoProblema(stazione.intervento?.tipoProblema || "");
    setPriorita(stazione.intervento?.priorita || "MEDIA");
    setDescrizione(stazione.intervento?.descrizione || "");
    setRicambi(stazione.intervento?.ricambiNecessari || "");
    setIsEditing(false);
  };

  const isManutenzioneLayout = stato === "Manutenzione";

  return (
    <div className="stazioni-detail-page">
      <div className="detail-header-title">
        <h2>{isEditing ? "Modifica Dettagli Stazione e Intervento" : `Dettagli Stazione - ${stazione.nome}`}</h2>
      </div>

      <div className={isManutenzioneLayout ? "s-layout-split" : "s-layout-single"}>
        
        <div className="s-detail-card">
          <div className="s-card-title">
            {isEditing ? `MODIFICA SCHEDA STAZIONE: ${stazione.id}` : `SCHEDA STAZIONE: ${stazione.nome}`}
          </div>

          <div className="s-hub-icon-row">
            <i className="fa-solid fa-charging-station"></i>
          </div>

          <div className="s-data-rows">
            <div className="s-row">
              <span className="s-label">Tipo Stazione</span>
              {isEditing ? (
                <input type="text" value={tipoStazione} onChange={(e) => setTipoStazione(e.target.value)} className="s-field-input" />
              ) : (
                <span className="s-val">{tipoStazione}</span>
              )}
            </div>

            <div className="s-row">
              <span className="s-label">Modello Totem</span>
              {isEditing ? (
                <input type="text" value={modelloTotem} onChange={(e) => setModelloTotem(e.target.value)} className="s-field-input" />
              ) : (
                <span className="s-val">{modelloTotem}</span>
              )}
            </div>

            <div className="s-row">
              <span className="s-label">Stato Stazione</span>
              {isEditing ? (
                <select value={stato} onChange={(e) => setStato(e.target.value as any)} className="s-field-select">
                  <option value="Online">Online / Attiva</option>
                  <option value="Manutenzione">Fuori Servizio (Manutenzione)</option>
                  <option value="Chiusa">Chiusa</option>
                </select>
              ) : (
                <span className={`s-status-pill s-status-pill--${stato.toLowerCase()}`}>{stato}</span>
              )}
            </div>

            <div className="s-row">
              <span className="s-label">Codice Stazione</span>
              <span className="s-val font-mono">{stazione.id}</span>
            </div>

            <div className="s-row">
              <span className="s-label">Capacità Totale Veicoli</span>
              {isEditing ? (
                <input type="number" value={capacita} onChange={(e) => setCapacita(Number(e.target.value))} className="s-field-input s-field-input--short" />
              ) : (
                <span className="s-val">{capacita} slot totali</span>
              )}
            </div>
          </div>

          <div className="s-mini-map">
            <div className="s-map-marker">
              <i className="fa-solid fa-location-crosshairs"></i> {stazione.id}
            </div>
            <div className="s-map-footer-label">{stazione.indirizzo}, Pordenone</div>
          </div>
        </div>

        {isManutenzioneLayout && (
          <div className="s-detail-card s-detail-card--alert">
            <div className="s-card-title">
              {isEditing ? `MODIFICA SCHEDA INTERVENTO: ${stazione.intervento?.idIntervento || "#NUOVO"}` : `INFO OPERATIVE INTERVENTO ATTIVO`}
            </div>

            <div className="s-priority-tag">
              <span className={`p-badge p-badge--${priorita.toLowerCase()}`}>{priorita} PRIORITÀ</span>
            </div>

            <div className="s-data-rows">
              <div className="s-row">
                <span className="s-label">Tipo Problema Riscontrato</span>
                {isEditing ? (
                  <input type="text" value={tipoProblema} placeholder="Inserisci anomalia..." onChange={(e) => setTipoProblema(e.target.value)} className="s-field-input" />
                ) : (
                  <span className="s-val">{tipoProblema || "Nessun dettaglio"}</span>
                )}
              </div>

              <div className="s-row">
                <span className="s-label">Segnalato da</span>
                <span className="s-val">{stazione.intervento?.segnalatoDa || "Operatore di Rete"}</span>
              </div>

              <div className="s-row">
                <span className="s-label">Orario Segnalazione</span>
                <span className="s-val">{stazione.intervento?.orarioSegnalazione || "Adesso (In Modifica)"}</span>
              </div>

              {isEditing && (
                <div className="s-row">
                  <span className="s-label">Livello Priorità</span>
                  <select value={priorita} onChange={(e) => setPriorita(e.target.value as any)} className="s-field-select">
                    <option value="ALTA">ALTA</option>
                    <option value="MEDIA">MEDIA</option>
                    <option value="BASSA">BASSA</option>
                  </select>
                </div>
              )}

              <div className="s-row">
                <span className="s-label">Tecnico Assegnato</span>
                <span className="s-val font-semibold text-blue">{stazione.intervento?.tecnicoAssegnato || "(non assegnato)"}</span>
              </div>
            </div>

            <div className="s-textarea-block">
              <span className="s-label">Descrizione Dettagliata Anomalia</span>
              {isEditing ? (
                <textarea value={descrizione} placeholder="Descrivi il guasto rilevato..." onChange={(e) => setDescrizione(e.target.value)} className="s-field-textarea" />
              ) : (
                <p className="s-text-p">{descrizione || "Nessuna descrizione inserita."}</p>
              )}
            </div>

            <div className="s-textarea-block s-textarea-block--spaced">
              <span className="s-label">Ricambi ed Attrezzatura Necessaria</span>
              {isEditing ? (
                <input type="text" value={ricambi} placeholder="Componenti di ricambio..." onChange={(e) => setRicambi(e.target.value)} className="s-field-input" />
              ) : (
                <div className="s-box-grey">{ricambi || "Nessun componente richiesto."}</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="s-detail-footer-actions">
        {isEditing ? (
          <div className="actions-cluster">
            <button className="btn-confirm-save" onClick={handleSave}>Salva Modifiche</button>
            <button className="btn-abort" onClick={handleAnnulla}>Annulla</button>
          </div>
        ) : (
          <button className="btn-edit-trigger" onClick={() => setIsEditing(true)}>Modifica Parametri</button>
        )}
        <button className="btn-link-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Torna alla Mappa delle Stazioni
        </button>
      </div>
    </div>
  );
}