import type { ManutenzioneTicket, Tecnico } from "../types/manutenzioni";

export const INITIAL_TICKETS: ManutenzioneTicket[] = [
  {
    id: "#INT-001",
    veicoloId: "bk-882",
    tipoVeicolo: "Bici",
    modello: "Super73-RX",
    problema: "Catena rotta",
    stato: "Nuovo",
    priorita: "Alta",
    orario: "2 min fa",
    segnalatoDa: "Sistema Automonitoraggio",
    statoBatteria: "12% (Critico)",
    prossimaManutenzione: "2025-06-15",
    noleggiTotali: 145,
    descrizione: "La catena è spezzata. Verificare possibili danni al tendicatena e alla trasmissione.",
    ricambi: "Catena compatibile, kit pulizia.",
    tecnicoAssegnato: "(non assegnato)"
  },
  {
    id: "#INT-002",
    veicoloId: "mk-1267",
    tipoVeicolo: "Monopattino",
    modello: "Xiaomi Pro 4",
    problema: "Freno malfunzionante",
    stato: "Nuovo",
    priorita: "Media",
    orario: "5 min fa",
    segnalatoDa: "Segnalazione Utente",
    statoBatteria: "68%",
    prossimaManutenzione: "2025-07-01",
    noleggiTotali: 312,
    descrizione: "Leva del freno sinistro lenta, lo spazio di frenata è raddoppiato.",
    ricambi: "Pastiglie freno, cavo d'acciaio.",
    tecnicoAssegnato: "(non assegnato)"
  },
  {
    id: "#INT-003",
    veicoloId: "bk-015",
    tipoVeicolo: "Bici",
    modello: "SkyCity Comfort-E",
    problema: "Fanale posteriore spento",
    stato: "In lavoro",
    priorita: "Media",
    orario: "16 min fa",
    segnalatoDa: "Controllo Manuale",
    statoBatteria: "92%",
    prossimaManutenzione: "2025-06-10",
    noleggiTotali: 88,
    descrizione: "Il led posteriore non si accende all'attivazione del veicolo.",
    ricambi: "Lampadina LED 12V.",
    tecnicoAssegnato: "Maria Bianchi"
  },
  {
    id: "#INT-004",
    veicoloId: "mk-1301",
    tipoVeicolo: "Monopattino",
    modello: "Ninebot G30 Max",
    problema: "Batteria scarica rapida",
    stato: "In lavoro",
    priorita: "Alta",
    orario: "30 min fa",
    segnalatoDa: "Sistema Automonitoraggio",
    statoBatteria: "5%",
    prossimaManutenzione: "2025-06-05",
    noleggiTotali: 540,
    descrizione: "Crollo di tensione anomalo sotto carico. Celle degradate.",
    ricambi: "Pacco batteria sostitutivo.",
    tecnicoAssegnato: "Luigi Rossi"
  }
];

export const HARDCODED_TECNICI: Tecnico[] = [
  { id: "LR01", nome: "Luigi Rossi", stato: "Disponibile", specializzazione: "Meccanica", voto: 4.8 },
  { id: "MB02", nome: "Maria Bianchi", stato: "Disponibile", specializzazione: "Elettronica", voto: 4.9 },
  { id: "PV03", nome: "Pietro Verde", stato: "Occupato", specializzazione: "Meccanica", voto: 4.7, notaStato: "Fino alle 12:30" },
  { id: "AG04", nome: "Anna Gialli", stato: "Non Disponibile", specializzazione: "Software", voto: 4.6, notaStato: "In ferie" }
];