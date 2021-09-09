import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

function MenuMobile(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.5" width="30" height="2" fill={props.color}/>
      <rect x="3" y="10.5" width="27" height="2" fill={props.color}/>
      <rect y="20.5" width="30" height="2" fill={props.color}/>
    </svg>
  )
}

MenuMobile.defaultProps = {
  color: 'white'
}


export default MenuMobile
