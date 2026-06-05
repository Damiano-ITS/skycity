import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { StazioneData } from "./types/stazioni";
import { INITIAL_STAZIONI } from "./constants/stazioniMocks";
import StazioniList from "./components/StazioniList";
import StazioniDetail from "./components/StazioniDetail";
import NuovaStazioneForm from "./components/NuovaStazioneForm";
import "./StazioniPage.scss";

export default function StazioniPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stazioni, setStazioni] = useState<StazioneData[]>(INITIAL_STAZIONI);
  const [view, setView] = useState<'list' | 'create'>('list');

  const handleUpdateStazione = (updated: StazioneData) => {
    setStazioni(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleCreateStazione = (newStazione: StazioneData) => {
    setStazioni(prev => [newStazione, ...prev]);
    setView('list');
  };

  const handleDeleteStazione = (targetId: string) => {
    setStazioni(prev => prev.filter(s => s.id !== targetId));
    navigate("/stazioni");
  };

  if (view === 'create') {
    return (
      <NuovaStazioneForm 
        stazioni={stazioni} 
        onSave={handleCreateStazione} 
        onCancel={() => setView('list')} 
      />
    );
  }

  if (id) {
    const currentStazione = stazioni.find(s => s.id.replace("#", "") === id);
    if (!currentStazione) {
      return (
        <div className="stazioni-error">
          <h3>Errore: Hub Stazione #{id} non censito a sistema.</h3>
          <button type="button" onClick={() => navigate("/stazioni")} className="btn-base">
            Torna alla Rete
          </button>
        </div>
      );
    }
    return (
      <StazioniDetail 
        stazione={currentStazione} 
        onSave={handleUpdateStazione} 
        onDelete={handleDeleteStazione}
        onBack={() => navigate("/stazioni")} 
      />
    );
  }

  return <StazioniList stazioni={stazioni} onCreateOpen={() => setView('create')} />;
}