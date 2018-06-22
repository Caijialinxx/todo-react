import React, { Component } from 'react'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import $ from 'jquery'
import { deepCopyByJSOn } from './deepCopyByJSON'

export default class SignUpOrLogIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'login',
    }
  }
  render() {
    return (
      <div className='login-wrapper'>
        <nav>
          <a id='loginNav' onClick={this.switchAction.bind(this)} className='active' href='javascript:void(0)'>登　录</a>
          <div className='divided'></div>
          <a id='signupNav' onClick={this.switchAction.bind(this)} href='javascript:void(0)'>注　册</a>
        </nav>
        <div className='form-wrapper'>
          {
            this.state.selected === 'login'
              ? <LogInForm formData={this.props.formData} onSubmit={this.props.onLogIn} onChange={this.props.onChange} onForget={this.props.onForget} />
              : <SignUpForm formData={this.props.formData} onSubmit={this.props.onSignUp} onChange={this.props.onChange} />
          }
        </div>
      </div>
    )
  }
  switchAction(e) {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.selected = $(e.target)[0].id === 'loginNav' ? 'login' : 'signup'
    $(e.target).addClass('active').siblings().removeClass('active')
    this.setState(state_copy)
  }
}