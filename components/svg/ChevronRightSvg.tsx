import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
  link: string
}

function ChevronRightSvg(props: Props) {
  return (
    <Link href={props.link}>
      <a>
        <svg className={props.className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.5001 23.95L16.6001 14.05L18.7501 11.9L30.8001 23.95L18.7501 36L16.6001 33.85L26.5001 23.95Z" fill="black" />
        </svg>
      </a>
    </Link>
  )
}
ChevronRightSvg.defaultProps = {
}

export default ChevronRightSvg
