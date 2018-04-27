import * as React from 'react'
import { IPlayer } from '../state/state-interfaces'
import { BaseComponent } from './BaseComponent'
import './PlayerResources.css'

export class PlayerResources extends BaseComponent<{player:IPlayer}> {
  constructor(props:{player:IPlayer}) {
    super(props)
  }
  public render() {
    return (
      <div className="PlayerResources">
        {this.props.player.name}
        <ul className="resource-list">
          {this.props.player.resources.map(r =>
          <li key={r.id}><img src={r.icon} alt={r.name}/>:{r.value}</li>,
          )}
        </ul>
      </div>
    )
  }
}
