import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import './index.css';
import { Game } from './state/game';
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
Game.getInstance().start();
Game.getInstance().on('beforeAddUnitSuccess', function () { console.log('beforeAddUnitSuccess'); });
//# sourceMappingURL=index.js.map