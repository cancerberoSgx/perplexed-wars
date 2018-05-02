// TODO: this should be provided by the implementation

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
    const attackPoints = this.state.uiState.unitAttacks.map(attack => {
      return {
        attacker: { ...this.state.uiState.boxesClientRects[attack.attackerBox.x + '-' + attack.attackerBox.y], 
          attackerPlayer: State.getHelper().player(this.state, attack.attackerPlayer), 
        }, 
        attacked: this.state.uiState.boxesClientRects[attack.attackedBox.x + '-' + attack.attackedBox.y],
        // id: attack.attackedBox.id + '-' + attack.attackedBox.id,
      }
    })
    
    return (
      <svg className="AttackLines" >
      {attackPoints.map((attack, i) => 
        <line key={'attack-line_' + i} className="line"  x1={attack.attacker.clientRect.x + this.state.uiState.boxSize.width / 2 + (attack.attacker.attackerPlayer.isAI ? 3 : 0)} y1={attack.attacker.clientRect.y - this.state.uiState.boardClientRect.y + this.state.uiState.boxSize.height / 2 + (attack.attacker.attackerPlayer.isAI ? 3 : 0)} x2={attack.attacked.clientRect.x + this.state.uiState.boxSize.width / 2 + (attack.attacker.attackerPlayer.isAI ? 3 : 0)} y2={attack.attacked.clientRect.y - this.state.uiState.boardClientRect.y + this.state.uiState.boxSize.height / 2 + (attack.attacker.attackerPlayer.isAI ? 3 : 0)} stroke={attack.attacker.attackerPlayer.color} strokeWidth="2" />,
      )}
      </svg>
    )
  }
}
