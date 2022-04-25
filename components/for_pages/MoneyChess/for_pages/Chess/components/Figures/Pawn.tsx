import React from 'react'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'

interface Props {
  side: ChessGameSide
}

function ChessFigurePawn(props: Props) {
  if(props.side === ChessGameSide.BLACK) {
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 40H10L14 34L19 23H27L32 34L36 40H23Z" fill="#262534"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#262534"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#2A293B"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#090815"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#121027"/>
        <rect x="15" y="34" width="3" height="3" fill="#393D54"/>
        <path d="M21 23H23L19 32H17L21 23Z" fill="#393D54"/>
        <path d="M25 23H23L27 32H29L25 23Z" fill="#121027"/>
        <rect x="31" y="34" width="3" height="3" fill="#121027"/>
        <circle cx="23" cy="13" r="6" fill="#2C2B3E"/>
        <path
          d="M29 13C29 16.3137 26.3137 19 23 19C19.6863 19 17 16.3137 17 13C17 13 18.5 16.0001 23 16C27.5 16 29 13 29 13Z"
          fill="#121027"/>
        <circle cx="20.5" cy="10.5" r="1.5" fill="#393D54"/>
        <path d="M29 18H17L15 21H31L29 18Z" fill="#2A293B"/>
        <path d="M19 18H21L19 21H17L19 18Z" fill="#393D54"/>
        <path d="M27 18H25L27 21H29L27 18Z" fill="#121027"/>
        <path d="M29 23L17 23L15 21L31 21L29 23Z" fill="#090815"/>
        <rect width="12" height="2" transform="matrix(1 0 0 -1 12 34)" fill="#121027"/>
        <rect width="11" height="2" transform="matrix(1 0 0 -1 23 34)" fill="#090815"/>
      </svg>
    )
  }else{
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 40H10L14 34L19 23H27L32 34L36 40H23Z" fill="#DFE5FE"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#DFE5FE"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#D3DCFF"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#7D93E9"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#A8B7F3"/>
        <rect x="15" y="34" width="3" height="3" fill="white"/>
        <path d="M21 23H23L19 32H17L21 23Z" fill="white"/>
        <path d="M25 23H23L27 32H29L25 23Z" fill="#A8B7F3"/>
        <rect x="31" y="34" width="3" height="3" fill="#A8B7F3"/>
        <circle cx="23" cy="13" r="6" fill="#E9EDFF"/>
        <path d="M29 13C29 16.3137 26.3137 19 23 19C19.6863 19 17 16.3137 17 13C17 13 18.5 16.0001 23 16C27.5 16 29 13 29 13Z" fill="#A8B7F3"/>
        <circle cx="20.5" cy="10.5" r="1.5" fill="white"/>
        <path d="M29 18H17L15 21H31L29 18Z" fill="#D3DCFF"/>
        <path d="M19 18H21L19 21H17L19 18Z" fill="white"/>
        <path d="M27 18H25L27 21H29L27 18Z" fill="#A8B7F3"/>
        <path d="M29 23L17 23L15 21L31 21L29 23Z" fill="#7D93E9"/>
        <rect width="12" height="2" transform="matrix(1 0 0 -1 12 34)" fill="#A8B7F3"/>
        <rect width="11" height="2" transform="matrix(1 0 0 -1 23 34)" fill="#7D93E9"/>
      </svg>
    )
  }
}

export default ChessFigurePawn
