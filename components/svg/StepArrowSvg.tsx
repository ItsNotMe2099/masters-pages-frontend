import React from 'react'

interface Props {
  className?: string
  color: string
}

function StepArrowSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="36" height="15" viewBox="0 0 36 15" fill="none">
      <path d="M35.169 8.32039C35.5595 7.92986 35.5595 7.2967 35.169 6.90617L28.8051 0.542213C28.4145 0.151689 27.7814 0.151689 27.3908 0.542213C27.0003 0.932738 27.0003 1.5659 27.3908 1.95643L33.0477 7.61328L27.3908 13.2701C27.0003 13.6607 27.0003 14.2938 27.3908 14.6843C27.7814 15.0749 28.4145 15.0749 28.8051 14.6843L35.169 8.32039ZM0.461914 8.61328L34.4619 8.61328V6.61328L0.461914 6.61328L0.461914 8.61328Z" fill={props.color} />
    </svg>
  )
}
StepArrowSvg.defaultProps = {
}

export default StepArrowSvg
