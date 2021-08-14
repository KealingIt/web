import React from 'react'
import styles from './Playlist.module.css'
import CompactVideo from './CompactVideo.js'

export default function Playlist(props) {
    const { title, videos } = props.data

    return (
        <div className={ styles.Playlist }>
            <h1 className={ styles.Playlist__Title }>{ title }</h1>
            <div className={ styles.Playlist__Videos }>{
                videos.map(vid => {
                    return <CompactVideo data={vid} key={vid.vanityId} />
                })
            }</div>
        </div>
    )
}
