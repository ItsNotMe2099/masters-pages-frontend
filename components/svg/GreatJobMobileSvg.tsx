import React from 'react'

interface Props {
  className?: string
}

function GreatJobMobileSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="386" height="390" viewBox="0 0 386 390" fill="none">
      <path d="M17.9205 47.1002C19.4567 20.657 41.3485 0 67.8364 0H319.138C345.68 0 367.597 20.7395 369.062 47.2415L385.085 337.242C386.668 365.896 363.859 390 335.161 390H50.989C22.2348 390 -0.594468 365.806 1.07318 337.1L17.9205 47.1002Z" fill="#1A92B7" />
    </svg>
  )
}
GreatJobMobileSvg.defaultProps = {
}

export default GreatJobMobileSvg
