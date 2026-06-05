import React, { useState } from 'react';
import { AnalyticsTabs, type TabType } from './components/AnalyticsTabs';
import { FlussiUtilizzoView } from './components/FlussiUtilizzoView';
import { RendimentoView } from './components/RendimentoView';
import { CicloVitaView } from './components/CicloVitaView';
import './AnalyticsPage.scss';

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('flussi');

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="header-title-zone">
          <h2>Analytics e Performance Flotta</h2>
        </div>
        <button className="btn-export-report">
          Esporta Report <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>

      <AnalyticsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'flussi' && <FlussiUtilizzoView />}
      {activeTab === 'rendimento' && <RendimentoView />}
      {activeTab === 'ciclo' && <CicloVitaView />}
    </div>
  );
};