
import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {App} from './components/App'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

registerServiceWorker();




// import * as ReactDOM from 'react-dom';
// import App from './App';


// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import {App} from './components/App'
// import rootReducer from './reducers'
// ​
// const store = createStore(rootReducer)
// ​
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )


