import React from 'react'

interface Props {
  color?: string
  className?: string
}

function GameMuteSvg(props: Props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_3803_192885)">
        <path d="M3 5.00005H0V11H3L7 16H8V4.91142e-05L7 0L3 5.00005ZM13.088 13.088L11.96 11.96C12.482 11.4411 12.8962 10.8241 13.1789 10.1445C13.4615 9.46488 13.6071 8.73609 13.6071 8.00005C13.6071 7.264 13.4615 6.53522 13.1789 5.85561C12.8962 5.17601 12.482 4.55899 11.96 4.04005L13.088 2.91205C13.7585 3.5789 14.2906 4.37171 14.6537 5.24489C15.0167 6.11806 15.2036 7.05439 15.2036 8.00005C15.2036 8.9457 15.0167 9.88203 14.6537 10.7552C14.2906 11.6284 13.7585 12.4212 13.088 13.088ZM10.832 10.832L9.696 9.69605C10.1454 9.24605 10.3979 8.63605 10.3979 8.00005C10.3979 7.36405 10.1454 6.75405 9.696 6.30405L10.832 5.16805C11.2064 5.53853 11.5037 5.97959 11.7065 6.46569C11.9094 6.9518 12.0139 7.47331 12.0139 8.00005C12.0139 8.52679 11.9094 9.0483 11.7065 9.53441C11.5037 10.0205 11.2064 10.4616 10.832 10.832Z" fill="#797C86"/>
      </g>
      <defs>
        <clipPath id="clip0_3803_192885">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  )
}

export default GameMuteSvg
