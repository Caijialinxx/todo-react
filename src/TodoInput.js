import React from 'react'
import './TodoInput.css'
import icon_add from './icon/add.svg'

export default function (props) {
  return (
    <div className='inputWrapper'>
      <label htmlFor='add'><img src={icon_add} alt='add' /></label>
      <input id='add' type="text"
        value={props.content}
        onKeyUp={submit.bind(null, props)}
        onChange={change.bind(null, props)}
        maxLength="40" placeholder="添加待办事项" />
    </div>
  )
}

function submit(props, e) {
  if (e.target.value.trim() !== '' && e.keyCode === 13) {
    props.onSubmit()
  }
}

function change(props, e) {
  props.onChange(e.target.value)
}