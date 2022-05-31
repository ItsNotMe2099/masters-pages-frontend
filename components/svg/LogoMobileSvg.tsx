import React from 'react'

interface Props {
  color?: string,
  className?: string
}

function LogoMobileSvg({color, className}: Props) {
  const getColor = () => {
    switch (color) {
      case 'white':
      default:
        return '#ffffff'
    }
  }
  return (
    <svg className={className} width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.5852 13.9213V9.71484H1V30H16.1722L24.5852 21.587V18.1278H15.1335" stroke={ color ? getColor() : 'black'} strokeWidth="1.97953"/>
      <rect x="5.51025" y="16.7207" width="2.58706" height="2.58706" fill={ color ? getColor() : 'black'}/>
      <rect x="5.51025" y="19.3076" width="2.58706" height="2.58706" fill={ color ? getColor() : 'black'}/>
      <rect x="8.09717" y="16.7207" width="2.58706" height="2.58706" fill={ color ? getColor() : 'black'}/>
      <rect x="8.09717" y="19.3076" width="2.58706" height="2.58706"fill={ color ? getColor() : 'black'}/>
      <path d="M7.10547 5.57893C9.68515 -0.804696 17.0802 -0.241434 19.316 5.57893" stroke={ color ? getColor() : 'black'} strokeWidth="1.97953"/>
    </svg>




  )
}

export default LogoMobileSvg
