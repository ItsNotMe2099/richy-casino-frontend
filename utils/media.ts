import { breakpoints } from 'scss/variables'

function isMedia(media: string, ssrValue = false) {
  if (typeof window === 'object' && window.matchMedia) {
    return window.matchMedia(media).matches
  }
  return ssrValue ?? false
}

export const isMobile = () => isMedia('(max-width: 750px)')
export const isTablet = () => isMedia('(min-width: 751px) and (max-width: 1300px)')
export const isDesktop = () => isMedia('(min-width: 1301px)', false)
export const isMdMax = () => isMedia(`(max-width: ${breakpoints.mdMax}px)`, false)

export const isServer: boolean = typeof window === 'undefined'
export const isClient: boolean = typeof window !== 'undefined'
