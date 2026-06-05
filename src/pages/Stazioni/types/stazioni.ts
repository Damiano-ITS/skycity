export interface InterventoStazione {
  idIntervento: string;
  tipoProblema: string;
  segnalatoDa: string;
  orarioSegnalazione: string;
  priorita: "ALTA" | "MEDIA" | "BASSA";
  tecnicoAssegnato: string;
  descrizione: string;
  ricambiNecessari: string;
}

export interface StazioneData {
  id: string;
  nome: string;
  stato: "Online" | "Manutenzione" | "Chiusa";
  capacita: number;
  biciPresenti: number;
  monopattiniPresenti: number;
  tipo: string;
  modelloTotem: string;
  statoSlotLiberi: string;
  prossimaManutenzione: string;
  totaleTransazioni: number;
  coordinatGPS: string;
  totaleGiorniOperativi: number;
  integritaDocks: number;
  utilizzoRicariche: number;
  conteggioAnomalie: number;
  indirizzo: string;
  intervento?: InterventoStazione;
}

export type NuovaStazionePayload = Omit<
  StazioneData,
  | "id"
  | "biciPresenti"
  | "monopattiniPresenti"
  | "statoSlotLiberi"
  | "prossimaManutenzione"
  | "totaleTransazioni"
  | "coordinatGPS"
  | "totaleGiorniOperativi"
  | "integritaDocks"
  | "utilizzoRicariche"
  | "conteggioAnomalie"
>;