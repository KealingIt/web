import React from 'react'
import styles from './Alert.module.css'
import Layout from '../../structure/Layout'

export default function Alert({ children, removeMe }) {
    const alert = <div className={ styles.Alert }>
        <Layout bodyClass="noscroll"></Layout>
        <div className={ styles.Alert__Box }>
            <div className={ styles.Alert__Box__Content }>{ children }</div>
            <button className={ styles.Alert__Box__Done } onClick={removeMe}>Done</button>
        </div>
    </div>  

    return alert;
}
