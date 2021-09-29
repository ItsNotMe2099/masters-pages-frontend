import React from 'react'

interface Props {
  className?: string
}

function Calendar(props: Props) {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9999 18H1.99988V7H15.9999V18ZM12.9999 0V2H4.99988V0H2.99988V2H1.99988C0.889878 2 -0.00012207 2.89 -0.00012207 4V18C-0.00012207 18.5304 0.210592 19.0391 0.585664 19.4142C0.960737 19.7893 1.46944 20 1.99988 20H15.9999C16.5303 20 17.039 19.7893 17.4141 19.4142C17.7892 19.0391 17.9999 18.5304 17.9999 18V4C17.9999 2.89 17.0999 2 15.9999 2H14.9999V0"/>
    </svg>

  )
}
Calendar.defaultProps = {
}

export default Calendar
