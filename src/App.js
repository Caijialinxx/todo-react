import React, { Component } from 'react'
import $ from 'jquery'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import Scrollbar from './Scrollbar'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { getCurrentUser, logOut } from './leanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: [{ content: 'hi, 我的小宝贝在吗', status: 'undone' }]
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
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp.bind(this)} onLogIn={this.onLogIn.bind(this)} />}
        <div className='todo-wrapper'>
          <header className='todo-header'>
            <h1 className='todo-title'>我的待办
              {this.state.user.id ? <a onClick={this.onLogOut.bind(this)} href='javascript:void(0)'>退出登录</a> : null}
            </h1>
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
  onSignUp(user) {
    let state_copy = JSON.parse(JSON.stringify(this.state))
    state_copy.user = user
    this.setState(state_copy)
  }
  onLogIn(user) {
    let state_copy = JSON.parse(JSON.stringify(this.state))
    state_copy.user = user
    this.setState(state_copy)
  }
  onLogOut() {
    logOut()
    let state_copy = JSON.parse(JSON.stringify(this.state))
    state_copy.user = {}
    this.setState(state_copy)
  }
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
    let state_copy = JSON.parse(JSON.stringify(this.state))
    state_copy.todoList.push({
      content: state_copy.newTodo,
      status: 'undone'
    })
    this.setState({
      newTodo: '',
      todoList: state_copy.todoList
    })
  }
  changeNewtodo(value) {
    let state_copy = JSON.parse(JSON.stringify(this.state))
    this.setState({
      newTodo: value,
      todoList: state_copy.todoList
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
  deleteItem(todoTarget) {
    todoTarget.status = 'delete'
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
}

export default App
