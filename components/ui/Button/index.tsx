import styles from './index.module.scss'

interface Props {
  type?: string
  blue?: boolean
  red?: boolean
  green?: boolean
  black?: boolean
  grey?: boolean
  bold?: boolean
  closeBtn?: boolean
  smallFont?: boolean
  mediumFont?: boolean
  largeFont?: boolean
  size?: string
  children?: any
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {
  return (
      <button
        type={props.type}
      onClick={props.onClick}
      className={`
       ${styles.root}
        ${props.bold && styles.bold}
       ${props.blue && styles.blue}
       ${props.red && styles.red}
       ${props.green && styles.green}
       ${props.grey && styles.grey}
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
