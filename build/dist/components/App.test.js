import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
it('App renders without crashing', function () {
    var parent = document.createElement('div');
    ReactDOM.render(React.createElement(App, null), parent);
    ReactDOM.unmountComponentAtNode(parent);
});
//# sourceMappingURL=App.test.js.map