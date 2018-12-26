import React from 'react'

export default function (props) {
  return (
    <form id='resetForm' onSubmit={props.onSubmit}>
      <h1>重置密码</h1>
      <div>
        <label>邮箱:</label>
        <input type='email' value={props.formData.email} onChange={props.onChange} placeholder='注册的邮箱（即登录账号）' />
      </div>
      <div className='options'>
        <a onClick={props.onShow} href='javascript:void(0)'>返回登录</a>
        <input id='sendEmailBtn' type='submit' value='发送重置密码邮件' />
      </div>
    </form>
  )
}