import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: (e) => void
}

function Eye(props: Props) {
  return (
    <svg onClick={props.onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.999 6C7.14377 6 4.88884 9.77258 4.09585 11.5534C3.96805 11.8405 3.96805 12.1595 4.09586 12.4466C4.88884 14.2274 7.14377 18 11.999 18C16.8543 18 19.109 14.2273 19.9019 12.4465C20.0296 12.1595 20.0296 11.8405 19.9019 11.5535C19.109 9.77274 16.8543 6 11.999 6ZM2.2688 10.7399C3.13813 8.78756 5.89025 4 11.999 4C18.1079 4 20.8598 8.78782 21.729 10.7401C22.0873 11.5448 22.0873 12.4552 21.729 13.2599C20.8598 15.2122 18.1079 20 11.999 20C5.89025 20 3.13813 15.2124 2.2688 13.2601C1.9104 12.4552 1.9104 11.5448 2.2688 10.7399Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM11.9153 10.0018C11.9434 10.0006 11.9716 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 11.9716 10.0006 11.9434 10.0018 11.9153C10.1577 11.9701 10.3253 12 10.5 12C11.3284 12 12 11.3284 12 10.5C12 10.3253 11.9701 10.1577 11.9153 10.0018Z"/>
    </svg>
  )
}

export default Eye
