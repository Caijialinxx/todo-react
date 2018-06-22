import React, { Component } from 'react'
import { signUp, logIn, reset } from './leanCloud'
import './UserDialog.css'
import $ from 'jquery'
import { deepCopyByJSOn } from './deepCopyByJSON';

class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'defaultSection',
      formData: {
        email: '',
        password: ''
      }
    }
  }
  render() {
    let defaultSection = (
      <div className='login-wrapper'>
        <nav>
          <a id='loginNav' onClick={this.switchAction.bind(this)} className='active' href='javascript:void(0)'>登　录</a>
          <div className='divided'></div>
          <a id='signupNav' onClick={this.switchAction.bind(this)} href='javascript:void(0)'>注　册</a>
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
            <div className='options'>
              <input id='signupBtn' type='submit' value='注册' />
            </div>
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
            <div className='options'>
              <a onClick={this.showResetSection.bind(this)} href='javascript:void(0)'>忘记密码？</a>
              <input id='loginBtn' type='submit' value='登录' />
            </div>
          </form>
        </div>
      </div>
    )
    let resetSection = (
      <div className='reset-wrapper'>
        <h1>重置密码</h1>
        <form id='resetForm' onSubmit={this.resetPassword.bind(this)}>
          <div>
            <label>邮箱:</label>
            <input type='text' value={this.state.formData.email} onChange={this.changeFormData.bind(this)} placeholder='注册的邮箱（即登录账号）' />
          </div>
          <div className='options'>
            <a onClick={this.showDefaultSection.bind(this)} href='javascript:void(0)'>返回登录</a>
            <input id='sendEmailBtn' type='submit' value='发送重置密码邮件' />
          </div>
        </form>
      </div>
    )
    return (
      <div className='userDialog-wrapper'>
        <div className='userDialog'>
          {this.state.selectedTab === 'defaultSection' ? defaultSection : resetSection}
        </div>
      </div>
    )
  }
  showResetSection() {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.selectedTab = 'resetSection'
    this.setState(state_copy)
  }
  resetPassword(e) {
    e.preventDefault()
    let email = this.state.formData.email,
      success = () => {
        alert('已向您的邮箱发送重置密码邮件，请转至邮箱查收！')
      },
      error = (error) => {
        console.error(error)
      }
    reset(email, success, error)
  }
  switchAction(e) {
    $(e.target).addClass('active')
    $(e.target).siblings().removeClass('active')
    if ($(e.target).html() === '注　册') {
      $('#signupForm').css({ display: 'block' })
      $('#loginForm').css({ display: 'none' })
    } else {
      $('#signupForm').css({ display: 'none' })
      $('#loginForm').css({ display: 'block' })
    }
  }
  showDefaultSection() {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.selectedTab = 'defaultSection'
    this.setState(state_copy)
  }
  signUpOrLogIn(e) {
    e.preventDefault()
    let { email, password } = this.state.formData, success = null, error = (error) => { console.log(error) }
    if (e.target.id === 'signupForm') {
      success = (user) => {
        $('#signupNav').removeClass('active').siblings().addClass('active')
        $('#signupForm').css({ display: 'none' })
        $('#loginForm').css({ display: 'block' })
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