import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Spinner({ isShown }) {
  const location = useLocation()

  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('fadeIn')

  useEffect(() => {
    if (!isShown) setTransistionStage('fadeOut')
  }, [isShown])

  useEffect(() => {
    if (location !== displayLocation && location !== '#catalog') {
      setDisplayLocation(location)
      setTransistionStage('fadeIn')
    }
  }, [location, displayLocation])
  return (
    <div
      className={`${transitionStage} ${
        !isShown ? 'z-[-1]' : 'z-30'
      } fixed inset-0 w-screen flex items-center justify-center h-screen bg-white/30 backdrop-blur-xl transition`}
      // onAnimationEnd={(e) =>
      //   (e.target.children[0].style.transform = 'scale(0.3)')
      // }
    >
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  )
}

export default Spinner
