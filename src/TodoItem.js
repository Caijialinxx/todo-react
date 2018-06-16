import React, { Component } from 'react'
import icon_undone from './icon/square.svg'
import icon_delete from './icon/bin.svg'
import icon_up from './icon/up.svg'
import icon_down from './icon/down.svg'

class TodoItem extends Component {
  render() {
    return <li>
      <div className={this.props.props.item.className}>
        <img id={this.props.props.item.statusBtnID} src={icon_undone} alt={this.props.props.item.statusBtnID} />
        <span>{this.props.content}</span>
      </div>
      <div className={this.props.props.options.className}>
        <img id={this.props.props.options.upBtnID} src={icon_up} alt={this.props.props.options.upBtnID} />
        <img id={this.props.props.options.downBtnID} src={icon_down} alt={this.props.props.options.downBtnID} />
        <img id={this.props.props.options.deleteBtnID} src={icon_delete} alt={this.props.props.options.deleteBtnID} />
      </div>
    </li>
  }
}

export default TodoItem