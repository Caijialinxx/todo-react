import React from 'react'

export default function (props) {
  return (
    <form id='loginForm' onSubmit={props.onSubmit}>
      <div>
        <label>邮箱:</label>
        <input type='text' value={props.formData.email} onChange={props.onChange} />
      </div>
      <div>
        <label>密码:</label>
        <input type='password' value={props.formData.password} onChange={props.onChange} />
      </div>
      <div className='options'>
        <a onClick={props.onForget} href='javascript:void(0)'>忘记密码？</a>
        <input id='loginBtn' type='submit' value='登录' />
      </div>
    </form>
  )
}