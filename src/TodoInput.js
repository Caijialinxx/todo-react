import React, { Component } from 'react'
import icon_add from './icon/add.svg'

class TodoInput extends Component {
  render() {
    return <div className={this.props.className}>
      <img id={this.props.id} src={icon_add} alt={this.props.id} />
      <input type="text" value={this.props.content} maxLength="40" placeholder="添加待办事项" />
    </div>
  }
}

export default TodoInput