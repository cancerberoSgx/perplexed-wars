
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from './components/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Game } from './game/game';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)

const game = new Game({
  interval: 1000
})
game.start()
// setTimeout(() => {
//   game.stop()
// }, 20000);
registerServiceWorker()
