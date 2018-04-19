import * as React from 'react';
import { IState } from '../model/interfaces';

export const Board: React.StatelessComponent<IState> = ({board}) => {
  return (
    <div className="Board">
    {
      board.boxes.map(b=>
        <div key={b.key}>{b.terrain} ({b.units.length})</div>
      )
    }      
    </div>
  );
};
