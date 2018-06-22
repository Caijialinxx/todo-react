import React, { Component } from 'react'

export default class SignUpForm extends Component {
  render() {
    return (
      <form id='signupForm' onSubmit={this.props.onSubmit.bind(this)}>
        <div>
          <label>邮箱:</label>
          <input type='text' value={this.props.formData.email} onChange={this.props.onChange.bind(this)} placeholder='请设置邮箱作为登录账号' />
        </div>
        <div>
          <label>密码:</label>
          <input type='password' value={this.props.formData.password} onChange={this.props.onChange.bind(this)} />
        </div>
        <div className='options'>
          <input id='signupBtn' type='submit' value='注册' />
        </div>
      </form>
    )
  }
}