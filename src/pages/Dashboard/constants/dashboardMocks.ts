import { type SelectOption } from "../../../components/ui/CustomSelect/CustomSelect";

export interface IssueItem {
  id: string;
  problem: string;
  priority: string;
  time: string;
}

export const chartDateOptions: SelectOption[] = [
  { value: "week-this-month", label: "Questo mese" },
  { value: "week-prev-month", label: "Mese scorso" }
];

export const rentalsData = [
  { name: "25 Mag", noleggi: 2000, precedente: 1500 },
  { name: "26 Mag", noleggi: 3400, precedente: 3200 },
  { name: "27 Mag", noleggi: 2900, precedente: 3100 },
  { name: "28 Mag", noleggi: 3300, precedente: 3500 },
  { name: "29 Mag", noleggi: 2900, precedente: 2500 },
  { name: "30 Mag", noleggi: 3100, precedente: 1900 },
];

export const vehicleTypeData = [
  { name: "Monopattini Elettrici", value: 450, color: "#0ea5e9" },
  { name: "Bici Elettriche", value: 1350, color: "#10b981" },
];

export const issuesData: IssueItem[] = [
  { id: "Bici #bk-882", problem: "Catena rotta", priority: "Alta", time: "2 min fa" },
  { id: "Monopattino #mk-1267", problem: "Freno malfunzionante", priority: "Media", time: "5 min fa" },
  { id: "Bici #bk-015", problem: "Fanale posteriore spento", priority: "Media", time: "15 min fa" },
  { id: "Monopattino #mk-1301", problem: "Batteria scarica rapida", priority: "Alta", time: "30 min fa" },
];