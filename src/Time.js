import React from "react"

class Time extends React.Component {
  // Mounting State
  constructor(props) {
    // super(props) should be called before any other statement.
    super(props)
    // We should initial this.state here directly if our component needs to use local state.
    this.state = {
      date: new Date()
    }
    // We should not call this.setState() here.
  }
  render() {
    return <p className={this.props.className}>It is {this.state.date.toTimeString().substr(0, 8)} now.</p>
  }
  componentDidMount() {
    // We can call this.setState() if needed.
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }
  // Updating State
  componentDidUpdate() {
    // console.log('update')
  }
  // Unmounting State
  componentWillUnmount() {
    // Perform any necessary cleanup in this method,
    // such as invalidating timers, canceling network requests,
    // or cleaning up any subscriptions created in componentDidMount().
    clearInterval(this.timerID);
  }
}

export default Time