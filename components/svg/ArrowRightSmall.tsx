import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ArrowRightSmall(props: Props) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.87341 4.72559L0.734858 0.113083C0.566499 -0.0379511 0.293923 -0.0376973 0.125846 0.113865C-0.0421 0.265407 -0.041666 0.510894 0.126714 0.662046L4.9594 5.00002L0.12654 9.33797C-0.0418185 9.48914 -0.0422525 9.73447 0.125672 9.88603C0.209927 9.96201 0.320308 10 0.430688 10C0.540786 10 0.650733 9.96227 0.734836 9.88682L5.87341 5.27443C5.9545 5.20181 6 5.10299 6 5.00002C6 4.89705 5.95437 4.79834 5.87341 4.72559Z" fill="black"/>
    </svg>
  )
}
ArrowRightSmall.defaultProps = {

}

export default ArrowRightSmall
