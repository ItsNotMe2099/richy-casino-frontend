import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Telegram(props: Props) {
  return (
    <svg className={props.className} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="43" height="43" rx="8" fill="#0D70E3"/>
      <path d="M28.3582 14.9426L14.3219 20.3552C13.364 20.74 13.3696 21.2744 14.1462 21.5126L17.7498 22.6368L26.0877 17.3762C26.4819 17.1363 26.8421 17.2654 26.5461 17.5282L19.7908 23.6248H19.7892L19.7908 23.6256L19.5422 27.3401C19.9063 27.3401 20.0671 27.1731 20.2713 26.9759L22.0217 25.2739L25.6626 27.9631C26.3339 28.3329 26.816 28.1429 26.9831 27.3417L29.3731 16.0779C29.6177 15.097 28.9986 14.6529 28.3582 14.9426Z" fill="white"/>
    </svg>

  )
}

export default Telegram
