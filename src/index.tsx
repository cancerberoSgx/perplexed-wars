
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { Game } from './state/game'
import { State } from './state/state'
import { Behavior } from './state/behavior'
import { Events } from './state/IGameFramework'

Game.getInstance().on(Events.EVENT_AFTER_GAME_STARTS, (e) => {

  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement,
  )  
  registerServiceWorker()
  
})
Game.getInstance().start()
