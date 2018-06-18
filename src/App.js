import React, { Component } from 'react'
import $ from 'jquery'
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
          content: 'Learn How to Use. dfafhhhdsf',
          status: 'undone'
        },
        {
          id: '2',
          content: 'Try to Add.',
          status: 'undone'
        },
        {
          id: '3',
          content: 'Learn How to Use. dfafdsf',
          status: 'delete'
        },
        {
          id: '4',
          content: 'Try to Adddd.',
          status: 'done'
        },
        {
          id: '',
          content: '来一个中文的，看看效果',
          status: 'undone'
        },
      ]
    }
  }
  render() {
    let todos = this.state.todoList
      .filter((item) => item.status !== 'delete')
      .map((item) => {
        return <TodoItem todo={item}
          onToggle={this.changeStatus.bind(this)}
          onDelete={this.deleteItem.bind(this)}
        />
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
          onChange={this.changeNewtodo.bind(this)}
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
  changeNewtodo(value) {
    this.setState({
      newTodo: value,
      todoList: this.state.todoList
    })
  }
  changeStatus(eventTarget, todoTarget) {
    if (todoTarget.todo.status === 'undone') {
      todoTarget.todo.status = 'done'
      $(eventTarget.children[0])[0].src = todoTarget.done
      $(eventTarget.children[1]).addClass('done')
    } else {
      todoTarget.todo.status = 'undone'
      $(eventTarget.children[0])[0].src = todoTarget.undone
      $(eventTarget.children[1]).removeClass('done')
    }
    this.setState(this.state)
  }
  deleteItem(todoTarget) {
    todoTarget.status = 'delete'
    this.setState(this.state)
  }
}

export default App
