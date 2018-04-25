import * as React from 'react';
import { IPlayer } from '../state/state-interfaces';
import { BaseComponent } from './BaseComponent';

export class PlayerResources extends BaseComponent<{player:IPlayer}> {
  constructor(props:{player:IPlayer}){
    super(props)
  }
  public render() {
    return (
      <div className="PlayerResources">
        {this.props.player.name}
        <ul>
          {this.props.player.resources.map(r=>
          <li key="res_{r.id}">{r.name}: {r.value}</li>
          )}
        </ul>
      </div>
    );
  }
}
