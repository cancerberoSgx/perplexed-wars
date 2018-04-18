import { Thing } from './Thing';
import { Terrain } from './Terrain';
import { Box } from './Box';

export class Board extends Thing {

  constructor() {
    super();
  }

  boxes: Box[][];
  
  test1(): string {
    return 'hello';
  }
}

export interface BoardConfig {
  n:number;
  m: number;
}
