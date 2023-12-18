import React from 'react'

interface Props {
  className?: string
}

function GreatJobSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="1202" height="390" viewBox="0 0 1202 390" fill="none">
      <path d="M49.6884 41.8269C53.6866 17.696 74.5559 0 99.0159 0H1096.89C1120.93 0 1141.57 17.1019 1146.03 40.7198L1200.8 330.72C1206.62 361.51 1183.01 390 1151.67 390H50.966C20.0883 390 -3.40866 362.289 1.63862 331.827L49.6884 41.8269Z" fill="#1A92B7" />
    </svg>
  )
}
GreatJobSvg.defaultProps = {
}

export default GreatJobSvg
