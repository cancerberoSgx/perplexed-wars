
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { Game } from './state/game'
import { State } from 'state/state'
import { Behavior } from 'state/behavior'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
)

Game.getInstance().start()  
registerServiceWorker()
