import * as React from 'react';
import { State } from '../model/State';
import './BoardRow.css';

interface IBoardRowState {
  n: number
  key: number
}
export class BoardRow extends React.Component<IBoardRowState> {
  constructor(c:IBoardRowState){
    super(c)
  }
  public render() {
    return (
    <tr className="BoardRow">
    {
      State.get().board.boxes.filter(b=>b.x===this.props.n).map(b=>
       <td className="BoardBox" key={b.key} onClick={this.boxClicked} >{b.terrain} ({b.units.length})</td>
      )
    }  
    </tr>
    )
  }

  protected boxClicked(){
    if(State.get().uiState.getCurrentPlayerUIState().addUnitButtonPressed) {
      console.log('unit added in here')
    }
  }
}