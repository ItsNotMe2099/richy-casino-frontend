import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Blackjack(props: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H7C7.55228 12 8 11.5523 8 11V1C8 0.447715 7.55228 0 7 0H1ZM4 3L2 6L4 9L6 6L4 3Z"/>
      <path d="M9 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H7C6.44772 14 6 13.5523 6 13H7C8.10457 13 9 12.1046 9 11V2Z"/>
    </svg>
  )
}

export default Blackjack
