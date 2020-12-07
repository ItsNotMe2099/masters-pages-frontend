import styles from './index.module.scss'

interface Props {
  type?: "submit" | "button" | "reset"
  blue?: boolean
  red?: boolean
  green?: boolean
  black?: boolean
  grey?: boolean
  white?: boolean

  borderGrey?: boolean
  borderRed?: boolean,
  bold?: boolean
  closeBtn?: boolean
  smallFont?: boolean
  mediumFont?: boolean
  largeFont?: boolean
  transparent?: boolean
  size?: string
  children?: any
  className?: string
  fullWidth?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {
  return (
      <button
        type={props.type}
      onClick={props.onClick}
      className={`
       ${styles.root}
       ${props.className && props.className}
        ${props.bold && styles.bold}
       ${props.blue && styles.blue}
       ${props.red && styles.red}
       ${props.green && styles.green}
       ${props.transparent && styles.transparent}
       ${props.grey && styles.grey}
         ${props.fullWidth && styles.fullWidth}
       ${props.white && styles.white}
         ${props.borderGrey && styles.borderGrey}
         ${props.borderRed && styles.borderRed}
       ${props.black && styles.black}
       ${props.closeBtn && styles.closeBtn}
       ${props.smallFont && styles.smallFont}
       ${props.mediumFont && styles.mediumFont}
       ${props.largeFont && styles.largeFont}
      `}
      style={{padding: props.size}}
      >
        {props.children}
      </button>
  )
}
Button.defaultProps = {
  type: 'submit'
}
