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
      return <TodoItem todo={item} className={{ item: 'itemWrapper', options: 'optionsWrapper' }}
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
  changeStatus(target, status) {
    this.setState(this.state)
    if (status.now === 'done') {
      $(target.children[0])[0].src = status.done
      $(target.children[1]).addClass('done')
    } else {
      $(target.children[0])[0].src = status.undone
      $(target.children[1]).removeClass('done')
    }
  }
  deleteItem(target){
    this.setState(this.state)
    $(target).remove()
  }
}

export default App
