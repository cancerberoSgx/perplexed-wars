import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'

import { Game } from '../state/game'
beforeAll(() => {
  Game.getInstance().start()
})

it('App renders without crashing', () => {
  const parent = document.createElement('div')
  ReactDOM.render(<App />, parent)
  ReactDOM.unmountComponentAtNode(parent)
})
