import React from 'react'

interface Props {
  className?: string
}

function CalendarArrowLeft({className}: Props) {
  return (
    <svg className={className} width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.70703 0.293C5.8945 0.480528 5.99982 0.734836 5.99982 1C5.99982 1.26516 5.8945 1.51947 5.70703 1.707L2.41403 5L5.70703 8.293C5.88919 8.4816 5.98998 8.7342 5.9877 8.9964C5.98543 9.2586 5.88026 9.50941 5.69485 9.69482C5.50944 9.88023 5.25863 9.9854 4.99643 9.98767C4.73423 9.98995 4.48163 9.88916 4.29303 9.707L0.293031 5.707C0.10556 5.51947 0.000244141 5.26516 0.000244141 5C0.000244141 4.73484 0.10556 4.48053 0.293031 4.293L4.29303 0.293C4.48056 0.105529 4.73487 0.000213623 5.00003 0.000213623C5.26519 0.000213623 5.5195 0.105529 5.70703 0.293Z" fill="#18181B"/>
    </svg>

  );
}

CalendarArrowLeft.defaultProps = {
}

export default CalendarArrowLeft
