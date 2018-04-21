import * as React from 'react';
import { range } from '../util/util';
import { BaseComponent } from './BaseComponent';
import { BoardRow } from './BoardRow';

export class Board extends BaseComponent<{}> {
  constructor(){
    super({})
  }
  public render() {
    return (
      <table className="Board">
        <tbody>
        {
          range(this.state.board.n).map(n=>
            <BoardRow key={n} n={n}/>
          )
        }
        </tbody>
      </table>
    );
  }
}