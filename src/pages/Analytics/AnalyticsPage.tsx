import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import './AnalyticsPage.scss';

const istogrammaData = [
  { ora: '0-1', noleggi: 2 }, { ora: '2-3', noleggi: 1 }, { ora: '4-5', noleggi: 5 },
  { ora: '6-7', noleggi: 18 }, { ora: '8-9', noleggi: 58 }, { ora: '10-11', noleggi: 43 },
  { ora: '12-13', noleggi: 35 }, { ora: '14-15', noleggi: 38 }, { ora: '16-17', noleggi: 47 },
  { ora: '17-19', noleggi: 72 }, { ora: '20-21', noleggi: 25 }, { ora: '22-23', noleggi: 12 },
];

const punchCardData = [
  { giorno: 'Lun', ora: 8, intensita: 40 }, { giorno: 'Lun', ora: 13, intensita: 55 }, { giorno: 'Lun', ora: 18, intensita: 80 },
  { giorno: 'Mar', ora: 8, intensita: 50 }, { giorno: 'Mar', ora: 13, intensita: 45 }, { giorno: 'Mar', ora: 18, intensita: 75 },
  { giorno: 'Mer', ora: 8, intensita: 65 }, { giorno: 'Mer', ora: 13, intensita: 60 }, { giorno: 'Mer', ora: 18, intensita: 90 },
  { giorno: 'Gio', ora: 8, intensita: 45 }, { giorno: 'Gio', ora: 13, intensita: 50 }, { giorno: 'Gio', ora: 18, intensita: 85 },
  { giorno: 'Ven', ora: 8, intensita: 70 }, { giorno: 'Ven', ora: 13, intensita: 65 }, { giorno: 'Ven', ora: 18, intensita: 95 },
  { giorno: 'Sab', ora: 10, intensita: 85 }, { giorno: 'Sab', ora: 16, intensita: 70 }, { giorno: 'Sab', ora: 21, intensita: 60 },
  { giorno: 'Dom', ora: 10, intensita: 90 }, { giorno: 'Dom', ora: 16, intensita: 80 }, { giorno: 'Dom', ora: 21, intensita: 40 },
];

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flussi' | 'rendimento' | 'ciclo'>('flussi');
  const [toggleMappa, setToggleMappa] = useState<'prelievi' | 'rilasci'>('prelievi');
  const [hoveredZona, setHoveredZona] = useState<boolean>(false);

  return (
    <div className="analytics-page">
      
      <div className="analytics-header">
        <div className="header-title-zone">
          <h2>Analytics e Performance Flotta</h2>
        </div>
        <button className="btn-export-report">
          Exporta Report <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>

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

      {activeTab === 'flussi' && (
        <>
          <div className="analytics-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon blue"><i className="fa-solid fa-users"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Utilizzo Medio Flotta</span>
                <h3>91.20%</h3>
                <span className="kpi-trend positive">+15% rispetto a ieri <i className="fa-solid fa-arrow-trend-up"></i></span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon purple"><i className="fa-solid fa-bicycle"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Noleggi Totali Maggio</span>
                <h3>16.2k</h3>
                <span className="kpi-trend positive">+10% rispetto a Maggio '24 <i className="fa-solid fa-arrow-trend-up"></i></span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon green"><i className="fa-solid fa-money-bill-wave"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Ricavi Mensili Stimati</span>
                <h3>€17.7k</h3>
                <span className="kpi-trend positive">+18% rispetto a Maggio '24 <i className="fa-solid fa-arrow-trend-up"></i></span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon orange"><i className="fa-solid fa-screwdriver-wrench"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Manutenzioni Pendenti</span>
                <div className="kpi-sub-badges">
                  <span className="badge red">15 Alta</span>
                  <span className="badge yellow">22 Media</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon mint"><i className="fa-solid fa-arrows-rotate"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Noleggi Attivi Ora</span>
                <h3>1.2k <span className="unit">unità</span></h3>
              </div>
            </div>
          </div>

          <div className="analytics-middle-grid">
            
            <div className="chart-card heatmap-card">
              <div className="card-header">
                <h4>Heatmap Geospaziale di Prelievo - Pordenone</h4>
                <div className="toggle-container">
                  <span className="toggle-label">Prelievi / Rilasci</span>
                  <button 
                    className={`toggle-switch ${toggleMappa}`} 
                    onClick={() => setToggleMappa(toggleMappa === 'prelievi' ? 'rilasci' : 'prelievi')}
                  />
                </div>
              </div>

              <div className="mock-map-container">
                <div className="map-fallback-bg">
                  <div 
                    className="heatmap-glow" 
                    onMouseEnter={() => setHoveredZona(true)}
                    onMouseLeave={() => setHoveredZona(false)}
                  />
                  <div className="map-marker-pin"><i className="fa-solid fa-location-dot"></i></div>
                  
                  {hoveredZona && (
                    <div className="map-bi-tooltip">
                      <strong>ZONA: Piazza S. Marco</strong>
                      <div>Noleggi: 125</div>
                      <div>Picco: 17:00 - 19:00</div>
                    </div>
                  )}
                </div>
                <div className="map-footer-credits">mapbox © OpenStreetMap</div>
              </div>
            </div>

            <div className="chart-card tratte-card">
              <div className="card-header">
                <h4>Analisi Tratte Comuni e Flussi</h4>
              </div>
              <div className="tratte-content-layout">
                <div className="radial-flow-mock">
                  <div className="center-node">Stazione</div>
                  <div className="line-ray ray-1"><span>Politecnico</span></div>
                  <div className="line-ray ray-2"><span>Centro</span></div>
                  <div className="line-ray ray-3"><span>Parco</span></div>
                </div>

                <div className="insight-side-box">
                  <h5>Dettagli Stazione: <br /><strong>Piazza S. Marco</strong></h5>
                  <p><strong>Picco Orario:</strong> 17:30</p>
                  <p><strong>Flussi Principali:</strong></p>
                  <ul>
                    <li>Polo Univ. (30%)</li>
                    <li>Centro (25%)</li>
                  </ul>
                  <p><strong>Distanza Media:</strong> 1.1 km</p>
                </div>
              </div>
              <div className="automated-insight-bar">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span><strong>Automated Insight:</strong> L'80% dei noleggi serali termina nel raggio di 500m dalla stazione FS. Considerare ricollocamento mezzi pre-serale.</span>
              </div>
            </div>
          </div>

          <div className="analytics-bottom-grid">
            
            <div className="chart-card">
              <div className="card-header">
                <h4>Istogramma Orario dei Noleggi (Media Mensile)</h4>
              </div>
              <div className="recharts-wrapper-box">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={istogrammaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="ora" axisLine={false} tickLine={false} style={{ fontSize: 11, fill: '#666' }} />
                    <YAxis axisLine={false} tickLine={false} style={{ fontSize: 11, fill: '#666' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="noleggi" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="card-header">
                <h4>Matrice Oraria di Utilizzo (Punch Card Chart)</h4>
              </div>
              <div className="recharts-wrapper-box">
                <ResponsiveContainer width="100%" height={200}>
                  <ScatterChart margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <XAxis dataKey="ora" type="number" name="Ora" domain={[0, 24]} tickCount={7} axisLine={false} tickLine={false} style={{ fontSize: 11 }} />
                    <YAxis dataKey="giorno" type="category" name="Giorno" axisLine={false} tickLine={false} style={{ fontSize: 11 }} />
                    <ZAxis dataKey="intensita" type="number" range={[5, 250]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Utilizzo" data={punchCardData} fill="#1d4ed8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="automated-insight-bar">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span><strong>Automated Insight:</strong> I picchi pendolari universitari alle 8:30 e 17:30 sono confermati.</span>
              </div>
            </div>

          </div>
        </>
      )}

      {activeTab === 'rendimento' && (
        <div className="tab-placeholder-view">
          <div className="analytics-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon green"><i className="fa-solid fa-wallet"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Ricavo Medio per Veicolo</span>
                <h3>€4.80 / giorno</h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon blue"><i className="fa-solid fa-clock"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Tempo Medio di Corsa</span>
                <h3>18.4 min</h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon purple"><i className="fa-solid fa-percent"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Efficienza di Ricarica</span>
                <h3>94.5%</h3>
              </div>
            </div>
          </div>
          <div className="mock-bi-infobox">
            <h4><i className="fa-solid fa-chart-line"></i> Analisi Margini Operativi</h4>
            <p>I ricavi derivanti dai monopattini elettrici hanno registrato un incremento del 4.2% in centro storico, mentre le tratte periferiche mostrano un aumento del tempo di inattività del mezzo prima del prelievo successivo.</p>
          </div>
        </div>
      )}

      {activeTab === 'ciclo' && (
        <div className="tab-placeholder-view">
          <div className="analytics-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon orange"><i className="fa-solid fa-hourglass-half"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Tempo di Fermo Mezzo (Downtime)</span>
                <h3>4.2 ore / mese</h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon red"><i className="fa-solid fa-triangle-exclamation"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Tasso Guasti Ricorrenti</span>
                <h3>1.8% <span className="sub">Catene/Freni</span></h3>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon mint"><i className="fa-solid fa-heart-pulse"></i></div>
              <div className="kpi-data">
                <span className="kpi-label">Stato Salute Batterie Medio</span>
                <h3>89.1%</h3>
              </div>
            </div>
          </div>
          <div className="mock-bi-infobox warning">
            <h4><i className="fa-solid fa-triangle-exclamation"></i> Alert Ciclo di Vita</h4>
            <p>Il lotto di biciclette elettriche Comfort-E introdotto a Gennaio 2024 mostra un'usura accelerata sui pattini del freno posteriore. Consigliata ispezione pianificata nei prossimi 15 giorni.</p>
          </div>
        </div>
      )}

    </div>
  );
};