import { Thing } from './Thing';
import { Terrain } from './Terrain';
import { Unit } from './Unit';

export class Box extends Thing{
  x: number;
  y: number;
  terrain: Terrain;
  units: Unit[];
}
