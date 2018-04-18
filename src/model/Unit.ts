import { Thing } from './Thing';

export class Unit extends Thing {
  defaultAttributes: UnitAttributes;
  currentAttributes: UnitAttributes;
}

export interface UnitAttributes{
  moveSpeed:number;
  attackSpeed: number;
  health: number;
  damage: number;
}
