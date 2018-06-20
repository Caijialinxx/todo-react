import React, { Component } from 'react'
import './UserDialog.css'
import $ from 'jquery'

class UserDialog extends Component {
  render() {
    return (
      <div className='userDialog-wrapper'>
        <div className='userDialog'>
          <nav>
            <a onClick={this.switchAction.bind(this)} href='javascript:void(0)'>注　册</a>
            <div className='divided'></div>
            <a onClick={this.switchAction.bind(this)} className='active' href='javascript:void(0)'>登　录</a>
          </nav>
          <div className='form-wrapper'>
            <form id='signupForm'>
              <div>
                <label>邮箱:</label>
                <input type='text' placeholder='请设置邮箱作为登录账号' />
              </div>
              <div>
                <label>密码:</label>
                <input type='password' />
              </div>
              <input id='signupBtn' type='submit' value='注册' />
            </form>
            <form id='loginForm'>
              <div>
                <label>邮箱:</label>
                <input type='text' placeholder='' />
              </div>
              <div>
                <label>密码:</label>
                <input type='password' />
              </div>
              <div className='options'><a href='' >忘记密码？</a></div>
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
    console.log($(e.target).html())
    if ($(e.target).html() === '注　册') {
      $('#signupForm').css({ display: 'flex' })
      $('#loginForm').css({ display: 'none' })
    } else {
      $('#signupForm').css({ display: 'none' })
      $('#loginForm').css({ display: 'flex' })
    }
  }
}

export default UserDialog