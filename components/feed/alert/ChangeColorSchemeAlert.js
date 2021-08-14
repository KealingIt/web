import React from 'react'
import Alert from './Alert'
import AppearanceSelector from './AppearanceSelector'

export default function ChangeColorSchemeAlert({ removeMe }) {
    return (
        <Alert removeMe={removeMe}>
              <div style={{textAlign:'left',marginTop:15,marginBottom:25}}>
                <h1 style={{lineHeight:'1.75'}}>KNN Feed</h1>
                <p style={{color:'#888'}}>Designed by students, for students.</p>
              </div>

              <p style={{lineHeight:'1.25',width:220,margin:'auto',marginTop:20}}><b style={{lineHeight:'2.25'}}>Chose an Appearance:</b><AppearanceSelector style={{display:'inline-block'}}/><p style={{color:'#888',display:'inline-block',width:140,marginLeft:15}}>Change later under the notice board.</p></p>
        </Alert>
    )
}
