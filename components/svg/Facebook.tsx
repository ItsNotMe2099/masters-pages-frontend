import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Facebook(props: Props) {
  return (
    <svg className={props.className} width="11" height="21" viewBox="0 0 11 21" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.21784 3.80081H10.0282V0.620814C9.71587 0.57748 8.64172 0.47998 7.39074 0.47998C4.78055 0.47998 2.9925 2.13581 2.9925 5.17915V7.97998H0.112122V11.535H2.9925V20.48H6.52399V11.5358H9.28786L9.72661 7.98081H6.52316V5.53165C6.52399 4.50415 6.79831 3.80081 8.21784 3.80081Z"/>
    </svg>

  )
}

export default Facebook
