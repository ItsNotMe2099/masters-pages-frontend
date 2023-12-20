import React from 'react'

interface Props {
  className?: string
}

function GreatJob2Svg(props: Props) {
  return (
    <svg className={props.className} width="1103" height="264" viewBox="0 0 1103 264" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.3" filter="url(#filter0_f_2346_396)">
        <path d="M54 54H1049V168C1049 191.196 1030.2 210 1007 210H96C72.804 210 54 191.196 54 168V54Z" fill="#1A92B7" />
      </g>
      <path d="M13 134H1090V141C1090 164.196 1071.2 183 1048 183H55C31.8041 183 13 164.196 13 141V134Z" fill="white" />
      <defs>
        <filter id="filter0_f_2346_396" x="0" y="0" width="1103" height="264" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="27" result="effect1_foregroundBlur_2346_396" />
        </filter>
      </defs>
    </svg>
  )
}
GreatJob2Svg.defaultProps = {
}

export default GreatJob2Svg
