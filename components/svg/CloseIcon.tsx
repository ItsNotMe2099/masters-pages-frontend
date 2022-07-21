import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

function CloseIcon({color, onClick, className}: Props) {
  return (
    <svg className={className} onClick={onClick} style={{cursor: 'pointer'}} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0553 9.00468L17.7712 1.28882C18.069 1.00121 18.0772 0.526666 17.7896 0.228866C17.502 -0.0689331 17.0275 -0.0771907 16.7297 0.210419C16.7234 0.216436 16.7173 0.222585 16.7112 0.228866L8.99532 7.94473L1.27945 0.228822C0.981652 -0.0587868 0.507105 -0.0505293 0.219496 0.24727C-0.0610863 0.537778 -0.0610863 0.998314 0.219496 1.28882L7.93536 9.00468L0.219496 16.7205C-0.0731652 17.0133 -0.0731652 17.4878 0.219496 17.7805C0.5122 18.0731 0.986747 18.0731 1.27945 17.7805L8.99532 10.0646L16.7112 17.7805C17.009 18.0681 17.4835 18.0599 17.7711 17.7621C18.0517 17.4715 18.0517 17.011 17.7711 16.7205L10.0553 9.00468Z" fill={color}/>
    </svg>

  )
}
CloseIcon.defaultProps = {
  color: '#797979'
}

export default CloseIcon
