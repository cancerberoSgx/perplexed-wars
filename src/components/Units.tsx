import * as React from 'react';
import { IUnit, IBox } from '../state/interfaces';
import { BaseComponent } from './BaseComponent';
import './Units.css';

export class Units extends BaseComponent<{units:IUnit[], box:IBox}>  {
  constructor(props:{units:IUnit[], box:IBox}){
    super(props)
  }
  public render() {
    return (
      <div key={this.props.box.id} className="Units"> {
      this.props.units.map(unit=> 
        <img 
          key={unit.id} 
          src={unit.type.image} 
          data-id={unit.playerId} 
          className="Unit"/>
      )
      }
      </div>
    )
  }
  public getComponentName(): string {
    return 'Units'
  }
}