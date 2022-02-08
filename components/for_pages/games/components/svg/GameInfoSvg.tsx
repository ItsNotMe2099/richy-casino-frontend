import React from 'react'

interface Props {
  color?: string
  className?: string
}

function GameInfoSvg(props: Props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#797C86"/>
      <path d="M7 7H9V12H7V7Z" fill="#797C86"/>
      <path d="M7 4H9V6H7V4Z" fill="#797C86"/>
    </svg>


  )
}

export default GameInfoSvg
