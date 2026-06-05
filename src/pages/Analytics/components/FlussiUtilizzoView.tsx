import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import KpiCard from '../../../components/ui/KpiCard/KpiCard';
import { ISTOGRAMMA_DATA, PUNCH_CARD_DATA } from '../constants/analyticsMocks';

export const FlussiUtilizzoView: React.FC = () => {
  const [toggleMappa, setToggleMappa] = useState<'prelievi' | 'rilasci'>('prelievi');
  const [hoveredZona, setHoveredZona] = useState<boolean>(false);

  return (
    <>
      <div className="analytics-kpi-grid">
        <KpiCard title="Utilizzo Medio Flotta" value="91.20%" trendText="+15% rispetto a ieri" iconClass="fa-solid fa-users" />
        <KpiCard title="Noleggi Totali Maggio" value="16.2k" trendText="+10% rispetto a Maggio '24" iconClass="fa-solid fa-bicycle" />
        <KpiCard title="Ricavi Mensili Stimati" value="€17.7k" trendText="+18% rispetto a Maggio '24" iconClass="fa-solid fa-money-bill-wave" />
        <KpiCard 
          title="Manutenzioni Pendenti" 
          value={
            <div className="kpi-sub-badges">
              <span className="badge badge--alta">15 Alta</span>
              <span className="badge badge--media">22 Media</span>
            </div>
          } 
          trendText="" 
          iconClass="fa-solid fa-screwdriver-wrench" 
        />
        <KpiCard title="Noleggi Attivi Ora" value="1.2k" unit="unità" trendText="" iconClass="fa-solid fa-arrows-rotate" />
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
              <div className="heatmap-glow" onMouseEnter={() => setHoveredZona(true)} onMouseLeave={() => setHoveredZona(false)} />
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
              <BarChart data={ISTOGRAMMA_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Scatter name="Utilizzo" data={PUNCH_CARD_DATA} fill="#1d4ed8" />
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
  );
};