import React, { Component } from 'react'
import styles from './YoutubeEmbed.module.css'

export default class YoutubeEmbed extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();

        this.resize = () => {
            this.ref.current.height = Math.min(window.screen.height / 2, this.ref.current.getBoundingClientRect().width / 2)
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize)
    }

    render() {
        return (
            <div className={styles.YoutubeEmbedWrapper}>
                <iframe ref={this.ref} width="100%" src={"https://www.youtube.com/embed/" + this.props.id} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen on></iframe>
                { this.props.children } 
            </div>
        )
    }
}
