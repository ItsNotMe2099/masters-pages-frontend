import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ArrowDownSmall(props: Props) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2575 0.791045C11.5803 1.14909 11.5808 1.71016 11.2591 2.06878L6.6465 7.20744C6.48538 7.38673 6.25421 7.50004 5.99998 7.50004C5.74643 7.50004 5.51491 7.38759 5.35328 7.20722C5.35322 7.20715 5.35334 7.20728 5.35328 7.20722L0.741093 2.06886C0.575827 1.88464 0.5 1.65233 0.5 1.43073C0.5 1.20848 0.576246 0.975395 0.74264 0.790871C1.09334 0.402311 1.6848 0.403551 2.03406 0.792525L5.99999 5.21092L9.96587 0.792757C10.3151 0.403697 10.9068 0.402399 11.2575 0.791045Z" fill="#060606"/>
    </svg>
  )
}
ArrowDownSmall.defaultProps = {

}

export default ArrowDownSmall
