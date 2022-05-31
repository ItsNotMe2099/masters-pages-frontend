import React from 'react'

interface Props {
  className?: string
}

function FormArrowDownIcon({className}: Props) {
  return (
    <svg className={className} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0.5L7 6.5L13 0.5" stroke="#6D718C" strokeWidth="1.3"/>
    </svg>

  )
}

export default FormArrowDownIcon
