import React from 'react'

function CharactersCard({item, index}) {    
  return (
    <div className="container">
          {            
           <div key={index} className="character-rectangle">
           <div className="top-line"></div>
           <div className="character-image-wrap">
             <img className='character-image' src={`${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`} alt="" />
           </div>
           <div className="character-name">
             <p>{item.name}</p>
         </div>
         </div>
          }

        </div>
  )
}

export default CharactersCard