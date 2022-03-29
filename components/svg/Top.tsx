import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Top(props: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" width="4" height="4" rx="1" />
      <rect y="5" width="4" height="4" rx="1" />
      <rect y="10" width="4" height="4" rx="1" />
      <rect x="5" y="10" width="4" height="4" rx="1"/>
      <rect x="5" y="5" width="4" height="4" rx="1" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <rect x="10" y="5" width="4" height="4" rx="1"/>
    </svg>
  )
}

export default Top
