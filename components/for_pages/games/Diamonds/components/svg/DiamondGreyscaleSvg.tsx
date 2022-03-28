import React from 'react'

interface Props {
  active: boolean,
  filled: boolean
  outlined: boolean
}

function DiamondGreyscaleSvg({active, filled, outlined}: Props) {
  const grey = '#6B6C77'
  const black = '#14151B'
  const white = '#ffffff'
  const getFillColor = () => {

    if(active && filled){
      return white
    }
    if(active && outlined){
      return black
    }
    if(filled){
      return grey
    }
    return black
  }
  const getStokeColor = () => {
    if(active && (filled || outlined)){
      return white
    }
    if(filled || outlined){
      return grey
    }
    return black
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.73415 4.43309L4.18038 1.3753C4.37015 1.13809 4.65747 1 4.96125 1H11.0388C11.3425 1 11.6298 1.13809 11.8196 1.37531L14.2658 4.43309C14.5473 4.78493 14.5587 5.28156 14.2937 5.64596L8.80874 13.1878C8.40939 13.7369 7.59061 13.7369 7.19126 13.1878L1.70628 5.64596C1.44127 5.28156 1.45268 4.78493 1.73415 4.43309Z" fill={getFillColor()} stroke={getStokeColor()} stroke-width="2"/>
    </svg>

  )
}

export default DiamondGreyscaleSvg
