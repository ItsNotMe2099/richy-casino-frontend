import {getSelectorsByUserAgent} from 'react-device-detect'

export const getIsMobile = (_isMobileProps) => {
  if(typeof  navigator === 'undefined'){
    return _isMobileProps
  }
  const ua =  navigator.userAgent

  if (ua) {
    const { isMobile, isTablet } = getSelectorsByUserAgent(ua)
    const d = getSelectorsByUserAgent(ua)
    console.log('D111', window.screen.width)
    if(isTablet && window?.screen?.width >=1024){
      return false
    }
    return isMobile
  }
  return _isMobileProps
}
