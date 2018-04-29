import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BoardRow } from './BoardRow'
import { State } from '../../state/state'

import { Game } from '../../state/game'
beforeAll(() => {
  Game.getInstance().start()
})

it('BoardRow renders without crashing', () => {
  const parent = document.createElement('tbody')
  ReactDOM.render(<BoardRow n={1}/>, parent)
  expect(parent.querySelectorAll('td').length).toBe(State.get().board.n)
  ReactDOM.unmountComponentAtNode(parent)
})
