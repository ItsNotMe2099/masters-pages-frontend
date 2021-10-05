import React from 'react'

interface Props {
  className?: string
  onClick?: () => void
}

function ArrowDropDown(props: Props) {
  return (
    <svg className={props.className} onClick={props.onClick} width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 4L0 0L5 4.03788e-07L2.5 4Z" />
    </svg>
  )
}


export default ArrowDropDown
