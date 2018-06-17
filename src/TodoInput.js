import React, { Component } from 'react'
import icon_add from './icon/add.svg'

class TodoInput extends Component {
  render() {
    return <div className={this.props.className}>
      <img id={this.props.id} src={icon_add} alt={this.props.id} />
      <input type="text"
        value={this.props.content}      // 若使用defaultValue则会导致提交之后输入框不为空
        onKeyUp={this.submit.bind(this)}
        onChange={this.change.bind(this)}
        maxLength="40" placeholder="添加待办事项" />
    </div>
  }
  submit(e) {
    if (e.keyCode === 13) {
      console.log('subimit')
      this.props.onSubmit.call()
    }
  }
  change(e) {
    this.props.onChange.call(undefined, e.target.value)
  }
}

export default TodoInput