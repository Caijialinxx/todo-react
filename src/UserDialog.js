import React, { Component } from 'react'
import './UserDialog.css'

class UserDialog extends Component {
  render() {
    return (
      <div className='userDialog-wrapper'>
        <div className='userDialog'>
          <nav>
            <a href='javascript::void(0)'>注　册</a><div className='divided'></div><a className='active' href='javascript::void(0)'>登　录</a>
          </nav>
          <div className='form-wrapper'>
            <form id='signup'>
              <div>
                <label htmlFor='email'>邮箱:</label>
                <input id='email' type='text' placeholder='请设置邮箱作为登录账号' />
              </div>
              <div>
                <label htmlFor='password'>密码:</label>
                <input id='password' type='password' />
              </div>
              <input id='submit' type='submit' value='注册' />
            </form>
            <form id='login'>
              <div>
                <label htmlFor='email'>邮箱:</label>
                <input id='email' type='text' placeholder='' />
              </div>
              <div>
                <label htmlFor='password'>密码:</label>
                <input id='password' type='password' />
              </div>
              <div className='options'><a href='' >忘记密码？</a></div>
              <input id='submit' type='submit' value='登录' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default UserDialog