import React from 'react';
import KpiCard from '../../../components/ui/KpiCard/KpiCard';

export const RendimentoView: React.FC = () => {
  return (
    <div className="tab-placeholder-view">
      <div className="analytics-kpi-grid">
        <KpiCard title="Ricavo Medio per Veicolo" value="€4.80 / giorno" trendText="" iconClass="fa-solid fa-wallet" />
        <KpiCard title="Tempo Medio di Corsa" value="18.4 min" trendText="" iconClass="fa-solid fa-clock" />
        <KpiCard title="Efficienza di Ricarica" value="94.5%" trendText="" iconClass="fa-solid fa-percent" />
      </div>
      <div className="mock-bi-infobox">
        <h4><i className="fa-solid fa-chart-line"></i> Analisi Margini Operativi</h4>
        <p>I ricavi derivanti dai monopattini elettrici hanno registrato un incremento del 4.2% in centro storico, mentre le tratte periferiche mostrano un aumento del tempo di inattività del mezzo prima del prelievo successivo.</p>
      </div>
    </div>
  );
};