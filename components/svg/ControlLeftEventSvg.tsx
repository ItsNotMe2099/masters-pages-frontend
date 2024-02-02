import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ControlLeftEventSvg(props: Props) {
  return (
    <svg className={props.className} width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.126589 5.77441L5.26514 10.3869C5.4335 10.538 5.70608 10.5377 5.87415 10.3861C6.0421 10.2346 6.04167 9.98911 5.87329 9.83795L1.0406 5.49998L5.87346 1.16203C6.04182 1.01086 6.04225 0.765527 5.87433 0.613965C5.79007 0.537989 5.67969 0.5 5.56931 0.5C5.45921 0.5 5.34927 0.537735 5.26516 0.613184L0.126589 5.22557C0.0455018 5.29819 1.21705e-07 5.39701 1.19249e-07 5.49998C1.16793e-07 5.60295 0.045632 5.70166 0.126589 5.77441Z" fill={props.color} />
    </svg>
  )
}
ControlLeftEventSvg.defaultProps = {
  color: 'black'
}

export default ControlLeftEventSvg
