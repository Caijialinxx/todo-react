import React, { Component } from 'react'
import './App.css'
import icon_undone from './icon/square.svg'
import icon_delete from './icon/bin.svg'

var link = document.createElement('link')
link.href = "//at.alicdn.com/t/font_709826_rpbfifb41x.css"
document.head.appendChild(link)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: [
        {
          id: '1',
          content: 'Learn How to Use.',
          status: 'undone'
        },
        {
          id: '2',
          content: 'Try to Add.',
          status: 'undone'
        },
      ]
    }
    // this.
  }
  render() {
    let todos = this.state.todoList.map((item, index) => {
      return <li><img src={icon_undone}/>{item.content}</li>
    })

    return (
      <div className="App">
        <header className="todo-header">
          {/* <img src={logo} className="todo-logo" alt="logo" /> */}
          <h1 className="todo-title">我的待办</h1>
        </header>
        <div className="todo-list">
          <ul>{todos}</ul>
        </div>
        <div className="todo-input">
          <input type="text" placeholder="添加待办事项" />
        </div>
      </div>
    )
  }
}

export default App
