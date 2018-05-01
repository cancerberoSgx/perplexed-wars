import * as React from 'react'
import { range } from '../../util/util'
import { BaseComponent } from '../BaseComponent'
import { BoardRow } from './BoardRow'
import './AttackLines.css'
import { State } from '../../state/state'

export class AttackLines extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    const attackPoints = this.state.uiState.unitAttacks.map(attack => 
      ({
        attacker: this.state.uiState.boxesClientRects[attack.attackerBox.x + '-' + attack.attackerBox.y], 
        attacked: this.state.uiState.boxesClientRects[attack.attackedBox.x + '-' + attack.attackedBox.y],
        id: attack.attackedBox.id + '-' + attack.attackedBox.id,
      }),
    )
    
    return (
      <svg className="AttackLines" >
      {attackPoints.map((attack, i) => 
        <line key={'attack-line_' + i} className="line"  x1={attack.attacker.clientRect.x} y1={attack.attacker.clientRect.y - this.state.uiState.boardClientRect.y} x2={attack.attacked.clientRect.x} y2={attack.attacked.clientRect.y - this.state.uiState.boardClientRect.y} stroke="black" />,
      )}
      </svg>
    )
  }
}

// import { LineCss } from '../../implementations/war2/LineCss'
// function lineStyle(a: {x: number, y: number}, b: {x: number, y: number}):any {
//   console.log(a.x, a.y, b.x, b.y)
//   const styles = (LineCss as any).forPointsWithStroke(a, b, 2)
//   const result = { width: styles.width, height: styles.height,  top: styles.top, left: styles.left, transform: `rotate(${styles.degrees}deg)`, border: 'solid' }
  
//   return result
// }
