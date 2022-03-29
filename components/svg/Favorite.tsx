import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Favorite(props: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5475 4.7961L9.35058 4.19995L7.47444 0.482528C7.4232 0.380747 7.3389 0.298353 7.23476 0.24827C6.97359 0.122256 6.65621 0.227268 6.52563 0.482528L4.64949 4.19995L0.452561 4.7961C0.336852 4.81225 0.231061 4.86557 0.150065 4.94634C0.0521452 5.04471 -0.00181317 5.17705 4.65248e-05 5.31428C0.00190622 5.45151 0.0594318 5.5824 0.159983 5.6782L3.19654 8.86662L2.47915 13.3958C2.46232 13.4909 2.47308 13.5886 2.51021 13.678C2.54733 13.7673 2.60934 13.8448 2.68919 13.9014C2.76904 13.9581 2.86354 13.9918 2.96198 13.9987C3.06042 14.0055 3.15886 13.9853 3.24613 13.9403L7.00006 11.5678L10.754 13.9403C10.8565 13.9936 10.9755 14.0113 11.0895 13.992C11.3772 13.9435 11.5706 13.6769 11.521 13.3958L10.8036 8.86662L13.8401 5.6782C13.9227 5.59903 13.9773 5.49564 13.9938 5.38255C14.0384 5.09982 13.8368 4.8381 13.5475 4.7961Z"/>
    </svg>
  )
}

export default Favorite
