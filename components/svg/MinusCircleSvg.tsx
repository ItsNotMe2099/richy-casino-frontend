import React from 'react'

interface Props {
  color?: string
  className?: string
}

function MinusCircleSvg(props: Props) {
  return (
    <svg className={props.className} width="13" height="13" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0a6 6 0 1 0 0 13A6 6 0 0 0 6 0ZM4 6h5a1 1 0 1 1 0 1H4a1 1 0 1 1 0-1Z" fill={props.color} fill-rule="evenodd"/>
    </svg>
  )
}

export default MinusCircleSvg
