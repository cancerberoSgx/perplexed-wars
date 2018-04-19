import { Thing } from './Thing';

export class Game extends Thing{


  public options: IGameOptions;
  public defaultOptions: IGameOptions;

  
  constructor(options?: IGameOptions) {
    super();
    this.options = Object.assign({}, this.defaultOptions, options || {});
  }
  
  public start(options: IGameOptions) {
    // console.log('TODO')
  }
}

export interface IGameOptions {
  speed: number;
}
