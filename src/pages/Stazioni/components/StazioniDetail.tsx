import { useState } from "react";
import type { StazioneData } from "../types/stazioni";
import EliminaStazioneModal from "./EliminaStazioneModal";

interface DetailProps {
  stazione: StazioneData;
  onSave: (updated: StazioneData) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export default function StazioniDetail({ stazione, onSave, onDelete, onBack }: DetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, setFormState] = useState({
    stato: stazione.stato,
    tipo: stazione.tipo,
    modelloTotem: stazione.modelloTotem,
    capacita: stazione.capacita,
    tipoProblema: stazione.intervento?.tipoProblema || "",
    priorita: stazione.intervento?.priorita || "MEDIA" as "ALTA" | "MEDIA" | "BASSA",
    descrizione: stazione.intervento?.descrizione || "",
    ricambiNecessari: stazione.intervento?.ricambiNecessari || ""
  });

  const handleInputChange = (field: keyof typeof formState, value: string | number) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedData: StazioneData = {
      ...stazione,
      stato: formState.stato,
      tipo: formState.tipo,
      modelloTotem: formState.modelloTotem,
      capacita: Number(formState.capacita),
    };

    if (formState.stato === "Manutenzione") {
      updatedData.intervento = {
        idIntervento: stazione.intervento?.idIntervento || `#INT-${Math.floor(Math.random() * 800) + 100}`,
        tipoProblema: formState.tipoProblema,
        priorita: formState.priorita,
        descrizione: formState.descrizione,
        ricambiNecessari: formState.ricambiNecessari,
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
    setFormState({
      stato: stazione.stato,
      tipo: stazione.tipo,
      modelloTotem: stazione.modelloTotem,
      capacita: stazione.capacita,
      tipoProblema: stazione.intervento?.tipoProblema || "",
      priorita: stazione.intervento?.priorita || "MEDIA",
      descrizione: stazione.intervento?.descrizione || "",
      ricambiNecessari: stazione.intervento?.ricambiNecessari || ""
    });
    setIsEditing(false);
  };

  const isManutenzioneLayout = formState.stato === "Manutenzione";
  const numeroVeicoliAssegnati = stazione.biciPresenti + stazione.monopattiniPresenti;

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
                <input 
                  type="text" 
                  value={formState.tipo} 
                  onChange={(e) => handleInputChange("tipo", e.target.value)} 
                  className="s-field-input" 
                />
              ) : (
                <span className="s-val">{formState.tipo}</span>
              )}
            </div>

            <div className="s-row">
              <span className="s-label">Modello Totem</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formState.modelloTotem} 
                  onChange={(e) => handleInputChange("modelloTotem", e.target.value)} 
                  className="s-field-input" 
                />
              ) : (
                <span className="s-val">{formState.modelloTotem}</span>
              )}
            </div>

            <div className="s-row">
              <span className="s-label">Stato Stazione</span>
              {isEditing ? (
                <select 
                  value={formState.stato} 
                  onChange={(e) => handleInputChange("stato", e.target.value)} 
                  className="s-field-select"
                >
                  <option value="Online">Online / Attiva</option>
                  <option value="Manutenzione">Fuori Servizio (Manutenzione)</option>
                  <option value="Chiusa">Chiusa</option>
                </select>
              ) : (
                <span className={`s-status-pill s-status-pill--${formState.stato.toLowerCase()}`}>{formState.stato}</span>
              )}
            </div>

            <div className="s-row">
              <span className="s-label">Codice Stazione</span>
              <span className="s-val font-mono">{stazione.id}</span>
            </div>

            <div className="s-row">
              <span className="s-label">Capacità Totale Veicoli</span>
              {isEditing ? (
                <input 
                  type="number" 
                  value={formState.capacita} 
                  onChange={(e) => handleInputChange("capacita", Number(e.target.value))} 
                  className="s-field-input s-field-input--short" 
                />
              ) : (
                <span className="s-val">{formState.capacita} slot totali</span>
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
              <span className={`p-badge p-badge--${formState.priorita.toLowerCase()}`}>{formState.priorita} PRIORITÀ</span>
            </div>

            <div className="s-data-rows">
              <div className="s-row">
                <span className="s-label">Tipo Problema Riscontrato</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formState.tipoProblema} 
                    placeholder="Inserisci anomalia..." 
                    onChange={(e) => handleInputChange("tipoProblema", e.target.value)} 
                    className="s-field-input" 
                  />
                ) : (
                  <span className="s-val">{formState.tipoProblema || "Nessun dettaglio"}</span>
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
                  <select 
                    value={formState.priorita} 
                    onChange={(e) => handleInputChange("priorita", e.target.value)} 
                    className="s-field-select"
                  >
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
                <textarea 
                  value={formState.descrizione} 
                  placeholder="Descrivi il guasto rilevato..." 
                  onChange={(e) => handleInputChange("descrizione", e.target.value)} 
                  className="s-field-textarea" 
                />
              ) : (
                <p className="s-text-p">{formState.descrizione || "Nessuna descrizione inserita."}</p>
              )}
            </div>

            <div className="s-textarea-block s-textarea-block--spaced">
              <span className="s-label">Ricambi ed Attrezzatura Necessaria</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formState.ricambiNecessari} 
                  placeholder="Componenti di ricambio..." 
                  onChange={(e) => handleInputChange("ricambiNecessari", e.target.value)} 
                  className="s-field-input" 
                />
              ) : (
                <div className="s-box-grey">{formState.ricambiNecessari || "Nessun componente richiesto."}</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="s-detail-footer-actions">
        {isEditing ? (
          <div className="actions-cluster">
            <button type="button" className="btn-confirm-save" onClick={handleSave}>Salva Modifiche</button>
            <button type="button" className="btn-abort" onClick={handleAnnulla}>Annulla</button>
          </div>
        ) : (
          <div className="actions-cluster">
            <button type="button" className="btn-edit-trigger" onClick={() => setIsEditing(true)}>Modifica Parametri</button>
            <button type="button" className="btn-delete-trigger" onClick={() => setShowConfirmModal(true)}>Elimina Stazione</button>
          </div>
        )}
        <button type="button" className="btn-link-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Torna alla Mappa delle Stazioni
        </button>
      </div>

      {showConfirmModal && (
        <EliminaStazioneModal 
          nomeStazione={stazione.nome}
          idStazione={stazione.id}
          numeroVeicoli={numeroVeicoliAssegnati}
          onConfirm={() => onDelete(stazione.id)}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}