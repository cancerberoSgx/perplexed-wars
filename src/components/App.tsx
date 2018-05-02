import * as React from 'react'
import { ACTION_VOID, store } from '../reducers/store'
import { State } from '../state/state'
import './App.css'
import './variables.css'
import { BaseComponent } from './BaseComponent'
import { DialogsContainer } from './dialogs/DialogsContainer'
import { BarNav } from './NavBar'
import { Board } from './board/Board'
import { UnitsPanel } from './toolPanel/UnitsPanel'

export class App extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    return (
      <div className="container-fluid App">
        <BarNav/>       
        <UnitsPanel />
        <Board />     
        <DialogsContainer/>     
      </div>
    )
  }
}
