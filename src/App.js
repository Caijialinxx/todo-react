import React, { Component } from 'react'
import $ from 'jquery'
import { getCurrentUser, logOut, TodoModel } from './leanCloud'
import { deepCopyByJSOn } from './deepCopyByJSON'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import Scrollbar from './Scrollbar'
import UserDialog from './UserDialog'
import Clock from './Clock'
import './App.css'
import 'normalize.css'
import './reset.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
    if (this.state.user.id) {
      TodoModel.fetch((items) => {
        let state_copy = deepCopyByJSOn(this.state)
        state_copy.todoList = items
        this.setState(state_copy)
      }, (error) => { alert(error) })
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
        <div className='background'></div>
        {this.state.user.id ? null : <UserDialog onSignUpOrLogIn={this.onSignUpOrLogIn.bind(this)} />}
        <div className='todo-wrapper'>
          <header className='todo-header'>
            <Clock />
            <h1 className='todo-title'>我的待办
              {this.state.user.id ? <a onClick={this.onLogOut.bind(this)} href='javascript:void(0)'>退出登录</a> : null}
            </h1>
          </header>
          <div className='todo-list'>
            <Scrollbar />
            <ul>{todos}</ul>
          </div>
          <TodoInput id='add' content={this.state.newTodo}
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
  onSignUpOrLogIn(user) {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.user = user
    this.setState(state_copy)
    window.location.reload()
  }
  onLogOut() {
    logOut()
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.user = {}
    this.setState(state_copy)
    window.location.reload()
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
    let state_copy = deepCopyByJSOn(this.state)
    let newItem = {
      order: $('ul')[0].children.length,
      content: state_copy.newTodo,
      status: 'undone',
    }
    TodoModel.create(newItem, (id) => {
      newItem.id = id
      state_copy.todoList.push(newItem)
      this.setState({
        newTodo: '',
        todoList: state_copy.todoList
      })
    }, (error) => {
      console.error(error)
    })
  }
  changeNewtodo(value) {
    let state_copy = deepCopyByJSOn(this.state)
    state_copy.newTodo = value
    this.setState(state_copy)
  }
  changeItemStatus(eventTarget, todoTarget) {
    if (todoTarget.todo.status === 'undone') {
      TodoModel.update('status', todoTarget.todo, (updatedTodo) => {
        $(eventTarget.children[0])[0].src = todoTarget.done
        $(eventTarget.children[1]).addClass('done')
        this.setState(updatedTodo)
      }, (error) => {
        console.error(error)
      })
    } else {
      TodoModel.update('status', todoTarget.todo, (updatedTodo) => {
        $(eventTarget.children[0])[0].src = todoTarget.undone
        $(eventTarget.children[1]).removeClass('done')
        this.setState(updatedTodo)
      }, (error) => {
        console.error(error)
      })
    }

  }
  deleteItem(todoTarget) {
    TodoModel.destroy(todoTarget.id, () => {
      todoTarget.status = 'delete'
      this.setState(todoTarget)
    }, (error) => { console.error(error) })
  }
  moveAction(eventTarget, action) {
    let index = $(eventTarget).parents('li').index(),
      lastIndex = $(eventTarget).parents('ul').children().length - 1
    let state_copy = deepCopyByJSOn(this.state),
      todoList = state_copy.todoList

    if (action === 'toTop') {
      if (index === 0) {
        alert('已经是第一个啦！')
      } else {
        swap(todoList, index, 0)
      }
    } else if (action === 'moveUp') {
      if (index === 0) {
        alert('已经是第一个啦！')
      } else {
        swap(todoList, index, index - 1)
      }
    } else if (action === 'moveDown') {
      if (index === lastIndex) {
        alert('已经是最后一个啦！')
      } else {
        swap(todoList, index, index + 1)
      }
    } else if (action === 'toBottom') {
      if (index === lastIndex) {
        alert('已经是最后一个啦！')
      } else {
        swap(todoList, index, lastIndex)
      }
    }
    todoList.filter((item) => item.status !== 'delete')
      .map((item, index) => {
        item.order = index
        TodoModel.update('order', item,
          () => { this.setState(state_copy) },
          (error) => { console.error(error) })
      })
  }
}

export default App

function swap(arr, currentIndex, targetIndex) {
  if (Math.abs(targetIndex - currentIndex) === 1) {
    arr[targetIndex] = arr.splice(currentIndex, 1, arr[targetIndex])[0]
  } else if (targetIndex - currentIndex > 1) {
    var deleted = arr.splice(currentIndex, 1)[0]
    arr.push(deleted)
  } else if (targetIndex - currentIndex < -1) {
    var deleted = arr.splice(currentIndex, 1)[0]
    arr.unshift(deleted)
  }
  return arr
}