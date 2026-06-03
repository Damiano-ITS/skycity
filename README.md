# SkyCity

**SkyCity** è una piattaforma di gestione, monitoraggio e Business Intelligence dedicata alla **Smart Mobility urbana**.

L'applicazione permette di supervisionare in tempo reale flotte di veicoli condivisi (monopattini e biciclette elettriche), monitorare le stazioni di ricarica distribuite sul territorio e analizzare i dati operativi tramite dashboard e strumenti di reporting.

---

## Funzionalità

### Dashboard

- Panoramica generale dello stato della flotta
- KPI aggiornati in tempo reale
- Monitoraggio della disponibilità dei veicoli
- Indicatori operativi principali

### Gestione Flotta

- Elenco completo dei veicoli
- Stato operativo dei mezzi
- Monitoraggio del livello della batteria
- Ricerca e filtri

### Stazioni e Hub

- Visualizzazione geografica delle stazioni
- Stato delle infrastrutture:
  - Online
  - In manutenzione
  - Chiusa
- Gestione punti di ricarica e aree di sosta

### Gestione Manutenzioni

- Apertura ticket di assistenza
- Assegnazione interventi ai tecnici
- Monitoraggio dei tempi di risoluzione
- Gestione dello stato delle richieste

### Analytics & Business Intelligence

- Analisi dei flussi di utilizzo
- Studio delle tratte più percorse
- Heatmap e trend di traffico
- Report esportabili
- Grafici interattivi

---

## Stack Tecnologico

| Tecnologia | Utilizzo |
|------------|----------|
| React 19 | Framework UI |
| TypeScript | Tipizzazione statica |
| Vite 8 | Bundler e ambiente di sviluppo |
| Sass (Dart Sass) | Gestione degli stili |
| Recharts | Visualizzazione dati |
| Font Awesome 6 | Libreria di icone |
| ESLint | Controllo qualità del codice |

---

## Architettura CSS

Il progetto utilizza **Sass** con una struttura modulare basata su componenti condivisi.

## Installazione

### Prerequisiti

- Node.js
- npm

### Clonazione del repository

```bash
git clone https://github.com/tuo-username/skycity.git
cd skycity
```

### Installazione delle dipendenze

```bash
npm install
```

### Avvio dell'ambiente di sviluppo

```bash
npm run dev
```

---

## Script Disponibili

### `npm run dev`

Avvia il server di sviluppo locale con Hot Module Replacement.

**Utilizzo:**

- Sviluppo dell'applicazione
- Test delle modifiche in tempo reale
- Debug del codice

---

### `npm run build`

Genera la versione ottimizzata per la produzione.

Durante il processo:

- TypeScript verifica la correttezza dei tipi
- ESLint controlla la qualità del codice
- Vite genera asset minificati e ottimizzati

Output finale:

```text
/dist
```

Questa cartella contiene tutti i file necessari per il deploy dell'applicazione.

---

### `npm run preview`

Avvia un server locale utilizzando i file generati nella cartella `dist`.

Serve per:

- Simulare il comportamento reale dell'applicazione
- Verificare la build di produzione
- Individuare eventuali problemi prima del deploy

```bash
npm run build
npm run preview
```

---

## Licenza

Questo progetto è stato realizzato a scopo dimostrativo e formativo ad uso scolastico