import { Thing } from './Thing';

export class Unit extends Thing {
  public defaultAttributes: IUnitAttributes;
  public currentAttributes: IUnitAttributes;
}

export interface IUnitAttributes{
  moveSpeed:number;
  attackSpeed: number;
  health: number;
  damage: number;
}
