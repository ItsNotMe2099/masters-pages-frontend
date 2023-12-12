import React from 'react'

interface Props {
  className?: string
}

function ArrowNewSvg(props: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.7539 12L11.7539 9.11325V14.8868L16.7539 12ZM6.75391 12.5H12.2539V11.5H6.75391V12.5Z" fill="black"/>
    </svg>    
  )
}
ArrowNewSvg.defaultProps = {
}

export default ArrowNewSvg
