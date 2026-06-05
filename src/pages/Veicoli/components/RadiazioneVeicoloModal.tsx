import type { VeicoloData } from "../types/veicoli";

interface RadiazioneModalProps {
  veicolo: VeicoloData;
  onConfirm: () => void;
  onClose: () => void;
}

export default function RadiazioneVeicoloModal({ veicolo, onConfirm, onClose }: RadiazioneModalProps) {
  return (
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
          <button className="btn-modal-confirm" onClick={onConfirm}>
            Conferma Radiazione
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}