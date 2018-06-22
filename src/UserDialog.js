import React, { Component } from 'react'
import { signUp, logIn, reset } from './leanCloud'
import './UserDialog.css'
import $ from 'jquery'
import { deepCopyByJSOn } from './deepCopyByJSON';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import ResetForm from './ResetForm';

class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'login',
      selectedTab: 'defaultSection',
      formData: {
        email: '',
        password: ''
      }
    }
  }
  render() {
    let signupForm = <SignUpForm formData={this.state.formData} onSubmit={this.signUpOrLogIn.bind(this)} onChange={this.changeFormData.bind(this)} />
    let loginForm = <LogInForm formData={this.state.formData} onSubmit={this.signUpOrLogIn.bind(this)} onChange={this.changeFormData.bind(this)} onForget={this.showResetSection.bind(this)} />
    let defaultSection = (
      <div className='login-wrapper'>
        <nav>
          <a id='loginNav' onClick={this.switchAction.bind(this)} className='active' href='javascript:void(0)'>登　录</a>
          <div className='divided'></div>
          <a id='signupNav' onClick={this.switchAction.bind(this)} href='javascript:void(0)'>注　册</a>
        </nav>
        <div className='form-wrapper'>
          {this.state.selected === 'login' ? loginForm : signupForm}
        </div>
      </div>
    )
    let resetSection = <ResetForm formData={this.state.formData} onSubmit={this.resetPassword.bind(this)} onChange={this.changeFormData.bind(this)} onShow={this.showDefaultSection.bind(this)} />
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
        alert(error)
      }
    reset(email, success, error)
  }
  switchAction(e) {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.selected = $(e.target)[0].id === 'loginNav' ? 'login' : 'signup'
    $(e.target).addClass('active').siblings().removeClass('active')
    this.setState(state_copy)
  }
  showDefaultSection() {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.selectedTab = 'defaultSection'
    this.setState(state_copy)
  }
  signUpOrLogIn(e) {
    e.preventDefault()
    let state_copy = deepCopyByJSOn(this.state)
    let { email, password } = this.state.formData, success = null, error = (error) => { alert(error) }
    if (email.trim() === '' || password === '') {
      alert('账号或密码不能为空！')
    } else if (this.state.selected === 'signup') {
      success = () => {
        alert(`已向你的邮箱（${email.trim()}）发送验证邮件，请转至邮箱查收并进行验证！`)
        $('#signupNav').removeClass('active').siblings().addClass('active')
        state_copy.selected = 'login'
        this.setState(state_copy)
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