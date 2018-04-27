import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'

it('App renders without crashing', () => {
  const parent = document.createElement('div')
  ReactDOM.render(<App />, parent)
  ReactDOM.unmountComponentAtNode(parent)
})
