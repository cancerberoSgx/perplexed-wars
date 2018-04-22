
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import './index.css';
import { Game } from './state/game';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)

Game.getInstance().start()  
