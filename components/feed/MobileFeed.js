import { useState } from 'react'
import styles from './MobileFeed.module.css'

export default function MobileFeed({ playlists, noticeBoard }) {
    const [tab, setTab] = useState(0)
    
    return (
        <div className={ styles.MobileFeed }>
            <div className={ styles.MobileFeed__NavigationWrapper }>
                <p className={ tab === 0 ? styles.MobileFeed__NavigationLink_selected : styles.MobileFeed__NavigationLink } onClick={() => { setTab(0) }}>Videos</p>
                <p className={ tab === 1 ? styles.MobileFeed__NavigationLink_selected : styles.MobileFeed__NavigationLink } onClick={() => { setTab(1) }}>Notice Board</p>
            </div>

            { tab === 0 ? playlists : noticeBoard }
        </div>
    )
}
