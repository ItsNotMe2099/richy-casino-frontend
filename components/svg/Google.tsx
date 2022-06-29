import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Google(props: Props) {
  return (
    <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.5" width="43" height="43" rx="8" fill="#FA5B5B"/>
      <path d="M28.9865 20.5386C29.0839 21.0603 29.1369 21.6057 29.1369 22.1749C29.1369 26.6273 26.1571 29.7932 21.6564 29.7932C20.6329 29.7935 19.6194 29.5921 18.6738 29.2006C17.7281 28.809 16.8689 28.235 16.1452 27.5113C15.4214 26.7876 14.8474 25.9283 14.4559 24.9827C14.0643 24.037 13.863 23.0235 13.8633 22C13.863 20.9765 14.0643 19.963 14.4559 19.0173C14.8474 18.0716 15.4214 17.2124 16.1452 16.4887C16.8689 15.765 17.7281 15.1909 18.6738 14.7994C19.6194 14.4079 20.6329 14.2065 21.6564 14.2068C23.7607 14.2068 25.519 14.9811 26.868 16.2382L24.6711 18.4351V18.4296C23.8533 17.6506 22.8154 17.2508 21.6564 17.2508C19.0851 17.2508 16.9951 19.4231 16.9951 21.9952C16.9951 24.5666 19.0851 26.7437 21.6564 26.7437C23.9895 26.7437 25.5776 25.4097 25.9037 23.5778H21.6564V20.5386H28.9873H28.9865Z" fill="white"/>
    </svg>

  )
}

export default Google
