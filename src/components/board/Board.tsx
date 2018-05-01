import * as React from 'react'
import { range } from '../../util/util'
import { BaseComponent } from '../BaseComponent'
import { BoardRow } from './BoardRow'
import './Board.css'
import { State } from 'state/state'
import { AttackLines } from './AttackLines'

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

        {/* <svg id="svg1" width="0" height="0" >
        <line x1="10" y1="20" x2="98" y2="129" stroke="black" />

         <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
        </svg> */}
        
      <AttackLines/>

      </div>
    )
  }

  componentDidMount() {
    // heads up !- we will store each board DOM coordinate in the state so we must do it from here! 

    const boxes = document.querySelectorAll('.BoardRow [data-x]')
    const boxesClientRects = {}
    for (let i = 0; i < boxes.length; i++) {
      const boxEl = boxes.item(i)
      const x = parseInt(boxEl.getAttribute('data-x'), 10)
      const y = parseInt(boxEl.getAttribute('data-y'), 10)
      const cr = boxEl.getClientRects()[0]
      boxesClientRects[x + '-' + y] = { 
        clientRect: { x: cr.left, y :cr.top },
        boxId: State.getHelper().box(this.state, x, y).id, 
      }
    }
    this.state.uiState.boxesClientRects = boxesClientRects
    const boardCR = document.querySelector('.Board').getClientRects()[0]
    this.state.uiState.boardClientRect = { x: boardCR.left, y: boardCR.top }
  }
}



// import { LineCss } from '../../implementations/war2/LineCss'
// function lineStyle():any {
//   const styles = (LineCss as any).forPointsWithStroke({ x: 50, y: 50 }, { x: 220, y: 323 }, 4)
//   const result = { width: styles.width, height: styles.height,  top: styles.top, left: styles.left, transform: `rotate(${styles.degrees}deg)`, border: 'solid' }
//   // console.log(styles , result)  
//   return result
// }
