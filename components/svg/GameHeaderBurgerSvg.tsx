import React from 'react'

interface Props {
  color?: string
  className?: string
}

function GameHeaderBurgerSvg(props: Props) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="14" height="2" rx="1" fill="#60636B" />
      <rect y="5" width="14" height="2" rx="1" fill="#60636B" />
      <rect y="10" width="14" height="2" rx="1" fill="#60636B" />
    </svg>
  )
}

export default GameHeaderBurgerSvg
