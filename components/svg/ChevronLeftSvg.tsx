interface Props {
  className?: string
}

function ChevronLeftSvg(props: Props) {
  return (
    <svg className={props.className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.4999 23.95L31.3999 14.05L29.2499 11.9L17.1999 23.95L29.2499 36L31.3999 33.85L21.4999 23.95Z" fill="black" />
    </svg>
  )
}
ChevronLeftSvg.defaultProps = {
}

export default ChevronLeftSvg
