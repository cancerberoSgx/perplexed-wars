import * as React from 'react'
import { BaseComponent } from './BaseComponent'
import { IUnitType, IUnitSelectionInfo } from 'state/state-interfaces'
import './UnitSelectionInfo.css'

export class UnitSelectionInfo extends BaseComponent<{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}> {
  constructor(props:{unitTypeSelection: IUnitType, unitSelection: IUnitSelectionInfo[]}) {
    super(props)
  }
  public render() {
    if (this.props.unitSelection && this.props.unitSelection.length) {
      return (
        <table className="UnitSelectionInfo"><tbody>
        <tr><td>Name</td><td>{this.props.unitSelection[0].unitId}</td></tr>
        </tbody></table>
      )
    }

    if (this.props.unitTypeSelection) {
      return (
      
        <table className="UnitSelectionInfo"><tbody>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        <tr><td>Name</td><td>  {this.props.unitTypeSelection.name}</td></tr>
        </tbody></table>
      )
    } 
    
    return (
      <div className="UnitSelectionInfo"/>
    )   
  }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate', this.props.unitTypeSelection && this.props.unitTypeSelection.id)
  // }
}
