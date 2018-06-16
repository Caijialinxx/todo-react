import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'

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
      return <TodoItem props={{
        item: {
          className: 'item',
          imgID: 'status'
        },
        options: {
          className: 'options',
          upBtnID: 'upBtn',
          downBtnID: 'downBtn',
          deleteBtnID: 'deleteBtn'
        }
      }
      } content={item.content} />
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
