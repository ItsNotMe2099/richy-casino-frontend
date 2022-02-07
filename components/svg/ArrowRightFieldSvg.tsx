import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ArrowRightFieldSvg(props: Props) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.2509 9.26761C11.2513 9.44285 11.1903 9.61268 11.0784 9.74761L7.32844 14.2476C7.20114 14.4008 7.0182 14.4971 6.81988 14.5154C6.62156 14.5337 6.4241 14.4724 6.27094 14.3451C6.11778 14.2178 6.02146 14.0349 6.00317 13.8366C5.98489 13.6382 6.04613 13.4408 6.17344 13.2876L9.53344 9.26761L6.29344 5.24761C6.23114 5.1709 6.18462 5.08263 6.15654 4.98787C6.12847 4.89312 6.1194 4.79375 6.12985 4.69548C6.14031 4.59721 6.17008 4.50197 6.21746 4.41524C6.26484 4.32851 6.32889 4.252 6.40594 4.19011C6.48305 4.12143 6.57352 4.06941 6.67168 4.03731C6.76984 4.00522 6.87356 3.99374 6.97636 4.0036C7.07916 4.01346 7.17881 4.04444 7.26908 4.0946C7.35934 4.14476 7.43828 4.21303 7.50094 4.29511L11.1234 8.79511C11.2176 8.93393 11.2625 9.10029 11.2509 9.26761Z" fill="white"/>
    </svg>


  )
}

export default ArrowRightFieldSvg
