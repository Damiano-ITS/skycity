import React from 'react';
import KpiCard from '../../../components/ui/KpiCard/KpiCard';

export const CicloVitaView: React.FC = () => {
  return (
    <div className="tab-placeholder-view">
      <div className="analytics-kpi-grid">
        <KpiCard title="Tempo di Fermo Mezzo (Downtime)" value="4.2 ore / mese" trendText="" iconClass="fa-solid fa-hourglass-half" />
        <KpiCard title="Tasso Guasti Ricorrenti" value="1.8%" trendText="Focus: Catene/Freni" iconClass="fa-solid fa-triangle-exclamation" />
        <KpiCard title="Stato Salute Batterie Medio" value="89.1%" trendText="" iconClass="fa-solid fa-heart-pulse" />
      </div>
      <div className="mock-bi-infobox warning">
        <h4><i className="fa-solid fa-triangle-exclamation"></i> Alert Ciclo di Vita</h4>
        <p>Il lotto di biciclette elettriche Comfort-E introdotto a Gennaio 2024 mostra un'usura accelerata sui pattini del freno posteriore. Consigliata ispezione pianificata nei prossimi 15 giorni.</p>
      </div>
    </div>
  );
};