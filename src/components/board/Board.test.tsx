import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Board } from './Board'
import { State } from '../../state/state'

import { Game } from '../../state/game'
beforeAll(() => {
  Game.getInstance().start()
})

it('Board renders without crashing', () => {
  const parent = document.createElement('div')
  ReactDOM.render(<Board />, parent)
  expect(parent.querySelectorAll('[data-x]').length).toBe(State.get().board.m * State.get().board.n)
  ReactDOM.unmountComponentAtNode(parent)
})
