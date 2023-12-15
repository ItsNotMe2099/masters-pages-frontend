import React from 'react'

interface Props {
  className?: string
  color: string
}

function PostSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M4.5 31.5V4.5H31.5V31.5H4.5ZM28.5 26.1375H7.5V29.0625H28.5V26.1375ZM7.5 24.6H28.5V21.675H7.5V24.6ZM7.5 19.7625H28.5V7.5H7.5V19.7625Z" fill={props.color} />
    </svg>
  )
}
PostSvg.defaultProps = {
}

export default PostSvg
