import React from 'react'

interface Props {
  color?: string
  className?: string
}

function GameArrowSvg(props: Props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 7L15 12V16L8 11L1 16L1 12L8 7Z" fill="#797C86"/>
      <path d="M8 0L15 5V9L8 4L1 9L1 5L8 0Z" fill="#797C86"/>
    </svg>
  )
}

export default GameArrowSvg
