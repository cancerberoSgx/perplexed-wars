import * as React from 'react';
import { IBoard } from '../model/interfaces';
import './BoardRow.css';

interface IBoardRowState{
  board: IBoard
  n: number
  key: number
}
export const BoardRow: React.StatelessComponent<IBoardRowState> = ({board, n}) => {
  return (
    <tr className="BoardRow">
    {
      board.boxes.filter(b=>b.x===n).map(b=>
       <td className="BoardBox"key={b.key}>{b.terrain} ({b.units.length})</td>
      )
    }  
    </tr>
  );
}