import React from 'react'

interface Props {
  className?: string
}

function MessageSendSvg(props: Props) {
  return (
    <svg className={props.className} width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.1014 4.5946L14.114 9.32268L3.1014 7.85433V4.5946ZM14.114 17.3986L3.1014 22.1267V18.8669L14.114 17.3986ZM0.164703 0.145508V10.4239L22.1899 13.3606L0.164703 16.2973V26.5758L31 13.3606L0.164703 0.145508Z" fill="#F2B705"/>
    </svg>


  )
}
MessageSendSvg.defaultProps = {
}

export default MessageSendSvg
