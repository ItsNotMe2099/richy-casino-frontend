import React from 'react'

interface Props {
  className?: string
}

function PokerSvg(props: Props) {
  return (
    <svg className={props.className} width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5834 21.0833V5.91667C20.5834 4.72005 19.6133 3.75 18.4167 3.75L7.58337 3.75C6.38676 3.75 5.41671 4.72005 5.41671 5.91667L5.41671 21.0833C5.41671 22.28 6.38676 23.25 7.58337 23.25H18.4167C19.6133 23.25 20.5834 22.28 20.5834 21.0833Z" stroke="#6B6C77" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.66669 7H8.67669" stroke="#6B6C77" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.3334 20H17.3434" stroke="#6B6C77" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 17.8334L9.75 13.5001L13 9.16675L16.25 13.5001L13 17.8334Z" stroke="#6B6C77" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  )
}

export default PokerSvg
