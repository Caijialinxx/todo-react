import React, { Component } from 'react'
import './ThemeButton.css'

export default class ThemeButton extends Component {
  render() {
    return (
      <figure className='button-outer'>
        <div className='button-inner'>
          <div className='cube'>
            <div className='ballWrapper'>
              <div className='ball left'></div>
              <div className='ball border'></div>
              <div className='ball right'></div>
            </div>
            <div className='lightInBall'></div>
          </div>
        </div>
      </figure>
    )
  }
}