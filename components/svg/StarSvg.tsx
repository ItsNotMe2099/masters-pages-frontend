import React from 'react'

interface Props {
  className?: string
  color: string
}

function StarSvg(props: Props) {
  return (
    <svg className={props.className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1103_28047)">
        <path d="M9.09257 13.7673L3.77017 16.7283L4.95871 10.7823L0.47998 6.66627L6.53739 5.95227L9.09257 0.447266L11.6477 5.95227L17.7052 6.66627L13.2264 10.7823L14.415 16.7283L9.09257 13.7673Z" fill={props.color} />
      </g>
      <defs>
        <clipPath id="clip0_1103_28047">
          <rect width="18.1111" height="18" fill="white" transform="translate(0.0371094 0.0722656)" />
        </clipPath>
      </defs>
    </svg>
  )
}
StarSvg.defaultProps = {
}

export default StarSvg
