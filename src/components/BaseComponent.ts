import * as React from 'react';
import './App.css';
import { IState } from '../model/interfaces';
import { store } from '../redurcers/store';
import { State } from '../model/State';
import { Unsubscribe } from 'redux';

export class BaseComponent<Prop> extends React.Component<Prop, IState> {
  public storeUsubscribe: Unsubscribe;

  constructor(props:Prop){
    super(props)
    this.state = State.get()
    this.storeUsubscribe = store.subscribe(()=>{
      this.setState(State.get())
    })
  }
  public componentWillUnmount(){
    if(super.componentWillUnmount!==undefined){
      super.componentWillUnmount()
    }
    this.storeUsubscribe()
  }  
}