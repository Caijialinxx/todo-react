import React, { Component } from 'react'
import { signUp, logIn } from './leanCloud'
import './UserDialog.css'
import $ from 'jquery'

class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {
        email: '',
        password: ''
      }
    }
  }
  render() {
    return (
      <div className='userDialog-wrapper'>
        <div className='userDialog'>
          <nav>
            <a id='signupNav' onClick={this.switchAction.bind(this)} href='javascript:void(0)'>注　册</a>
            <div className='divided'></div>
            <a id='loginNav' onClick={this.switchAction.bind(this)} className='active' href='javascript:void(0)'>登　录</a>
          </nav>
          <div className='form-wrapper'>
            <form id='signupForm' onSubmit={this.signUpOrLogIn.bind(this)}>
              <div>
                <label>邮箱:</label>
                <input type='text' value={this.state.formData.email} onChange={this.changeFormData.bind(this)} placeholder='请设置邮箱作为登录账号' />
              </div>
              <div>
                <label>密码:</label>
                <input type='password' value={this.state.formData.password} onChange={this.changeFormData.bind(this)} />
              </div>
              <input id='signupBtn' type='submit' value='注册' />
            </form>
            <form id='loginForm' onSubmit={this.signUpOrLogIn.bind(this)}>
              <div>
                <label>邮箱:</label>
                <input type='text' value={this.state.formData.email} onChange={this.changeFormData.bind(this)} placeholder='' />
              </div>
              <div>
                <label>密码:</label>
                <input type='password' value={this.state.formData.password} onChange={this.changeFormData.bind(this)} />
              </div>
              <div className='options'><a href='javascript:void(0)'>忘记密码？</a></div>
              <input id='loginBtn' type='submit' value='登录' />
            </form>
          </div>
        </div>
      </div>
    )
  }
  switchAction(e) {
    $(e.target).addClass('active')
    $(e.target).siblings().removeClass('active')
    if ($(e.target).html() === '注　册') {
      $('#signupForm').css({ display: 'flex' })
      $('#loginForm').css({ display: 'none' })
    } else {
      $('#signupForm').css({ display: 'none' })
      $('#loginForm').css({ display: 'flex' })
    }
  }
  signUpOrLogIn(e) {
    e.preventDefault()
    let { email, password } = this.state.formData, success = null, error = (error) => { console.log(error) }
    if (e.target.id === 'signupForm') {
      success = (user) => {
        $('#signupNav').removeClass('active').siblings().addClass('active')
        $('#signupForm').css({ display: 'none' })
        $('#loginForm').css({ display: 'flex' })
        this.props.onSignUpOrLogIn.call(undefined, user)
      }
      signUp(email, password, success, error)
    } else {
      success = (user) => { this.props.onSignUpOrLogIn.call(undefined, user) }
      logIn(email, password, success, error)
    }
  }
  changeFormData(e) {
    let state_copy = JSON.parse(JSON.stringify(this.state)),
      key = e.target.type === 'text' ? 'email' : 'password'
    state_copy.formData[key] = e.target.value
    this.setState(state_copy)
  }
}

export default UserDialog