import React from 'react'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'

interface Props {
  side: ChessGameSide
}

function ChessFigureKing(props: Props) {
  if(props.side === ChessGameSide.BLACK) {
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="11" y="21" width="24" height="8" fill="#090815"/>
        <rect x="22" y="4" width="2" height="8" fill="#262534"/>
        <rect x="19" y="9" width="2" height="8" transform="rotate(-90 19 9)" fill="#262534"/>
        <path d="M23 21C23 21 20 15.9 20 14.1667C20 12.4333 21.3263 11 23 11V21Z" fill="#121027"/>
        <path d="M23 21C23 21 26 15.9 26 14.1667C26 12.4333 24.6737 11 23 11V21Z" fill="#090815"/>
        <circle cx="32" cy="21" r="9" fill="#2C2B3E"/>
        <path
          d="M41 21C41 25.9706 36.9706 30 32 30C27.0294 30 23 25.9706 23 21C23 21 25.25 25.5001 32 25.5001C38.75 25.5 41 21 41 21Z"
          fill="#121027"/>
        <circle cx="14" cy="21" r="9" fill="#2C2B3E"/>
        <path
          d="M23 21C23 25.9706 18.9706 30 14 30C9.02944 30 5 25.9706 5 21C5 21 7.25 25.5001 14 25.5001C20.75 25.5 23 21 23 21Z"
          fill="#121027"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#262534"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#2A293B"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#090815"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#121027"/>
        <rect x="15" y="34" width="3" height="3" fill="#393D54"/>
        <rect x="31" y="34" width="3" height="3" fill="#121027"/>
        <rect x="22" y="5" width="1" height="3" fill="#393D54"/>
        <rect x="20" y="8" width="1" height="3" transform="rotate(-90 20 8)" fill="#393D54"/>
        <circle cx="11.5" cy="16.5" r="2.5" fill="#393D54"/>
        <circle cx="28.5" cy="16.5" r="2.5" fill="#393D54"/>
        <rect x="11" y="29" width="13" height="5" fill="#121027"/>
        <rect x="23" y="29" width="12" height="5" fill="#090815"/>
        <rect x="11" y="29" width="24" height="2" fill="#262534"/>
      </svg>
    )
  }else{
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="11" y="21" width="24" height="8" fill="#7D93E9"/>
        <rect x="22" y="4" width="2" height="8" fill="#DFE5FE"/>
        <rect x="19" y="9" width="2" height="8" transform="rotate(-90 19 9)" fill="#DFE5FE"/>
        <path d="M23 21C23 21 20 15.9 20 14.1667C20 12.4333 21.3263 11 23 11V21Z" fill="#A8B7F3"/>
        <path d="M23 21C23 21 26 15.9 26 14.1667C26 12.4333 24.6737 11 23 11V21Z" fill="#7D93E9"/>
        <circle cx="32" cy="21" r="9" fill="#E9EDFF"/>
        <path d="M41 21C41 25.9706 36.9706 30 32 30C27.0294 30 23 25.9706 23 21C23 21 25.25 25.5001 32 25.5001C38.75 25.5 41 21 41 21Z" fill="#A8B7F3"/>
        <circle cx="14" cy="21" r="9" fill="#E9EDFF"/>
        <path d="M23 21C23 25.9706 18.9706 30 14 30C9.02944 30 5 25.9706 5 21C5 21 7.25 25.5001 14 25.5001C20.75 25.5 23 21 23 21Z" fill="#A8B7F3"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#DFE5FE"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#D3DCFF"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#7D93E9"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#A8B7F3"/>
        <rect x="15" y="34" width="3" height="3" fill="white"/>
        <rect x="31" y="34" width="3" height="3" fill="#A8B7F3"/>
        <rect x="22" y="5" width="1" height="3" fill="white"/>
        <rect x="20" y="8" width="1" height="3" transform="rotate(-90 20 8)" fill="white"/>
        <circle cx="11.5" cy="16.5" r="2.5" fill="white"/>
        <circle cx="28.5" cy="16.5" r="2.5" fill="white"/>
        <rect x="11" y="29" width="13" height="5" fill="#A8B7F3"/>
        <rect x="23" y="29" width="12" height="5" fill="#7D93E9"/>
        <rect x="11" y="29" width="24" height="2" fill="#DFE5FE"/>
      </svg>
    )
  }
}

export default ChessFigureKing
