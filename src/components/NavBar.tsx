import * as React from 'react'
import * as logo from '../assets/logo.png'
import { ACTION_CHANGE_GAME_SETTINGS, IChangeGameSettingsAction } from '../reducers/changeGameSettings'
import { store } from '../reducers/store'
import { Game } from '../state/game'
import { State } from '../state/state'
import { BaseComponent } from './BaseComponent'
import './NavBar.css'

export class BarNav extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    return (
      <nav className="navbar navbar-light bg-light">
      
        <button className="navbar-toggler" type="button" onClick={this.toggleCollapseHandler} data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <span><input type="checkbox" checked={this.state.game.allowDiagonal} onChange={allowDiagonalChanged}/>Allow Diagonals</span>

        {this.state.game.realTime && <span><input type="checkbox" checked={this.state.game.paused} onChange={pauseClicked} /> Paused  </span>}

        {this.state.game.realTime && <span>Interval: <input type="number" onChange={changeInterval} defaultValue={this.state.game.interval + ''}/></span>}

        <span><input type="checkbox" checked={this.state.game.realTime} onChange={realTimeChanged}/> Real Time?</span> */}

        <span>{!this.state.game.realTime && <button onClick={Game.getInstance().nextTurn}>Next Turn!</button>}</span>
              
        <span>TIME: {this.state.game.time / 1000}</span>
        <img className="AppLogo" src={logo} alt="perplexed wars" />

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="https://github.com/cancerberoSgx/perplexed-wars">Project home</a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <span>{!this.state.game.realTime && <button onClick={Game.getInstance().nextTurn}>Next Turn!</button>}</span>
            </li>
            <li className="nav-item active">
              <input type="checkbox" checked={this.state.game.realTime} onChange={realTimeChanged}/> Real Time?
            </li>
            <li className="nav-item">
            {this.state.game.realTime && <span><input type="checkbox" checked={this.state.game.paused} onChange={pauseClicked} /> Paused  </span>}
            </li>
            <li className="nav-item">
            {this.state.game.realTime && <span>Interval: <input type="number" onChange={changeInterval} defaultValue={this.state.game.interval + ''}/></span>}
            </li>
            <li className="nav-item">
              <input type="checkbox" checked={this.state.game.allowDiagonal} onChange={allowDiagonalChanged}/>Allow Diagonals
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        
      </nav >
    )
  }
  toggleCollapseHandler(e) {
    const CLASS_SHOW = 'show'
    const CLASS_COLLAPSE = 'collapse'
    const CLASS_COLLAPSING = 'collapsing'
    const CLASS_COLLAPSED = 'collapsed'
    const ANIMATION_TIME = 350 // 0.35s
    
    const el = e.currentTarget
    const collapseTargetId = el.dataset.target || el.href || null
    if (collapseTargetId) {
      const targetEl = document.querySelector(collapseTargetId)
      const isShown = targetEl.classList.contains(CLASS_SHOW) || targetEl.classList.contains(CLASS_COLLAPSING)
      if (!isShown) {
        targetEl.classList.remove(CLASS_COLLAPSE)
        targetEl.classList.add(CLASS_COLLAPSING)
        targetEl.style.height = 0
        targetEl.classList.remove(CLASS_COLLAPSED)
        setTimeout(() => {
          targetEl.classList.remove(CLASS_COLLAPSING)
          targetEl.classList.add(CLASS_COLLAPSE, CLASS_SHOW)
          targetEl.style.height = ''
        }, ANIMATION_TIME)
        targetEl.style.height = targetEl.scrollHeight + 'px'
      } else {
        targetEl.style.height = `${targetEl.getBoundingClientRect().height}px`
        targetEl.offsetHeight // force reflow
        targetEl.classList.add(CLASS_COLLAPSING)
        targetEl.classList.remove(CLASS_COLLAPSE, CLASS_SHOW)
        targetEl.style.height = ''
        setTimeout(() => {
          targetEl.classList.remove(CLASS_COLLAPSING)
          targetEl.classList.add(CLASS_COLLAPSE)
        }, ANIMATION_TIME)
      }
    }
  }
}



function changeInterval(e:React.ChangeEvent<HTMLInputElement>) {
  const interval = parseInt(e.currentTarget.value, 10)
  if (interval > 200) { // TODO: validation and throttle
    store().dispatch({
      type: ACTION_CHANGE_GAME_SETTINGS,
      interval,
    }as IChangeGameSettingsAction)
  }
}
function allowDiagonalChanged(e:React.ChangeEvent<HTMLInputElement>) {
  store().dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    allowDiagonal: !State.get().game.allowDiagonal,
  }as IChangeGameSettingsAction)
}
function realTimeChanged(e:React.ChangeEvent<HTMLInputElement>) {
  store().dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    realTime: !!e.currentTarget.checked,
  }as IChangeGameSettingsAction)
}
function pauseClicked(e:React.ChangeEvent<HTMLInputElement>) {
  store().dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    paused: !State.get().game.paused,
  }as IChangeGameSettingsAction)
}
