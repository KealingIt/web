import React from 'react'
import Alert from './Alert'
import AppearanceSelector from './AppearanceSelector'

export default function WelcomeAlert({ removeMe }) {
    return (
        <Alert removeMe={removeMe}>
              <div style={{textAlign:'left',marginTop:15,marginBottom:25}}>
                <h1 style={{lineHeight:'1.75'}}>KNN Feed</h1>
                <p style={{color:'#888'}}>Designed by students, for students.</p>
              </div>

              <p style={{lineHeight:'1.25',width:220,margin:'auto'}}><b style={{lineHeight:'2.25'}}>Playlists</b><p style={{color:'#888'}}>Explore KNN's extensive content library, organized into playlists.</p></p>
              
              <p style={{lineHeight:'1.25',width:220,margin:'auto',marginTop:20}}><b style={{lineHeight:'2.25'}}>Notice Board</b><p style={{color:'#888'}}>The latest news about KNN, including surveys, interview opportunities, and more.</p></p>
              
              <p style={{lineHeight:'1.25',width:220,margin:'auto',marginTop:20}}><b style={{lineHeight:'2.25'}}>Chose an Appearance:</b><AppearanceSelector style={{display:'inline-block'}}/><p style={{color:'#888',display:'inline-block',width:140,marginLeft:15}}>Change later under the notice board.</p></p>
        </Alert>
    )
}
