import React from 'react';

export type TabType = 'flussi' | 'rendimento' | 'ciclo';

interface AnalyticsTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="analytics-tabs-bar">
      <button 
        className={`tab-btn ${activeTab === 'flussi' ? 'active' : ''}`}
        onClick={() => setActiveTab('flussi')}
      >
        Flussi & Utilizzo
      </button>
      <button 
        className={`tab-btn ${activeTab === 'rendimento' ? 'active' : ''}`}
        onClick={() => setActiveTab('rendimento')}
      >
        Rendimento & Efficienza
      </button>
      <button 
        className={`tab-btn ${activeTab === 'ciclo' ? 'active' : ''}`}
        onClick={() => setActiveTab('ciclo')}
      >
        Ciclo di Vita & Manutenzione
      </button>
    </div>
  );
};