import React from 'react'

interface Props {
  className?: string
}

function GreatJob2Svg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="1077" height="49" viewBox="0 0 1077 49" fill="none">
      <path d="M0 0H1077V7C1077 30.196 1058.2 49 1035 49H42C18.8041 49 0 30.196 0 7V0Z" fill="white" />
    </svg>
  )
}
GreatJob2Svg.defaultProps = {
}

export default GreatJob2Svg
