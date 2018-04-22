import * as React from 'react';
import { range } from '../util/util';
import { BaseComponent, IBaseComponent } from './BaseComponent';
import { BoardRow } from './BoardRow';

export class Board extends BaseComponent<{}> implements IBaseComponent {
  constructor(props:{}){
    super(props)
  }
  public render() {
    return (
      <table className="Board">
        <tbody>
        {
          range(this.state.board.m).map(n=>
            <BoardRow key={n} n={n}/>
          )
        }
        </tbody>
      </table>
    );
  }
  public getComponentName(): string {
    return 'Board'
  }
}