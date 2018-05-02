import * as React from 'react'
import { State } from '../../state/state'
import { range } from '../../util/util'
import { BaseComponent } from '../BaseComponent'
import { AttackLines } from './AttackLines'
import './Board.css'
import { BoardRow } from './BoardRow'

export class Board extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    return (
      <div className="Board">
        <table>
          <tbody>
          {
            range(this.state.board.m).map(n =>
              <BoardRow key={n} n={n}/>,
            )
          }
          </tbody>
        </table>
        
        <AttackLines/>
      </div>
    )
  }

  componentDidMount() {
    console.log(' board component did mount')
    // heads up !- we will store each board DOM coordinate in the state - we do it from here!
    const boxes = document.querySelectorAll('.BoardRow [data-x]')
    const boxesClientRects = {}
    for (let i = 0; i < boxes.length; i++) {
      const boxEl = boxes.item(i)
      if (!boxEl) {
        return
      }
      const x = parseInt(boxEl.getAttribute('data-x'), 10)
      const y = parseInt(boxEl.getAttribute('data-y'), 10)
      const cr = boxEl.getClientRects()[0]
      boxesClientRects[x + '-' + y] = { 
        clientRect: { x: cr.left, y :cr.top },
        boxId: State.getHelper().box(this.state, x, y).id, 
      }
    }
    this.state.uiState.boxesClientRects = boxesClientRects
    const boardEl = document.querySelector('.Board')
    const boardCR = boardEl ? document.querySelector('.Board').getClientRects()[0] : { left: 0, top: 0 }
    this.state.uiState.boardClientRect = { x: boardCR.left, y: boardCR.top }
    const boxEl = document.querySelector('.BoardRow [data-x]')
    this.state.uiState.boxSize = boxEl ? { width: boxEl.getClientRects()[0].width, height: boxEl.getClientRects()[0].height } : { width: 1, height: 1 } // for testing
  }
}
