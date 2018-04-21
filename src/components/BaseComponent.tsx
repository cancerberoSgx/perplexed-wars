import * as React from 'react';
import { IState } from '../model/interfaces';
import './App.css';
import { State } from '../model/State';

export class App extends React.Component<{}, IState> {
  constructor(state:IState){
    super({})
    state = state||State.get()
    // state.
    this.setState(state||State.get())
  }
}
