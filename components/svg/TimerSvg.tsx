import React from 'react'

interface Props {
  className?: string
  color: string
}

function TimerSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.975 21.9502C10.7417 21.9502 9.57917 21.7169 8.4875 21.2502C7.39583 20.7835 6.44583 20.146 5.6375 19.3377C4.82917 18.5294 4.1875 17.5794 3.7125 16.4877C3.2375 15.396 3 14.2274 3 12.9819C3 11.7363 3.2375 10.5697 3.7125 9.48187C4.1875 8.39409 4.82917 7.44186 5.6375 6.6252C6.44583 5.80853 7.39583 5.16686 8.4875 4.7002C9.57917 4.23353 10.7417 4.0002 11.975 4.0002C13.2083 4.0002 14.3708 4.23353 15.4625 4.7002C16.5542 5.16686 17.5083 5.80853 18.325 6.6252C19.1417 7.44186 19.7833 8.39409 20.25 9.48187C20.7167 10.5697 20.95 11.7363 20.95 12.9819C20.95 14.2274 20.7167 15.396 20.25 16.4877C19.7833 17.5794 19.1417 18.5294 18.325 19.3377C17.5083 20.146 16.5542 20.7835 15.4625 21.2502C14.3708 21.7169 13.2083 21.9502 11.975 21.9502ZM15 17.0502L16.05 16.0002L12.8 12.7502V8.0002H11.3V13.3502L15 17.0502ZM5.35 2.3252L6.4 3.3752L2.3 7.3252L1.25 6.2752L5.35 2.3252ZM18.6 2.3252L22.7 6.2752L21.65 7.3252L17.55 3.3752L18.6 2.3252ZM11.9761 20.4502C14.0587 20.4502 15.825 19.7248 17.275 18.2741C18.725 16.8234 19.45 15.0567 19.45 12.9741C19.45 10.8915 18.7246 9.1252 17.2739 7.6752C15.8232 6.2252 14.0565 5.5002 11.9739 5.5002C9.89131 5.5002 8.125 6.22555 6.675 7.67627C5.225 9.12699 4.5 10.8937 4.5 12.9763C4.5 15.0589 5.22536 16.8252 6.67607 18.2752C8.12679 19.7252 9.89346 20.4502 11.9761 20.4502Z" fill={props.color} />
    </svg>
  )
}
TimerSvg.defaultProps = {
}

export default TimerSvg