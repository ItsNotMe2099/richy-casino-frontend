import React from 'react'

interface Props {
  color?: string
  className?: string
}

function LinkedIn(props: Props) {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46583 2.66663C3.46533 2.66663 2.65137 3.4797 2.65137 4.4791C2.65137 5.47894 3.46533 6.29232 4.46583 6.29232C5.46554 6.29232 6.27883 5.4789 6.27883 4.4791C6.27888 3.4797 5.46554 2.66663 4.46583 2.66663ZM5.83982 7.0579H3.09011C2.96807 7.0579 2.86919 7.15683 2.86919 7.27882V16.1124C2.86919 16.2345 2.96807 16.3334 3.09011 16.3334H5.83982C5.96185 16.3334 6.06074 16.2345 6.06074 16.1124V7.27882C6.06074 7.15683 5.96185 7.0579 5.83982 7.0579ZM10.4177 7.85269C10.9129 7.31325 11.7293 6.83849 12.8337 6.83849C15.9307 6.83849 16.3483 9.07725 16.3483 11.2672V16.1126C16.3483 16.2347 16.2494 16.3336 16.1274 16.3336H13.3827C13.2607 16.3336 13.1618 16.2347 13.1618 16.1126V11.8178C13.1618 10.6153 13.0729 9.69543 11.9548 9.69543C10.9281 9.69543 10.5281 10.2692 10.5281 11.742V16.1126C10.5281 16.2346 10.4292 16.3335 10.3072 16.3335H7.56348C7.44144 16.3335 7.34256 16.2346 7.34256 16.1126V7.27896C7.34256 7.15697 7.44144 7.05804 7.56348 7.05804H10.1968C10.3188 7.05804 10.4177 7.15697 10.4177 7.27896V7.85269Z"/>
    </svg>
  )
}

export default LinkedIn