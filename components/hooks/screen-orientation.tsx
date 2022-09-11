import {useState, useEffect} from 'react'
const getWindowOrientation = (angle) => {
  if(angle === 90){
    return 'landscape-primary'
  }else if(angle === -90){
    return 'landscape-secondary'
  }else if(angle === 0){
    return 'portrait-primary'
  }else{
    return 'portrait-secondary'
  }
}
const getOrientation = () =>
  window.screen?.orientation?.type ?? getWindowOrientation(window.orientation)

const useScreenOrientation = () => {
  const [orientation, setOrientation] =
    useState(getOrientation())

  const updateOrientation = event => {
    setOrientation(getOrientation())
  }

  useEffect(() => {
    window.addEventListener(
      'orientationchange',
      updateOrientation
    )
    return () => {
      window.removeEventListener(
        'orientationchange',
        updateOrientation
      )
    }
  }, [])

  return orientation
}

export default useScreenOrientation
