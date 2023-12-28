import React from 'react'

interface Props {
  className?: string
  color?: string
  opacity?: string
}

function DotNewSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
      <circle opacity={props.opacity} cx="3" cy="3" r="3" fill={props.color} />
    </svg>
  )
}

DotNewSvg.defaultProps = {

}

export default DotNewSvg
