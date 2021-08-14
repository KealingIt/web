import React from 'react'
import styles from './NoticeBoard.module.css'
import Twemoji from 'react-twemoji'
import Emoji from './Emoji'
import Link from 'next/link'
import AboutAlert from '../alert/AboutAlert'
import ChangeColorSchemeAlert from '../alert/ChangeColorSchemeAlert'

export default function NoticeBoard({ data, setAlerts, removeAlerts }) {
    const { items } = data

    return (<>
        <div className={ styles.NoticeBoard }>
            <h1 className={ styles.NoticeBoard__Header }>Notice Board</h1>
            <div className={ styles.NoticeBoard__Items}>
                {
                    
                    items.map((item, index) => {
                        const element = <div key={index} className={ item.link ? styles.NoticeBoard__LinkedItem : styles.NoticeBoard__Item }>
                            { item.emoji ? (
                                <div className={ styles.NoticeBoard__Item__Emoji }>
                                    <Emoji>{ item.emoji }</Emoji>
                                </div>
                            ) : <></>}

                            <div className={ styles.NoticeBoard__Item__Text }>
                                <p className={ styles.NoticeBoard__Item__Header }>{ item.header }</p>
                                <p className={ styles.NoticeBoard__Item__Description }>{ item.description }</p>
                            </div>
                        </div>

                        return item.link ? <Link href={ item.link } key={index}>{ element }</Link> : element
                    })
                }
            </div>
            <div className={styles.NoticeBoard__Footer}>
                <p onClick={() => { setAlerts(<AboutAlert removeMe={removeAlerts}/>)  }}>About</p>
                <p onClick={() => { setAlerts(<ChangeColorSchemeAlert removeMe={removeAlerts}/>)  }}>Change Appearance</p>
            </div>
            
        </div>
    </>)
}
