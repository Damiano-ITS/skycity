export type TipoVeicolo = "Bici" | "Monopattino";
export type StatoVeicolo = "In servizio" | "In manutenzione" | "Inattivo" | "Guasto";
export type HubStazione = "Stazione A" | "Stazione B" | "Parco";

export interface VeicoloData {
  id: string;
  tipo: TipoVeicolo;
  modello: string;
  stato: StatoVeicolo;
  stazione: HubStazione;
  batteria: number;
  prossimaManutenzione: string;
  noleggiTotali: number;
  ultimaPosizione: string;
  distanzaTotale: string;
  cicliRicarica: number;
  ultimoNoleggio: string;
  durataUltimoNoleggio: string;
  distanzaUltimoNoleggio: string;
  noteIniziali?: string;
}