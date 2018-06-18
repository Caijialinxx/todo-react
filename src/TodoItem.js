import React, { Component } from 'react'
import icon_undone from './icon/square.svg'
import icon_done from './icon/square_ok.svg'
import icon_delete from './icon/bin.svg'
import icon_up from './icon/up.svg'
import icon_down from './icon/down.svg'

class TodoItem extends Component {
  render() {
    let statusImg
    if (this.props.todo.status === 'undone') {
      statusImg = icon_undone
    } else if(this.props.todo.status === 'done') {
      statusImg = icon_done
    }

    return <li>
      <div className={this.props.className.item} onClick={this.toggle.bind(this)}>
        <img className={this.props.todo.status} src={statusImg} alt='status' />
        <span className={this.props.todo.status}>{this.props.todo.content}</span>
      </div>
      <div className={this.props.className.options}>
        <img src={icon_up} alt='up' />
        <img src={icon_down} alt='down' />
        <img src={icon_delete} alt='delete' onClick={this.delete.bind(this)} />
      </div>
    </li>
  }
  toggle(e) {
    if (this.props.todo.status === 'undone') {
      this.props.todo.status = 'done'
    } else if(this.props.todo.status === 'done') {
      this.props.todo.status = 'undone'
    }
    this.props.onToggle.call(undefined, e.currentTarget, { now: this.props.todo.status, undone: icon_undone, done: icon_done });
  }
  delete(){
    this.props.onDelete.call(undefined, this.props.todo)
  }
}

export default TodoItem