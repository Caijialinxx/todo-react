import React, { Component } from 'react'
import $ from 'jquery'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import Scrollbar from './Scrollbar'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { getCurrentUser, logOut, TodoModel } from './leanCloud'
import { deepCopyByJSOn } from './deepCopyByJSON'

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
      }, (error) => { console.error(error) })
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
        {this.state.user.id ? null : <UserDialog onSignUpOrLogIn={this.onSignUpOrLogIn.bind(this)} />}
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
    this.setState({
      newTodo: value,
      todoList: state_copy.todoList
    })
  }
  changeItemStatus(eventTarget, todoTarget) {
    if (todoTarget.todo.status === 'undone') {
      TodoModel.update(todoTarget.todo, (updatedTodo) => {
        $(eventTarget.children[0])[0].src = todoTarget.done
        $(eventTarget.children[1]).addClass('done')
        this.setState(updatedTodo)
      }, (error) => {
        console.error(error)
      })
    } else {
      TodoModel.update(todoTarget.todo, (updatedTodo) => {
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
