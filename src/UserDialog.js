import React, { Component } from 'react'
import { signUp, logIn, reset } from './leanCloud'
import './UserDialog.css'
import { deepCopyByJSOn } from './deepCopyByJSON';
import ResetForm from './ResetForm';
import SignUpOrLogIn from './SignUpOrLogIn';

class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'signUpOrLogIn',
      formData: {
        email: '',
        password: ''
      }
    }
  }
  render() {
    let signUpOrLogIn = <SignUpOrLogIn formData={this.state.formData} onSignUp={this.signUp.bind(this)} onLogIn={this.logIn.bind(this)} onChange={this.changeFormData.bind(this)} onForget={this.showResetSection.bind(this)} />
    let resetSection = <ResetForm formData={this.state.formData} onSubmit={this.resetPassword.bind(this)} onChange={this.changeFormData.bind(this)} onShow={this.showDefaultSection.bind(this)} />
    return (
      <div className='userDialog-wrapper'>
        <div className='userDialog'>
          {this.state.selectedTab === 'signUpOrLogIn' ? signUpOrLogIn : resetSection}
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
  showDefaultSection() {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.selectedTab = 'signUpOrLogIn'
    this.setState(state_copy)
  }
  signUp(e) {
    e.preventDefault()
    let { email, password } = this.state.formData,
      success = () => {
        alert(`已向你的邮箱（${email.trim()}）发送验证邮件，请转至邮箱查收并进行验证！`)
        window.location.reload()
      },
      error = (error) => { alert(error) }
    if (email.trim() === '' || password === '') {
      alert('账号或密码不能为空！')
    } else {
      signUp(email, password, success, error)
    }
  }
  logIn(e) {
    e.preventDefault()
    let { email, password } = this.state.formData,
      success = (user) => { this.props.onSignUpOrLogIn.call(undefined, user) },
      error = (error) => { alert(error) }
    if (email.trim() === '' || password === '') {
      alert('账号或密码不能为空！')
    } else {
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