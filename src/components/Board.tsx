import * as React from 'react';
import { State } from '../model/State';
import { range } from '../util/util';
import { BoardRow } from './BoardRow';

export class Board extends React.Component<{}> {

  public render() {
    return (
      <table className="Board">
      {
        range(State.get().board.n).map(n=>
          <BoardRow key={n} n={n}/>
        )
      }
      </table>
    );
  }
}