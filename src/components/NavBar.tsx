import * as React from 'react'
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
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="#">Hidden brand</a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
      </nav>
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
