import React from 'react'

interface Props {
  className?: string
}

function CircleSvg(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="366" height="358" viewBox="0 0 366 358" fill="none">
      <path opacity="0.1" d="M430 111C430 247.414 319.414 358 183 358C46.5857 358 -64 247.414 -64 111C-64 -25.4143 46.5857 -136 183 -136C319.414 -136 430 -25.4143 430 111Z" fill="white" />
    </svg>
  )
}
CircleSvg.defaultProps = {
}

export default CircleSvg
