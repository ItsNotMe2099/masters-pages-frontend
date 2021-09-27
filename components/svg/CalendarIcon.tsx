import React from 'react'

interface Props {
  className?: string
  onClick?: () => void
}

function CalendarIcon(props: Props) {
  return (
    <svg onClick={props.onClick}  className={props.className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9375 2.25H13.5V1.5C13.5 1.22387 13.2762 1 13 1C12.7238 1 12.5 1.22387 12.5 1.5V2.25H5.5V1.5C5.5 1.22387 5.27616 1 5 1C4.72384 1 4.5 1.22387 4.5 1.5V2.25H3.0625C1.92522 2.25 1 3.17522 1 4.3125V14.9375C1 16.0748 1.92522 17 3.0625 17H14.9375C16.0748 17 17 16.0748 17 14.9375V4.3125C17 3.17522 16.0748 2.25 14.9375 2.25ZM3.0625 3.25H4.5V3.75C4.5 4.02612 4.72384 4.25 5 4.25C5.27616 4.25 5.5 4.02612 5.5 3.75V3.25H12.5V3.75C12.5 4.02612 12.7238 4.25 13 4.25C13.2762 4.25 13.5 4.02612 13.5 3.75V3.25H14.9375C15.5234 3.25 16 3.72662 16 4.3125V5.5H2V4.3125C2 3.72662 2.47662 3.25 3.0625 3.25ZM14.9375 16H3.0625C2.47662 16 2 15.5234 2 14.9375V6.5H16V14.9375C16 15.5234 15.5234 16 14.9375 16Z" fill="#828282" stroke="#828282"/>
    </svg>
  )
}
CalendarIcon.defaultProps = {
}

export default CalendarIcon
