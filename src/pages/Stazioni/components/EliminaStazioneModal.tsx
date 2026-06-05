interface EliminaStazioneModalProps {
  nomeStazione: string;
  idStazione: string;
  numeroVeicoli: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EliminaStazioneModal({ 
  nomeStazione, 
  idStazione, 
  numeroVeicoli, 
  onConfirm, 
  onCancel 
}: EliminaStazioneModalProps) {
  return (
    <div className="shared-modal-overlay">
      <div className="shared-modal-card">
        <div className="shared-modal-header">
          <i className="fa-solid fa-triangle-exclamation shared-modal-icon-alert"></i>
          <h3>Conferma Eliminazione Stazione</h3>
        </div>
        <div className="shared-modal-body">
          <p>Sei sicuro di voler eliminare definitivamente la stazione <strong>{nomeStazione}</strong> ({idStazione})?</p>
          <div className="shared-modal-alert-box">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>
              <strong>ATTENZIONE:</strong> Questa operazione rimuoverà dal sistema anche tutti i <strong>{numeroVeicoli} veicoli</strong> attualmente assegnati a questa stazione. L'azione è irreversibile.
            </span>
          </div>
        </div>
        <div className="shared-modal-footer">
          <button type="button" className="btn-modal-delete" onClick={onConfirm}>
            Sì, Elimina Tutto
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}