import React from 'react'

interface Props {
  className?: string
}

function UserIcon({className}: Props) {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C4.01496 0 2.4 1.65596 2.4 3.69141C2.4 5.72685 4.01496 7.38281 6 7.38281C7.98504 7.38281 9.6 5.72685 9.6 3.69141C9.6 1.65596 7.98504 0 6 0Z" fill="#6D718C"/>
      <path d="M10.4791 9.79439C9.49349 8.76824 8.18691 8.20312 6.8 8.20312H5.2C3.81312 8.20312 2.50651 8.76824 1.52091 9.79439C0.540133 10.8155 0 12.1634 0 13.5898C0 13.8164 0.179093 14 0.4 14H11.6C11.8209 14 12 13.8164 12 13.5898C12 12.1634 11.4599 10.8155 10.4791 9.79439Z" fill="#6D718C"/>
    </svg>

  )
}
UserIcon.defaultProps = {

}

export default UserIcon
