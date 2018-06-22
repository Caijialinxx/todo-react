import React, { Component } from 'react'

export default class LogInForm extends Component {
  render() {
    return (
      <form id='loginForm' onSubmit={this.props.onSubmit.bind(this)}>
        <div>
          <label>邮箱:</label>
          <input type='text' value={this.props.formData.email} onChange={this.props.onChange.bind(this)} />
        </div>
        <div>
          <label>密码:</label>
          <input type='password' value={this.props.formData.password} onChange={this.props.onChange.bind(this)} />
        </div>
        <div className='options'>
          <a onClick={this.props.onForget.bind(this)} href='javascript:void(0)'>忘记密码？</a>
          <input id='loginBtn' type='submit' value='登录' />
        </div>
      </form>
    )
  }
}