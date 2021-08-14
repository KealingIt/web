import React from 'react'
import styles from './CompactVideo.module.css'
import Link from 'next/link'

export default function CompactVideo(props) {
    const { vanityId, youtubeId, title, description, type, show, season, episode, thumbnail, length } = props.data;

    const date = new Date(props.data.date);
    const formattedDate = `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getDate()}${new Date().getFullYear() === date.getFullYear() ? '' : `, ${date.getFullYear()}`}`;

    var leftPrefix = ""
    if(type === "clip") leftPrefix = "Clip • "
    else if(type === "compilation") leftPrefix = "Compilation • "

    return (
    <Link href={'/watch/' + vanityId}>
        <div className={styles.CompactVideo}>
            <div className={styles.CompactVideo__Thumbnail}>
                <div className={styles.CompactVideo__ThumbnailImageWrapper}>
                    <img className={styles.CompactVideo__ThumbnailImage} src={"/thumbnails/" + thumbnail + ".png"} layout="fill" objectFit="cover"/>
                </div>

                <div className={styles.CompactVideo__ThumbnailTextContainer}>
                    {
                        length.map(line => {
                            return <p className={styles.CompactVideo__ThumbnailText} key={line}>{ line }</p>
                        })
                    }
                </div>
            </div>

            <div className={styles.CompactVideo__DetailsContainer}>
                <div className={styles.CompactVideo__TopMeta}>
                    <p className={styles.CompactVideo__TopMeta__Left} style={{color: show.color}}>{leftPrefix + show.name + " S" + season + " E" + episode}</p>
                    <p className={styles.CompactVideo__TopMeta__Right}>{ formattedDate }</p>   
                </div>

                <p className={styles.CompactVideo__Title}>{title}</p>
                <p className={styles.CompactVideo__Description}>{description}</p>
            </div>
        </div>
    </Link>)
}
