import React from "react"
import './Clock.css'

class Time extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  render() {
    let day
    switch (this.state.date.getDay()) {
      case 1: day = '一'
        break
      case 2: day = '二'
        break
      case 3: day = '三'
        break
      case 4: day = '四'
        break
      case 5: day = '五'
        break
      case 6: day = '六'
        break
      default: day = '日'
        break
    }
    let date = `${this.state.date.getMonth() + 1}月${this.state.date.getDate()}日 星期${day} `
    return <p className='time'>{date + this.state.date.toTimeString().substr(0, 5)}</p>
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 20000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}

export default Time