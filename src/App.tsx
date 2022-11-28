import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Form from './Form'

export interface Mobile{
  mobile: boolean
}

function App() {
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    function handleResize(){
      setViewportWidth(document.documentElement.clientWidth)
    }
    
    window.addEventListener('resize', handleResize)  
    handleResize()

    return () => {window.removeEventListener('resize', handleResize)}
  }, [])

  let mobile: boolean = viewportWidth <= 480;
  return (
    <>
      <Banner mobile={mobile} />
      <Form mobile={mobile} />
    </>
  )
}

export default App
