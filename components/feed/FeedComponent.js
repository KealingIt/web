import { useState, useEffect } from 'react'
import Playlist from './playlist/Playlist'
import NoticeBoard from './noticeBoard/NoticeBoard'
import QueryController from '../structure/QueryController'
import MobileFeed from './MobileFeed'
import Alert from './alert/Alert'
import AppearanceSelector, { AppearanceOption } from './alert/AppearanceSelector'
import WelcomeAlert from './alert/WelcomeAlert'
import ChangeColorScheme from './alert/ChangeColorSchemeAlert'
import ChangeColorSchemeAlert from './alert/ChangeColorSchemeAlert'
import AboutAlert from './alert/AboutAlert'

export default function FeedComponent({ content }) {
  const [alerts, setAlerts] = useState(<></>)

  const removeAlerts = () => {
    setAlerts(<></>)
  }
  
  const playlists = ( <div className="playlists">
    {
      content.playlists.map((playlist, i) => {
        return <Playlist key={i} data={playlist}/>
      })
    }
  </div> )

  const noticeBoard = ( <NoticeBoard data={{items:content.noticeBoard}} setAlerts={setAlerts} removeAlerts={removeAlerts}></NoticeBoard> )
  

  useEffect(() => {
    if(!localStorage.getItem("appearance")) {
      localStorage.setItem("appearance", "default")
      setAlerts(<WelcomeAlert removeMe={removeAlerts}/>)
    }
  }, [])

    return (<>
      { alerts }    

      <QueryController queries={{
        '(min-width:1200px)': (
          <div style={{display:'flex',width:'fit-content',margin:'auto',marginTop:30,marginBottom:30}}>
            { playlists } { noticeBoard }
          </div>
        ), '': (
          <MobileFeed playlists={playlists} noticeBoard={noticeBoard}/>
        )
      }} />
    </>)
}
