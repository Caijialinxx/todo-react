import React from 'react'
import './TodoItem.css'
import icon_undone from './icon/square.png'
import icon_done from './icon/square_ok.png'
import icon_delete from './icon/bin.png'
import icon_top from './icon/top.png'
import icon_up from './icon/up.png'
import icon_down from './icon/down.png'
import icon_bottom from './icon/bottom.png'

export default function (props) {
  let statusImg = props.todo.status === 'undone' ? icon_undone : icon_done

  return (
    <li>
      <div className='itemWrapper' onClick={toggle.bind(null, props)}>
        <img src={statusImg} alt='status' />
        <span className={props.todo.status}>{props.todo.content}</span>
      </div>
      <div className='optionsWrapper'>
        <img src={icon_top} alt='top' onClick={top.bind(undefined, props)} />
        <img src={icon_up} alt='up' onClick={up.bind(undefined, props)} />
        <img src={icon_down} alt='down' onClick={down.bind(undefined, props)} />
        <img src={icon_bottom} alt='bottom' onClick={bottom.bind(undefined, props)} />
        <img src={icon_delete} alt='delete' onClick={deleteItem.bind(undefined, props)} />
      </div>
    </li>
  )
}

function toggle(props, e) {
  props.onToggle(e.currentTarget, { todo: props.todo, undone: icon_undone, done: icon_done });
}
function top(props, e) {
  props.onMove(e.currentTarget, 'toTop')
}
function up(props, e) {
  props.onMove(e.currentTarget, 'moveUp')
}
function down(props, e) {
  props.onMove(e.currentTarget, 'moveDown')
}
function bottom(props, e) {
  props.onMove(e.currentTarget, 'toBottom')
}
function deleteItem(props) {
  props.onDelete(props.todo)
}