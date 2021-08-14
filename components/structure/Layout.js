import React, { Component } from 'react'

export default class Layout extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {bodyClass} = this.props
        document.querySelector("body").classList.add(bodyClass || "default")
    }

    componentWillUnmount() {
        const {bodyClass} = this.props
        document.querySelector("body").classList.remove(bodyClass || "default")
    }

    render() {
        return (
            <div>
                {this.props.children}            
            </div>
        )
    }
}
