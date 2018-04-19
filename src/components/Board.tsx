import * as React from 'react';
import { IState } from '../model/interfaces';
import { BoardRow } from './BoardRow';


function range(n:number){
  const a = new Array(n)
  for (let i = 0; i < a.length; i++) {
    a[i] = i  
  }
  return a
}
export const Board: React.StatelessComponent<IState> = ({board}) => {
  return (
    <table className="Board">
    {
      range(board.n).map(n=>
        <BoardRow board={board} n={n} key={n}/>
      )
    }
    </table>
  );
};
