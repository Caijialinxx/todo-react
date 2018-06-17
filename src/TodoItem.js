import React, { Component } from 'react'
import icon_undone from './icon/square.svg'
import icon_delete from './icon/bin.svg'
import icon_up from './icon/up.svg'
import icon_down from './icon/down.svg'

class TodoItem extends Component {
  render() {
    return <li>
      <div className={this.props.itemProps.className}>
        <img id={this.props.itemProps.statusBtnID} src={icon_undone} alt={this.props.itemProps.statusBtnID} />
        <span>{this.props.itemProps.content}</span>
      </div>
      <div className={this.props.optionsProps.className}>
        <img id={this.props.optionsProps.upBtnID} src={icon_up} alt={this.props.optionsProps.upBtnID} />
        <img id={this.props.optionsProps.downBtnID} src={icon_down} alt={this.props.optionsProps.downBtnID} />
        <img id={this.props.optionsProps.deleteBtnID} src={icon_delete} alt={this.props.optionsProps.deleteBtnID} />
      </div>
    </li>
  }
}

export default TodoItem