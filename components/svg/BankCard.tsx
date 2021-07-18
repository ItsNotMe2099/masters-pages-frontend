import React from 'react'

interface Props {
  color?: string
  className?: string
}

function BankCard(props: Props) {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.25 0H1.75C0.785062 0 0 0.785062 0 1.75V9.25C0 10.2149 0.785062 11 1.75 11H14.25C15.2149 11 16 10.2149 16 9.25V1.75C16 0.785062 15.2149 0 14.25 0ZM1.75 1H14.25C14.6635 1 15 1.33647 15 1.75V2.75H1V1.75C1 1.33647 1.33647 1 1.75 1ZM14.25 10H1.75C1.33647 10 1 9.66353 1 9.25V3.75H15V9.25C15 9.66353 14.6635 10 14.25 10Z" fill="#010101"/>
      <path d="M3.5 8.5H3C2.72388 8.5 2.5 8.27612 2.5 8V7.5C2.5 7.22388 2.72388 7 3 7H3.5C3.77612 7 4 7.22388 4 7.5V8C4 8.27612 3.77612 8.5 3.5 8.5Z" fill="#010101"/>
    </svg>

  )
}

export default BankCard