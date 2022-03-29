import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Dots(props: Props) {
  return (
    <svg width="21" height="5" viewBox="0 0 21 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="2.5" r="2.5" fill="#6B6C77"/>
      <circle cx="10.5" cy="2.5" r="2.5" fill="#6B6C77"/>
      <circle cx="18.5" cy="2.5" r="2.5" fill="#6B6C77"/>
    </svg>
  )
}

export default Dots
