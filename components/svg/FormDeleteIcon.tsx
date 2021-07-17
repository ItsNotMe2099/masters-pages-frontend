import React from 'react'

interface Props {
  className?: string
}

function FormDeleteIcon({className}: Props) {
  return (
    <svg className={className}  width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.805298 11L10.8053 1" stroke="#6D718C"/>
      <path d="M0.8053 1L10.8053 11" stroke="#6D718C"/>
    </svg>


  )
}

export default FormDeleteIcon
