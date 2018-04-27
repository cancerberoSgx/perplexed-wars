import * as React from 'react';
import './App.css';
import { IState } from '../state/state-interfaces';
import { store } from '../reducers/store';
import { State } from '../state/state';
import { Unsubscribe } from 'redux';

export abstract class BaseComponent<Prop> extends React.Component<Prop, IState>{ 
  public storeUnsubscribe: Unsubscribe;
  constructor(props:Prop){
    super(props)
    this.state = State.get()
    this.storeUnsubscribe = store().subscribe(()=>{
      this.setState(State.get())
    })
  }
  public componentWillUnmount(){
    if(super.componentWillUnmount!==undefined){
      super.componentWillUnmount()
    }
    this.storeUnsubscribe()
  }  
}

//storeUnsubscribe