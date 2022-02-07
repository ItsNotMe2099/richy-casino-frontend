import React from 'react'

interface Props {
  color?: string
  className?: string
}

function CrossSvg(props: Props) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="2" rx="1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 12.5355 4.05029)" fill="#7BD245"/>
      <rect width="12" height="2" rx="1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 4.05026 5.46436)" fill="#7BD245"/>
    </svg>
  )
}

export default CrossSvg
