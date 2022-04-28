import React from 'react'

interface Props {
  color?: 'red' | 'blue'
}

function TowerArrowSvg(props: Props) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 6.86603C-0.166667 6.48113 -0.166667 5.51887 0.5 5.13397L8 0.803847C8.66667 0.418947 9.5 0.900072 9.5 1.66987L9.5 10.3301C9.5 11.0999 8.66667 11.5811 8 11.1962L0.5 6.86603Z" fill={`${props.color === 'blue'? '#427BF8' : '#ED4700'}`}/>
    </svg>
  )
}

export default TowerArrowSvg