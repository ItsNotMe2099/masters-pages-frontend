import React from 'react'

interface Props {
  className?: string
  color: string
}

function DownloadSvg(props: Props) {
  return (
    <svg className={props.className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1103_28037)">
        <path d="M3.84569 14.3223H15.9198V9.07227H17.429V15.0723C17.429 15.2712 17.3495 15.4619 17.208 15.6026C17.0665 15.7432 16.8745 15.8223 16.6744 15.8223H3.09106C2.89092 15.8223 2.69897 15.7432 2.55745 15.6026C2.41593 15.4619 2.33643 15.2712 2.33643 15.0723V9.07227H3.84569V14.3223ZM11.392 6.82227H15.1651L9.88272 12.0723L4.60031 6.82227H8.37346V2.32227H11.392V6.82227Z" fill={props.color} />
      </g>
      <defs>
        <clipPath id="clip0_1103_28037">
          <rect width="18.1111" height="18" fill="white" transform="translate(0.827148 0.0722656)" />
        </clipPath>
      </defs>
    </svg>
  )
}
DownloadSvg.defaultProps = {
}

export default DownloadSvg
