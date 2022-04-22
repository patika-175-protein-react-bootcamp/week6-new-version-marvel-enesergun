import React from 'react'

import image1 from '../assests/image1.png'
import image2 from '../assests/image2.png'

function Header() {
  return (
    <div className="header">
            <div className="header-background">
                <img className="header-background-img" src={image1} alt="" />                
            </div>
            <div className="header-logo">
                <img className="header-logo-img" src={image2} alt="" />
            </div>
        </div>
  )
}

export default Header