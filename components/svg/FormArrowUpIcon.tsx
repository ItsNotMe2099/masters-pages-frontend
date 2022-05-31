import React from 'react'

interface Props {
  className?: string
}

function FormArrowUpIcon({className}: Props) {
  return (
    <svg className={className} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 7.5L7 1.5L1 7.5" stroke="#6D718C" strokeWidth="1.3"/>
    </svg>


  )
}

export default FormArrowUpIcon
