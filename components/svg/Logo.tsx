import React from 'react'

interface Props {
  color?: string,
  className?: string
}

function LogoSvg({color, className}: Props) {
  const getColor = () => {
    switch (color) {
      case 'white':
      default:
        return '#ffffff'
    }
  }
  return (
    <svg className={className} width="37" height="45" viewBox="0 0 37 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.2912 13.7528V10.0398H1V44.1126H27.8651L35.2912 36.6865V17.4659H16.1701M10.6103 6.32671C13.8865 -1.09942 23.2784 -0.44417 26.1178 6.32671" stroke={ color ? getColor() : '#E4474E'} strokeWidth="1.74732"/>
      <rect x="6.32812" y="16.2239" width="2.28358" height="2.28358" fill={ color ? getColor() : 'black'}/>
      <rect x="6.32812" y="18.5076" width="2.28358" height="2.28358" fill={ color ? getColor() : 'black'}/>
      <rect x="8.6123" y="16.2239" width="2.28358" height="2.28358" fill={ color ? getColor() : 'black'}/>
      <rect x="8.6123" y="18.5076" width="2.28358" height="2.28358" fill={ color ? getColor() : 'black'}/>
      <rect x="6.32812" y="26.8806" width="20.5522" height="2.28358" fill={ color ? getColor() : '#E4474E'}/>
      <rect x="6.32812" y="32.9702" width="18.2687" height="2.28358" fill={ color ? getColor() : 'black'}/>
    </svg>



  )
}

export default LogoSvg
