import React from 'react'

function EpisodeDetails({index, name, discription, audioFile, onClick}) {
  return (
    <div>
        <h3>{index}. {name}</h3>
        <p className='discription' style={{marginInline:"20px"}}>{discription}</p>
        <button onClick={() => onClick(audioFile)} style={{width:"7rem", marginInline:"20px"}}>Play</button>
        
    </div>
  )
}

export default EpisodeDetails