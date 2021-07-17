import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Telegram(props: Props) {
  return (
    <svg className={props.className} width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.84753 11.131L7.51669 15.7843C7.99003 15.7843 8.19503 15.581 8.44086 15.3368L10.66 13.216L15.2584 16.5835C16.1017 17.0535 16.6959 16.806 16.9234 15.8077L19.9417 1.66432L19.9425 1.66349C20.21 0.416822 19.4917 -0.0706777 18.67 0.235156L0.928359 7.02766C-0.282474 7.49766 -0.264141 8.17266 0.722526 8.47849L5.25836 9.88932L15.7942 3.29682C16.29 2.96849 16.7409 3.15016 16.37 3.47849L7.84753 11.131Z"/>
    </svg>

  )
}

export default Telegram
