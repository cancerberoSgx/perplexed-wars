import * as React from 'react'
import { BaseComponent } from './BaseComponent'
import { IUnitType, IUnitSelectionInfo } from 'state/state-interfaces'
import './UnitSelectionInfo.css'
import Draggable from 'react-draggable' 
import { State } from 'state/state'


export class UnitSelectionInfo extends BaseComponent<{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}> {
  constructor(props:{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}) {
    super(props)
  }
  public render() {
    if (this.props.unitSelection && this.props.unitSelection.length) {
      const selected = this.props.unitSelection[0]
      return (
        <Draggable handle=".UnitSelectionInfo">
        <table className="UnitSelectionInfo"><tbody>
        <tr><td>Name: </td><td><img src={selected.unit.type.icon}/>{selected.unit.type.name}</td></tr>
        <tr><td>Health: </td><td>{selected.unit.state.health} / {selected.unit.type.properties.health}</td></tr>
        <tr><td>Kill count: </td><td>{selected.unit.killCount}</td></tr>
        </tbody></table>
        </Draggable>
      )
    }

    if (this.props.unitTypeSelection) {
      const extras = this.props.unitTypeSelection.extraDescriptionProperties && this.props.unitTypeSelection.extraDescriptionProperties || []
      return (
          <Draggable handle=".UnitSelectionInfo">
            <table className="UnitSelectionInfo"><tbody>
              <tr><td>Name</td><td><img src={this.props.unitTypeSelection.icon}/>{this.props.unitTypeSelection.name}</td></tr>
              <tr><td>Damage</td><td>{this.props.unitTypeSelection.properties.damage}</td></tr>
              <tr><td>Health</td><td>{this.props.unitTypeSelection.properties.health}</td></tr>
              <tr><td>Range</td><td>  {this.props.unitTypeSelection.properties.range}</td></tr>
              <tr><td>Territory</td><td>  {this.props.unitTypeSelection.properties.range}</td></tr>
              {extras.map(p => <tr key={p.key}><td>{p.key}</td><td dangerouslySetInnerHTML={{ __html: p.value }}></td></tr>)}
              <tr><td>Description</td><td>{this.props.unitTypeSelection.description}</td></tr>
            </tbody></table>
          </Draggable>
      )
    } 
    return (
      <div className="UnitSelectionInfo"/>
    )   
  }

}
