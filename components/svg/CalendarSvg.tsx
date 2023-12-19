import React from 'react'

interface Props {
  className?: string
  color: string
}

function CalendarSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19 4.00049H18V2.00049H16V4.00049H8V2.00049H6V4.00049H5C3.89 4.00049 3 4.90049 3 6.00049V20.0005C3 20.5309 3.21071 21.0396 3.58579 21.4147C3.96086 21.7898 4.46957 22.0005 5 22.0005H19C19.5304 22.0005 20.0391 21.7898 20.4142 21.4147C20.7893 21.0396 21 20.5309 21 20.0005V6.00049C21 5.47006 20.7893 4.96135 20.4142 4.58627C20.0391 4.2112 19.5304 4.00049 19 4.00049ZM19 20.0005H5V10.0005H19V20.0005ZM19 8.00049H5V6.00049H19V8.00049Z" fill={props.color} />
    </svg>
  )
}
CalendarSvg.defaultProps = {
}

export default CalendarSvg
