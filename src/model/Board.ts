// import { Terrain } from './Terrain';
import { Box } from './Box';
import { Thing } from './Thing';

export class Board extends Thing {

  public config: IBoardConfig;
  public boxes: Box[][];
  
  constructor(config: IBoardConfig) {
    super();
    this.config = config
  }

  public test1(): string {
    return 'hello';
  }
}

export interface IBoardConfig {
  n:number;
  m: number;
}
