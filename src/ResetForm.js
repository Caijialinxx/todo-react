import React, { Component } from 'react'

export default class ResetForm extends Component {
  render() {
    return (
      <form id='resetForm' onSubmit={this.props.onSubmit.bind(this)}>
        <h1>重置密码</h1>
        <div>
          <label>邮箱:</label>
          <input type='text' value={this.props.formData.email} onChange={this.props.onChange.bind(this)} placeholder='注册的邮箱（即登录账号）' />
        </div>
        <div className='options'>
          <a onClick={this.props.onShow.bind(this)} href='javascript:void(0)'>返回登录</a>
          <input id='sendEmailBtn' type='submit' value='发送重置密码邮件' />
        </div>
      </form>
    )
  }
}