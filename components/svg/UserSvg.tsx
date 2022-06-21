import React from 'react'

interface Props {
  className?: string
}

function UserSvg(props: Props) {
  return (
    <svg width="26" height="26" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <path d="M9 22V12h6v10"></path>
    </svg>
  )
}

export default UserSvg
