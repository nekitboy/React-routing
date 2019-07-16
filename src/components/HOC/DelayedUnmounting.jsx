import React from 'react'

export default function DelayedUnmounting (Component, delay) {
  return class extends React.Component {
    state = {
      shouldRender: !this.props.hide
    }

    delaySec = this.props.delaySec || delay

    updateDelaySec = (secs) => {
      this.delaySec = secs
    }

    componentDidUpdate (prevProps) {
      if (this.props.hide && !prevProps.hide) {
        setTimeout(
          () => this.setState({ shouldRender: false }),
          this.delaySec * 1000 || 0
        )
      } else if (prevProps.hide && !this.props.hide) {
        this.setState({ shouldRender: true })
      }

      if (this.props.delaySec !== prevProps.delaySec) {
        this.delaySec = this.props.delaySec
      }
    }

    render () {
      return this.state.shouldRender ? <Component {...this.props}/> : null
    }
  }
}
