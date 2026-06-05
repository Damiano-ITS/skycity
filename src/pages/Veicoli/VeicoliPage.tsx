import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import VeicoliList from "./components/VeicoliList";
import VeicoliDetail from "./components/VeicoliDetail";
import NuovoVeicoloForm from "./components/NuovoVeicoloForm";
import type { VeicoloData } from "./types/veicoli";
import { INITIAL_VEICOLI } from "./constants/veicoliMocks";
import "./VeicoliPage.scss";

export default function VeicoliPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [veicoli, setVeicoli] = useState<VeicoloData[]>(INITIAL_VEICOLI);
  const [view, setView] = useState<'list' | 'create'>('list');

  const handleUpdateVeicolo = (updated: VeicoloData) => {
    setVeicoli(prev => prev.map(v => v.id === updated.id ? updated : v));
  };

  const handleCreateVeicolo = (newVeicolo: VeicoloData) => {
    setVeicoli(prev => [newVeicolo, ...prev]);
    setView('list');
  };

  const handleDeleteVeicolo = (targetId: string) => {
    setVeicoli(prev => prev.filter(v => v.id !== targetId));
    navigate("/veicoli");
  };

  if (view === 'create') {
    return <NuovoVeicoloForm onSave={handleCreateVeicolo} onCancel={() => setView('list')} />;
  }

  if (id) {
    const currentVeicolo = veicoli.find(v => v.id === id);
    if (!currentVeicolo) {
      return (
        <div className="veicoli-error">
          <h3>Errore: Veicolo #{id} non trovato nella flotta.</h3>
          <button onClick={() => navigate("/veicoli")} className="btn-base">Torna all'elenco</button>
        </div>
      );
    }
    return (
      <VeicoliDetail 
        veicolo={currentVeicolo} 
        onSave={handleUpdateVeicolo} 
        onDelete={handleDeleteVeicolo}
        onBack={() => navigate("/veicoli")} 
      />
    );
  }

  return <VeicoliList veicoli={veicoli} onCreateOpen={() => setView('create')} />;
}