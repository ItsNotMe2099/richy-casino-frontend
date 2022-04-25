import React from 'react'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'

interface Props {
  side: ChessGameSide
}

function ChessFigureKnight(props: Props) {
  if(props.side === ChessGameSide.BLACK) {
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="12.5" r="1.5" fill="#2C2B3E"/>
        <path
          d="M22 4L10.7626 16.1738C10.2723 16.705 10 17.4014 10 18.1243C10 19.7125 11.2875 21 12.8757 21H19.871C21.0468 21 22 20.0468 22 18.871V18V22C17 22 12 25 12 32C12 43.5 12 36.5 12 36.5H34V20.5V19C34 12.3726 28.6274 7 22 7V4Z"
          fill="#262534"/>
        <path
          d="M12.8757 21H19.871C21.0469 21 22.0001 20.0468 22.0001 18.871V16C22.0001 16 22.0001 20 19.0001 20H15C13.5002 20 12.8757 21 12.8757 21Z"
          fill="#090815"/>
        <path d="M22 11C26.4183 11 30 14.5817 30 19V34H34V20.5V19C34 12.3726 28.6274 7 22 7V11Z" fill="#2C2B3E"/>
        <path d="M22 11C26.4183 11 30 14.5817 30 19V34H32V20.5V19C32 14.5 28.6274 9 22 9V11Z" fill="#121027"/>
        <rect x="26" y="18" width="6" height="2" fill="#121027"/>
        <rect x="17" y="13" width="3" height="2" rx="1" fill="#090815"/>
        <path
          d="M17 13.6577C17 13.2944 17.2944 13 17.6577 13H20.5C20.7761 13 21 13.2239 21 13.5C21 13.7761 20.7761 14 20.5 14H19.1808C19.0607 14 18.9411 14.0147 18.8246 14.0438L17.8172 14.2957C17.4021 14.3995 17 14.0855 17 13.6577Z"
          fill="#090815"/>
        <rect x="26" y="22" width="6" height="2" fill="#121027"/>
        <rect x="26" y="26" width="6" height="2" fill="#121027"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#262534"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#2A293B"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#090815"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#121027"/>
        <rect x="15" y="34" width="3" height="3" fill="#393D54"/>
        <rect x="31" y="34" width="3" height="3" fill="#121027"/>
        <rect width="12" height="2" transform="matrix(1 0 0 -1 12 34)" fill="#121027"/>
        <rect width="11" height="2" transform="matrix(1 0 0 -1 23 34)" fill="#090815"/>
        <rect x="22" y="4" width="1" height="7" fill="#121027"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18.9173 28.3135C18.2403 29.1925 18 30.2895 18 31H15C15 29.8407 15.3597 28.1329 16.4827 26.6747C17.5915 25.2349 19.3844 24.1255 22 24V26.8101C20.4016 26.9233 19.4827 27.5793 18.9173 28.3135Z"
              fill="#393D54"/>
      </svg>
    )
  }else{
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="12.5" r="1.5" fill="#E9EDFF"/>
        <path d="M22 4L10.7626 16.1738C10.2723 16.705 10 17.4014 10 18.1243C10 19.7125 11.2875 21 12.8757 21H19.871C21.0468 21 22 20.0468 22 18.871V18V22C17 22 12 25 12 32C12 43.5 12 36.5 12 36.5H34V20.5V19C34 12.3726 28.6274 7 22 7V4Z" fill="#DFE5FE"/>
        <path d="M12.8757 21H19.871C21.0469 21 22.0001 20.0468 22.0001 18.871V16C22.0001 16 22.0001 20 19.0001 20H15C13.5002 20 12.8757 21 12.8757 21Z" fill="#7D93E9"/>
        <path d="M22 11C26.4183 11 30 14.5817 30 19V34H34V20.5V19C34 12.3726 28.6274 7 22 7V11Z" fill="#E9EDFF"/>
        <path d="M22 11C26.4183 11 30 14.5817 30 19V34H32V20.5V19C32 14.5 28.6274 9 22 9V11Z" fill="#A8B7F3"/>
        <rect x="26" y="18" width="6" height="2" fill="#A8B7F3"/>
        <rect x="17" y="13" width="3" height="2" rx="1" fill="#7D93E9"/>
        <path d="M17 13.6577C17 13.2944 17.2944 13 17.6577 13H20.5C20.7761 13 21 13.2239 21 13.5C21 13.7761 20.7761 14 20.5 14H19.1808C19.0607 14 18.9411 14.0147 18.8246 14.0438L17.8172 14.2957C17.4021 14.3995 17 14.0855 17 13.6577Z" fill="#7D93E9"/>
        <rect x="26" y="22" width="6" height="2" fill="#A8B7F3"/>
        <rect x="26" y="26" width="6" height="2" fill="#A8B7F3"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#DFE5FE"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#D3DCFF"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#7D93E9"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#A8B7F3"/>
        <rect x="15" y="34" width="3" height="3" fill="white"/>
        <rect x="31" y="34" width="3" height="3" fill="#A8B7F3"/>
        <rect width="12" height="2" transform="matrix(1 0 0 -1 12 34)" fill="#A8B7F3"/>
        <rect width="11" height="2" transform="matrix(1 0 0 -1 23 34)" fill="#7D93E9"/>
        <rect x="22" y="4" width="1" height="7" fill="#A8B7F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9173 28.3135C18.2403 29.1925 18 30.2895 18 31H15C15 29.8407 15.3597 28.1329 16.4827 26.6747C17.5915 25.2349 19.3844 24.1255 22 24V26.8101C20.4016 26.9233 19.4827 27.5793 18.9173 28.3135Z" fill="white"/>
      </svg>
    )
  }
}

export default ChessFigureKnight
