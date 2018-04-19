import { Terrain } from './Terrain';
import { Thing } from './Thing';
import { Unit } from './Unit';

export class Box extends Thing{
  public x: number;
  public y: number;
  public terrain: Terrain;
  public units: Unit[];
}
