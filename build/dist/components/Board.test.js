import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Board } from './Board';
import { State } from '../state/state';
it('Board renders without crashing', function () {
    var parent = document.createElement('div');
    ReactDOM.render(React.createElement(Board, null), parent);
    expect(parent.querySelectorAll('[data-x]').length).toBe(State.get().board.m * State.get().board.n);
    ReactDOM.unmountComponentAtNode(parent);
});
//# sourceMappingURL=Board.test.js.map