import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoardRow } from './BoardRow';
import { State } from '../state/state';
it('BoardRow renders without crashing', function () {
    var parent = document.createElement('tbody');
    ReactDOM.render(React.createElement(BoardRow, { n: 1 }), parent);
    expect(parent.querySelectorAll('td').length).toBe(State.get().board.n);
    ReactDOM.unmountComponentAtNode(parent);
});
//# sourceMappingURL=BoardRow.test.js.map