import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import icon_undone from './icon/square.svg'
import icon_delete from './icon/bin.svg'
import icon_up from './icon/up.svg'
import icon_down from './icon/down.svg'

var link = document.createElement('link')
link.href = '//at.alicdn.com/t/font_709826_rpbfifb41x.css'
document.head.appendChild(link)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: [
        {
          id: '1',
          content: 'Learn How to Use. dfafdsf',
          status: 'undone'
        },
        {
          id: '2',
          content: 'Try to Add.',
          status: 'undone'
        },
      ]
    }
  }
  render() {
    let todos = this.state.todoList.map((item, index) => {
      return <li>
        <div className='item'>
          <img id='status' src={icon_undone} />
          <span>{item.content}</span>
        </div>
        <div className='options'>
          <img id='up' src={icon_up} />
          <img id='down' src={icon_down} />
          <img id='delete' src={icon_delete} />
        </div>
      </li>
    })

    return (
      <div className='App'>
        <header className='todo-header'>
          {/* <img src={logo} className='todo-logo' alt='logo' /> */}
          <h1 className='todo-title'>我的待办</h1>
        </header>
        <div className='todo-list'>
          <ul>{todos}</ul>
        </div>
        <TodoInput className='todo-inputWrapper' id='add' content={this.state.newTodo} />
      </div>
    )
  }
}

export default App
