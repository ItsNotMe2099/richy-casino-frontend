import {useEffect, useRef, useState} from 'react'

const useDetectKeyboardOpen = (minKeyboardHeight = 200,defaultValue = false) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const heightRef = useRef(0)
  const isKeyboardOpenRef = useRef(defaultValue)
  useEffect(() => {
    heightRef.current = window.visualViewport.height
    setScreenHeight(heightRef.current)
    const listener = () => {
      const newState = window.screen.height - minKeyboardHeight > window.visualViewport.height
      console.log('newState', window.visualViewport.height, window.screen.height - minKeyboardHeight, newState)
      if (isKeyboardOpenRef.current != newState) {
        setIsKeyboardOpen(newState)
        isKeyboardOpenRef.current = newState
        if(newState) {
          setKeyboardHeight(heightRef.current - window.visualViewport.height)
          setScreenHeight(window.visualViewport.height)
        }
        heightRef.current = window.visualViewport.height
      }

    }
    window.visualViewport.addEventListener('resize', listener)
    return () => {
      window.visualViewport.removeEventListener('resize', listener)
    }
  }, [])

  return [isKeyboardOpen, keyboardHeight, screenHeight]
}

export default useDetectKeyboardOpen
