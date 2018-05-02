import * as React from 'react'
import { IPlayer } from '../../state/state-interfaces'
import { BaseComponent } from '../BaseComponent'
import './PlayerResources.css'

export class PlayerResources extends BaseComponent<{player:IPlayer}> {
  constructor(props:{player:IPlayer}) {
    super(props)
  }
  public render() {
    return (
      <div className="PlayerResources">
        <strong>{this.props.player.name}</strong>: 
        <ul className="resource-list">
          {this.props.player.resources.map(r =>
          <li key={r.id}><img src={r.icon} alt={r.name}/><span className="value">{r.value}</span><span className="per-turn">(+{r.defaultValuePerTurn})</span></li>,
          )}
        </ul>
      </div>
    )
  }
}
