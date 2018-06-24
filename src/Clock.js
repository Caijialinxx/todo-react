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
    return <p className='time'>{this.state.date.toTimeString().substr(0, 8)}</p>
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}

export default Time