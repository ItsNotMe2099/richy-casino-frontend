import React from 'react'

interface Props {
  color?: string
  className?: string
}

function GameStatSvg(props: Props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_3803_192863)">
        <rect y="10" width="4" height="6" fill="#797C86"/>
        <rect x="6" width="4" height="20" fill="#797C86"/>
        <rect x="12" y="4" width="4" height="16" fill="#797C86"/>
      </g>
      <defs>
        <clipPath id="clip0_3803_192863">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>


  )
}

export default GameStatSvg