import * as React from 'react'
import { BaseComponent } from '../BaseComponent'
import { IUnitType, IUnitSelectionInfo } from '../../state/state-interfaces'
import './UnitSelectionInfo.css'
import Draggable from 'react-draggable' 
import { State } from '../../state/state'
import { Game } from '../../state/game'
import { store, ACTION_VOID } from '../../reducers/store'


export class UnitSelectionInfo extends BaseComponent<{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}> {
  constructor(props:{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}) {
    super(props)
  }
  public render() {
    if (this.props.unitSelection && this.props.unitSelection.length) {
      const selected = this.props.unitSelection[0]
      return (
        <Draggable handle=".UnitSelectionInfo">
        <table className="UnitSelectionInfo AppPanel" onClick={panelClicked}><tbody>
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
            <table className="UnitSelectionInfo AppPanel" onClick={panelClicked}><tbody>
              {/* <tr><td></td><td>{'<<drag me>>s'}</td></tr> */}
              <tr><td className="label">{this.props.unitTypeSelection.name}</td><td><img className="UnitSelectionInfoUnitTypeImage" src={this.props.unitTypeSelection.icon}/></td></tr>
              <tr><td className="label">Damage</td><td>{this.props.unitTypeSelection.properties.damage}</td></tr>
              <tr><td className="label">Health</td><td>{this.props.unitTypeSelection.properties.health}</td></tr>
              <tr><td className="label">Range</td><td>  {this.props.unitTypeSelection.properties.range}</td></tr>
              <tr><td className="label">Territory</td><td>  {this.props.unitTypeSelection.properties.range}</td></tr>
              {extras.map(p => <tr key={p.key}><td>{p.key}</td><td dangerouslySetInnerHTML={{ __html: p.value }}></td></tr>)}
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

function panelClicked() {
  State.modify(State.get(), (s) => { 
    s.uiState.unitSelection = []
    s.uiState.unitTypeSelection = null
  })
  store().dispatch({ type: ACTION_VOID })
}
