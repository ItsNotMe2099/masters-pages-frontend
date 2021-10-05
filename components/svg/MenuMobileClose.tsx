import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

function MenuMobileClose(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9.521" y="7.39941" width="23.3856" height="3" transform="rotate(45 9.521 7.39941)" fill={props.color}/>
      <rect x="7.34082" y="23.9937" width="23.55" height="3" transform="rotate(-45 7.34082 23.9937)" fill={props.color}/>
    </svg>
  )
}

MenuMobileClose.defaultProps = {
  color: 'white'
}


export default MenuMobileClose
