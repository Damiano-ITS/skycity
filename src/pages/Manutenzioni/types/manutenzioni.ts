export interface ManutenzioneTicket {
  id: string;
  veicoloId: string;
  tipoVeicolo: "Bici" | "Monopattino";
  modello: string;
  problema: string;
  stato: "Nuovo" | "In lavoro" | "Completata";
  priorita: "Alta" | "Media";
  orario: string;
  segnalatoDa: string;
  statoBatteria: string;
  prossimaManutenzione: string;
  noleggiTotali: number;
  descrizione: string;
  ricambi: string;
  tecnicoAssegnato: string;
}

export interface Tecnico {
  id: string;
  nome: string;
  stato: "Disponibile" | "Occupato" | "Non Disponibile";
  specializzazione: "Meccanica" | "Elettronica" | "Software";
  voto: number;
  notaStato?: string;
}

export type NuovaSegnalazionePayload = Omit<
  ManutenzioneTicket, 
  "id" | "orario" | "tecnicoAssegnato" | "stato"
>;