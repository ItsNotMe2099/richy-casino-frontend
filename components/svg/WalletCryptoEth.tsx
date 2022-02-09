import React from 'react'

interface Props {
  mainColor?: string
  iconColor?: string
}

function WalletCryptoEth(props: Props) {
  return (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect fill={props.mainColor} width="17" height="17" rx="6"/>
    <g clip-path="url(#clip0_964_148388)">
      <path d="M8.4999 4.00024L8.44531 4.22806V10.8388L8.4999 10.9057L10.9992 9.09185L8.4999 4.00024Z" fill="#F4F4F4"/>
      <path d="M8.49926 4L6 9.09161L8.49926 10.9055V7.69683V4Z" fill={props.iconColor}/>
      <path d="M8.49951 11.4863L8.46875 11.5323V13.8872L8.49951 13.9975L11.0003 9.67334L8.49951 11.4863Z" fill="#F4F4F4"/>
      <path d="M8.49926 13.9976V11.4863L6 9.67334L8.49926 13.9976Z" fill={props.iconColor}/>
      <path d="M8.5 10.9054L10.9992 9.09155L8.5 7.69678V10.9054Z" fill={props.iconColor}/>
      <path d="M6 9.09155L8.49922 10.9054V7.69678L6 9.09155Z" fill={props.iconColor}/>
    </g>
    <defs>
      <clipPath id="clip0_964_148388">
        <rect width="5" height="10" fill="white" transform="translate(6 4)"/>
      </clipPath>
    </defs>
  </svg>
  )
}

export default WalletCryptoEth
