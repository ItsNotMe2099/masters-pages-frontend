import styles from './index.module.scss'

interface Props {
  largeHeader?: boolean
  blue?: boolean
  green?: boolean
  smallHeader?: boolean
  largeInput?: boolean
  categoryBtn?: boolean
  footerBtn?: boolean
  children?: any
}

export default function Button(props: Props) {
  return (
      <button className={`
       ${styles.root}
       ${props.largeHeader && styles.largeHeader}
       ${props.smallHeader && styles.smallHeader}
       ${props.largeInput && styles.largeInput}
       ${props.categoryBtn && styles.categoryBtn}
       ${props.footerBtn && styles.footerBtn}
       ${props.blue && styles.blue}
       ${props.green && styles.green}
      `}>
        {props.children}
      </button>
  )
}
