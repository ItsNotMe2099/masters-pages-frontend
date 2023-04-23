import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ArrowDown(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4391 15.8312L19.8191 8.97981C20.0607 8.75533 20.0603 8.3919 19.8178 8.1678C19.5753 7.94387 19.1826 7.94445 18.9407 8.16895L12 14.6125L5.05925 8.16872C4.81737 7.94424 4.42484 7.94366 4.18234 8.16756C4.06078 8.2799 4 8.42708 4 8.57425C4 8.72105 4.06038 8.86764 4.18109 8.97978L11.5609 15.8312C11.6771 15.9393 11.8352 16 12 16C12.1647 16 12.3227 15.9392 12.4391 15.8312Z" fill={props.color}/>
    </svg>
  )
}
ArrowDown.defaultProps = {
  color: '#919191'
}

export default ArrowDown
