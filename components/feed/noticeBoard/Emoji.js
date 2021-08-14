import React, { Component } from 'react'
import Twemoji from 'react-twemoji'

export default class Emoji extends Component {
    constructor(props) {
        super(props)
        this.state = { element: <p>{ this.props.children }</p> }
    }

    componentDidMount() {
        if(!(window.navigator.platform.match(/^Mac/) || window.navigator.platform === 'iPhone')) this.setState({ element: <Twemoji options={{ className: 'twemoji' }}>{ this.props.children }</Twemoji> })
    }

    render() {
        return this.state.element
    }
}
