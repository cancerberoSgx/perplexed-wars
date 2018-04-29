import * as React from 'react'
import { range } from '../util/util'
import { BaseComponent } from './BaseComponent'
import { BoardRow } from './BoardRow'
import './Board.css'

export class Board extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    return (
      <div className="Board">
      <table>
        <tbody>
        {
          range(this.state.board.m).map(n =>
            <BoardRow key={n} n={n}/>,
          )
        }
        </tbody>
      </table>
      </div>
    )
  }
}
