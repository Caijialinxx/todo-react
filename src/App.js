import React, { Component } from 'react'
import $ from 'jquery'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import Scrollbar from './Scrollbar'
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
          content: 'localStorage',
          status: 'undone'
        },
        {
          id: '2',
          content: 'leanCloud',
          status: 'undone'
        },
        {
          id: '3',
          content: '登录和注册',
          status: 'undone'
        },
        {
          id: '4',
          content: 'UP 功能',
          status: 'undone'
        },
        {
          id: '5',
          content: 'DOWN 功能',
          status: 'undone'
        },
        {
          id: '6',
          content: 'Beautify it!',
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
          onToggle={this.changeItemStatus.bind(this)}
          onMove={this.moveAction.bind(this)}
          onDelete={this.deleteItem.bind(this)}
        />
      })

    return (
      <div className='App'>
        <header className='todo-header'>
          <h1 className='todo-title'>我的待办</h1>
        </header>
        <div className='todo-list'>
          <Scrollbar />
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
  componentDidMount() {
    this.showScroll()
  }
  componentDidUpdate() {
    this.showScroll()
  }
  /* *******以下为自定义函数******** */
  showScroll() {
    let contentHeight = $('.todo-list ul').outerHeight(true),
      scrollTop = undefined
    if (contentHeight > 440) {
      $('.scrollWrapper').css({ display: 'block' })
      $('.scrollBar').css({ height: `${440 * 440 / contentHeight}px` })
      $('.todo-list').scroll(function () {
        scrollTop = $('.todo-list').scrollTop()
        $('.scrollBar').css({ top: `${scrollTop / contentHeight * 100}%` })
      })
    } else {
      $('.scrollWrapper').css({ display: 'none' })
    }
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
  changeItemStatus(eventTarget, todoTarget) {
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
  moveAction(eventTarget, action) {
    let currentElem = $(eventTarget).parents('li'),
      allLi = $('li'),
      index = $(currentElem).index(),
      lastIndex = $(currentElem).parent().children().length - 1

    if (action === 'toTop') {
      if (index === 0) {
        alert('已经是第一个啦！')
      } else {
        $(allLi).eq(0).before($(currentElem))
      }
    } else if (action === 'moveUp') {
      if (index === 0) {
        alert('已经是第一个啦！')
      } else {
        $(allLi).eq(index - 1).before($(currentElem))
      }
    } else if (action === 'moveDown') {
      if (index === lastIndex) {
        alert('已经是最后一个啦！')
      } else {
        $(allLi).eq(index + 1).after($(currentElem))
      }
    } else if (action === 'toBottom') {
      if (index === lastIndex) {
        alert('已经是最后一个啦！')
      } else {
        $(allLi).eq(lastIndex).after($(currentElem))
      }
    }
  }
  deleteItem(todoTarget) {
    todoTarget.status = 'delete'
    this.setState(this.state)
  }
}

export default App
