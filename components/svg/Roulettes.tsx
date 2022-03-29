import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Roulettes(props: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.41403 8.41421C9.19508 7.63317 9.19508 6.36683 8.41403 5.58579C7.63298 4.80474 6.36665 4.80474 5.5856 5.58579C4.80455 6.36683 4.80455 7.63317 5.5856 8.41421C6.36665 9.19526 7.63298 9.19526 8.41403 8.41421Z"/>
      <rect x="3.46436" y="4.87866" width="2" height="3" rx="0.2" transform="rotate(-45 3.46436 4.87866)"/>
      <rect x="4.87891" y="10.5355" width="2" height="3" rx="0.2" transform="rotate(-135 4.87891 10.5355)"/>
      <rect x="7" y="8.41418" width="2" height="3" rx="0.2" transform="rotate(-45 7 8.41418)"/>
      <rect x="8.41406" y="7" width="2" height="3" rx="0.2" transform="rotate(-135 8.41406 7)"/>
    </svg>
  )
}

export default Roulettes
