import React from 'react'

interface Props {
  className?: string
}

function LogoSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="37" height="45" viewBox="0 0 37 45" fill="none">
      <path d="M35.2912 13.7528V10.0398H1V44.1126H27.8651L35.2912 36.6865V17.4659H16.1701M10.6103 6.32671C13.8865 -1.09942 23.2784 -0.44417 26.1178 6.32671" stroke="#E4474E" stroke-width="1.74732" />
      <rect x="6.32812" y="16.2236" width="2.28358" height="2.28358" fill="black" />
      <rect x="6.32812" y="18.5078" width="2.28358" height="2.28358" fill="black" />
      <rect x="8.6123" y="16.2236" width="2.28358" height="2.28358" fill="black" />
      <rect x="8.6123" y="18.5078" width="2.28358" height="2.28358" fill="black" />
      <rect x="6.32812" y="26.8809" width="20.5522" height="2.28358" fill="#E4474E" />
      <rect x="6.32812" y="32.9707" width="18.2687" height="2.28358" fill="black" />
    </svg>
  )
}
LogoSvg.defaultProps = {
}

export default LogoSvg
