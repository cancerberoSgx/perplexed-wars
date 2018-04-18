import { Thing } from './Thing';

export class Game extends Thing{

  constructor(options?: GameOptions) {
    super();
    this.options = Object.assign({}, this.defaultOptions, options || {});
  }
  
  options: GameOptions;
  defaultOptions: GameOptions;

  start(options: GameOptions) {
    
  }
}

export interface GameOptions {
  speed: number;
}
