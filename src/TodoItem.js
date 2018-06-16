import React, { Component } from 'react'
import icon_undone from './icon/square.svg'
import icon_delete from './icon/bin.svg'
import icon_up from './icon/up.svg'
import icon_down from './icon/down.svg'

class TodoItem extends Component {
  render() {
    return <li>
      <div className={this.props.props.item.className}>
        <img id={this.props.props.item.statusBtnID} src={icon_undone} />
        <span>{this.props.content}</span>
      </div>
      <div className={this.props.props.options.className}>
        <img id={this.props.props.options.upBtnID} src={icon_up} />
        <img id={this.props.props.options.downBtnID} src={icon_down} />
        <img id={this.props.props.options.deleteBtnID} src={icon_delete} />
      </div>
    </li>
  }
}

export default TodoItem