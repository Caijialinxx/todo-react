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
    let todos = this.state.todoList.map((item) => {
      return <TodoItem itemProps={{
        className: 'item',
        imgID: 'status',
        content: item.content
      }
      } optionsProps={{
        className: 'options',
        upBtnID: 'upBtn',
        downBtnID: 'downBtn',
        deleteBtnID: 'deleteBtn'
      }
      } />
    })

    return (
      <div className='App'>
        <header className='todo-header'>
          <h1 className='todo-title'>我的待办</h1>
        </header>
        <div className='todo-list'>
          <ul>{todos}</ul>
        </div>
        <TodoInput className='todo-inputWrapper' id='add'
          content={this.state.newTodo}
          onSubmit={this.addItem.bind(this)}
          onChange={this.change.bind(this)}
        />
      </div>
    )
  }
  addItem() {
    this.state.todoList.push({
      id: 5,
      content: this.state.newTodo,
      status: 'undone'
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  change(value) {
    this.setState({
      newTodo: value,
      todoList: this.state.todoList
    })
  }
}

export default App
