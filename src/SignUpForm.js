import React from 'react';

export default function (props) {
  return (
    <form id='signupForm' onSubmit={props.onSubmit}>
      <div>
        <label>邮箱:</label>
        <input type='email' value={props.formData.email} onChange={props.onChange} placeholder='请设置邮箱作为登录账号' />
      </div>
      <div>
        <label>密码:</label>
        <input type='password' value={props.formData.password} onChange={props.onChange} />
      </div>
      <div className='options'>
        <input id='signupBtn' type='submit' value='注册' />
      </div>
    </form>
  )
}