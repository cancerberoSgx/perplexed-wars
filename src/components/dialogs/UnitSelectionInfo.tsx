import * as React from 'react'
import Draggable from 'react-draggable'
import { IUnitSelectionInfo, IUnitType } from '../../state/state-interfaces'
import { BaseComponent } from '../BaseComponent'
import './UnitSelectionInfo.css'
import { cleanAllDialogs } from './DialogsContainer'


export class UnitSelectionInfo extends BaseComponent<{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}> {
  constructor(props:{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}) {
    super(props)
  }
  public render() {
    if (this.props.unitSelection && this.props.unitSelection.length) {
      const selected = this.props.unitSelection[0]
      return (
        <Draggable handle=".UnitSelectionInfo">
        <table className="UnitSelectionInfo AppPanel can-render" onClick={cleanAllDialogs}><tbody>
        <tr><td>Name: </td><td><img src={selected.unit.type.icon}/>{selected.unit.type.name}</td></tr>
        <tr><td>Health: </td><td className="value">{selected.unit.state.health} / {selected.unit.type.properties.health}</td></tr>
        <tr><td>Kill count: </td><td className="value">{selected.unit.killCount}</td></tr>
        </tbody></table>
        </Draggable>
      )
    }

    if (this.props.unitTypeSelection) {
      const extras = this.props.unitTypeSelection.extraDescriptionProperties && this.props.unitTypeSelection.extraDescriptionProperties || []
      return (
          <Draggable handle=".UnitSelectionInfo">
            <table className="UnitSelectionInfo AppPanel can-render"><tbody>
              <tr><td className="label">{this.props.unitTypeSelection.name}</td><td><img className="UnitSelectionInfoUnitTypeImage" src={this.props.unitTypeSelection.icon}/></td></tr>
              <tr><td className="label">Damage</td><td className="value">{this.props.unitTypeSelection.properties.damage}</td></tr>
              <tr><td className="label">Health</td><td className="value">{this.props.unitTypeSelection.properties.health}</td></tr>
              <tr><td className="label">Range</td><td className="value">  {this.props.unitTypeSelection.properties.range}</td></tr>
              <tr><td className="label">Territory</td><td className="value">  {this.props.unitTypeSelection.properties.range}</td></tr>
              {extras.map(p => <tr key={p.key}><td>{p.key}</td><td className="value" dangerouslySetInnerHTML={{ __html: p.value }}></td></tr>)}
              <tr><td colSpan={2}>{this.props.unitTypeSelection.description}</td></tr>
            </tbody></table>
          </Draggable>
      )
    } 
    return (
      <Draggable handle=".UnitSelectionInfo">
      <table className="UnitSelectionInfo AppPanel" ><tbody></tbody></table>
      </Draggable>
    )   
  }
}
