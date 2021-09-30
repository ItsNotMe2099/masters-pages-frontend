import React from 'react'

interface Props {
  className?: string
}

function PlayIcon(props: Props) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="14" fill="white"/>
      <path d="M10.0001 8.20788C10.0001 7.42176 10.8654 6.94303 11.5314 7.36069L20.4492 12.9532C21.0741 13.3451 21.0741 14.2557 20.4492 14.6476L11.5314 20.2401C10.8654 20.6577 10.0001 20.179 10.0001 19.3929V8.20788Z" fill="#EB5757"/>
    </svg>
  )
}
PlayIcon.defaultProps = {
}

export default PlayIcon
