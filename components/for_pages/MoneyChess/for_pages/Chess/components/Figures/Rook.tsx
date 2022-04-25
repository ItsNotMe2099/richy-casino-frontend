import React from 'react'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'

interface Props {
  side: ChessGameSide
}

function ChessFigureRook(props: Props) {
  if(props.side === ChessGameSide.BLACK) {
  return (
    <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 36.5L9 40H23H37L34 36V34V31L31 28V17L35 14V7H29V10H26V7H20V10H17V7H11V14L15 17V28L12 31V34V36.5Z" fill="#262534"/>
      <path d="M11 14H35L31 17H15L11 14Z" fill="#090815"/>
      <path d="M12 31H34L31 28H15L12 31Z" fill="#2C2B3E"/>
      <rect x="11" y="10" width="12" height="4" fill="#121027"/>
      <rect x="20" y="7" width="6" height="3" fill="#262534"/>
      <rect x="29" y="7" width="6" height="3" fill="#262534"/>
      <rect x="12" y="31" width="11" height="3" fill="#121027"/>
      <rect x="23" y="10" width="12" height="4" fill="#090815"/>
      <rect x="13" y="10" width="2" height="4" fill="#393D54"/>
      <rect x="17" y="17" width="3" height="11" fill="#393D54"/>
      <rect x="26" y="17" width="3" height="11" fill="#121027"/>
      <rect x="23" y="31" width="11" height="3" fill="#090815"/>
      <rect x="31" y="7" width="3" height="3" fill="#121027"/>
      <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#262534"/>
      <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#2A293B"/>
      <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#090815"/>
      <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#121027"/>
      <rect x="15" y="34" width="3" height="3" fill="#393D54"/>
      <rect x="30" y="34" width="3" height="3" fill="#121027"/>
    </svg>
  )
  }else{
    return (
      <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 36.5L9 40H23H37L34 36V34V31L31 28V17L35 14V7H29V10H26V7H20V10H17V7H11V14L15 17V28L12 31V34V36.5Z" fill="#DFE5FE"/>
        <path d="M11 14H35L31 17H15L11 14Z" fill="#7D93E9"/>
        <path d="M12 31H34L31 28H15L12 31Z" fill="#E9EDFF"/>
        <rect x="11" y="10" width="12" height="4" fill="#A8B7F3"/>
        <rect x="20" y="7" width="6" height="3" fill="#DFE5FE"/>
        <rect x="29" y="7" width="6" height="3" fill="#DFE5FE"/>
        <rect x="12" y="31" width="11" height="3" fill="#A8B7F3"/>
        <rect x="23" y="10" width="12" height="4" fill="#7D93E9"/>
        <rect x="13" y="10" width="2" height="4" fill="white"/>
        <rect x="17" y="17" width="3" height="11" fill="white"/>
        <rect x="26" y="17" width="3" height="11" fill="#A8B7F3"/>
        <rect x="23" y="31" width="11" height="3" fill="#7D93E9"/>
        <rect x="31" y="7" width="3" height="3" fill="#A8B7F3"/>
        <rect width="28" height="2" transform="matrix(-1 0 0 1 37 36)" fill="#DFE5FE"/>
        <path d="M9 36V40H23H37V36C37 34.8954 36.1046 34 35 34H34H12H11C9.89543 34 9 34.8954 9 36Z" fill="#D3DCFF"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 37 37)" fill="#7D93E9"/>
        <rect width="14" height="3" transform="matrix(-1 0 0 1 23 37)" fill="#A8B7F3"/>
        <rect x="15" y="34" width="3" height="3" fill="white"/>
        <rect x="30" y="34" width="3" height="3" fill="#A8B7F3"/>
      </svg>
    )
  }
}

export default ChessFigureRook
