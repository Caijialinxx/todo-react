import React, { Component } from 'react'
import $ from 'jquery'
import { getCurrentUser, logOut, TodoModel } from './leanCloud'
import { deepCopyByJSOn } from './deepCopyByJSON'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import Scrollbar from './Scrollbar'
import UserDialog from './UserDialog'
import Clock from './Clock'
import ThemeButton from './ThemeButton'
import icon_logout from './icon/log_out.png'
import './App.css'
import 'normalize.css'
import './reset.css'
import bg_blue from './images/workhard.jpg'
import bg_black from './images/goup.jpg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDefaultTheme: true,
      user: getCurrentUser() || {},
      newTodo: '',
      todoListHeight: undefined,
      todoList: []
    }
    if (this.state.user.id) {
      TodoModel.fetch((items) => {
        let state_copy = deepCopyByJSOn(this.state)
        state_copy.todoList = items
        this.setState(state_copy)
      }, (error) => { alert(error) })
    }
    window.onresize = () => {
      this.setState({ todoListHeight: $('.items-wrapper').innerHeight() })
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
        <div className='background'></div>
        <div className='changeTheme' onClick={this.changeTheme.bind(this)}>
          <ThemeButton />
        </div>
        <div className='todo-wrapper'>
          <header className='todo-header'>
            <h1 className='todo-title'>我的待办
              <img src={icon_logout} alt="登出" onClick={this.onLogOut.bind(this)} />
            </h1>
            <Clock />
          </header>
          <div className='todo-list'>
            <Scrollbar />
            <div className="items-wrapper">
              <ul>{todos.length === 0 ? <p>添加待办事项</p> : todos}</ul>
            </div>
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
    this.setState({ todoListHeight: $('.items-wrapper').innerHeight() })
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
    window.location.reload()
  }
  showScroll() {
    let contentHeight = $('.items-wrapper ul').innerHeight(),
      scrollTop = undefined
    if (contentHeight > this.state.todoListHeight) {
      $('.scrollWrapper').css({ display: 'block' })
      $('.scrollBar').css({ height: `${this.state.todoListHeight * this.state.todoListHeight / contentHeight}px` })
      $('.items-wrapper').scroll(() => {
        scrollTop = $('.items-wrapper').scrollTop()
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
      $('.items-wrapper').scrollTop($('.items-wrapper ul').innerHeight())
      $('.scrollBar').css({ bottom: `0px` })
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
  changeTheme() {
    if (this.state.isDefaultTheme) {
      $('.button-inner').css({ 'animation-name': 'toRightColor' })
      $('.ball').css({ 'animation-name': 'slideToRight' })
      $('.ball.border').css({ 'animation-name': 'rotateToRight' })
      $('.lightInBall').css({ 'animation-name': 'slideToRight' })

      $('.App').css({ 'background-color': '#000' })
      $('.background').css({ 'background-image': `url(${bg_black})` })
      $('.todo-wrapper').css({ 'background-color': '#fffffff8' })
    } else {
      $('.button-inner').css({ 'animation-name': 'toLeftColor' })
      $('.ball').css({ 'animation-name': 'slideToLeft' })
      $('.ball.border').css({ 'animation-name': 'rotateToLeft' })
      $('.lightInBall').css({ 'animation-name': 'slideToLeft' })

      $('.App').css({ 'background-color': '#eee' })
      $('.background').css({ 'background-image': `url(${bg_blue})` })
      $('.todo-wrapper').css({ 'background-color': '#fff' })
    }
    this.setState({ isDefaultTheme: !this.state.isDefaultTheme })
  }
}

export default App

function swap(arr, currentIndex, targetIndex) {
  let deleted = arr.splice(currentIndex, 1)[0]
  if (Math.abs(targetIndex - currentIndex) === 1) {
    arr[targetIndex] = arr.splice(currentIndex, 1, arr[targetIndex])[0]
  } else if (targetIndex - currentIndex > 1) {
    arr.push(deleted)
  } else if (targetIndex - currentIndex < -1) {
    arr.unshift(deleted)
  }
  return arr
}