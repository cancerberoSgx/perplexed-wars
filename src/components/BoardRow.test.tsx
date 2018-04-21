import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoardRow } from './BoardRow';
import { State } from '../model/state';

it('BoardRow renders without crashing', () => {
  const parent = document.createElement('tbody');
  ReactDOM.render(<BoardRow n={1}/>, parent);
  expect(parent.querySelectorAll('td').length).toBe(State.get().board.m)
  ReactDOM.unmountComponentAtNode(parent);
});