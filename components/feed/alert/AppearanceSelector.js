import { useState } from 'react'
import styles from './AppearanceSelector.module.css'
import Layout from '../../structure/Layout'

export default function AppearanceSelector(props) {
    const [appearance, setAppearance] = useState(localStorage.getItem("appearance") || "default")

    return (
        <div { ...props }>
            <AppearanceOption id="default" state={appearance} setState={setAppearance} color1="#EEE" color2="#DDD" color3="#CCC"></AppearanceOption>
            <AppearanceOption id="dark" state={appearance} setState={setAppearance} color1="#374455" color2="#232C38" color3="#1c2531"></AppearanceOption>
        </div>
    )
}

export function AppearanceOption({ id, state, setState, color1, color2, color3 }) {
    return (
        <span style={{'--color1': color1, '--color2': color2, '--color3': color3}} onClick={() => {
            setState(id)
            localStorage.setItem("appearance", id)

            const classes = document.querySelector("body").classList;
            classes.forEach(cl => {
                if(cl.startsWith("appearance_")) classes.remove(cl)
            });
            classes.add("appearance_" + id)
        }} className={id === state ? styles.AppearanceOption_selected : styles.AppearanceOption}></span>
    )
}
