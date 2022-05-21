
import styles from 'components/for_pages/Corporate/Button/index.module.scss'
import Link from 'next/link'

interface Props{
  children?: any
  size?: 'normal' | 'small',
  outline?: boolean,
  onClick?: () => void
  color?: 'green' | 'red' | 'outlineRed' | 'outlineGreen' | 'yellow' | 'outlineYellow'
  triangle?: boolean
  href?: string
}

const MainSectionButton = (props: Props) => {
  return (
    props.href ?
    <Link href={props.href}>
      <a
      onClick={props.onClick}
      className=
      {`${styles.root} ${props.outline && styles.outline}
      ${props.size === 'normal' && styles.sizeNormal}
      ${props.size === 'small' && styles.sizeSmall}
      ${props.color === 'green' && styles.green}
      ${props.color === 'red' && styles.red}
      ${props.color === 'yellow' && styles.yellow}
      ${props.color === 'outlineGreen' && styles.outlineGreen}
      ${props.color === 'outlineRed' && styles.outlineRed}
      ${props.color === 'outlineYellow' && styles.outlineYellow}
      `
      }>
        {props.triangle && <div className={styles.triangle}></div>}
        {props.children}
    </a>
    </Link>
    :
      <div
      onClick={props.onClick}
      className=
      {`${styles.root} ${props.outline && styles.outline}
      ${props.size === 'normal' && styles.sizeNormal}
      ${props.size === 'small' && styles.sizeSmall}
      ${props.color === 'green' && styles.green}
      ${props.color === 'red' && styles.red}
      ${props.color === 'yellow' && styles.yellow}
      ${props.color === 'outlineGreen' && styles.outlineGreen}
      ${props.color === 'outlineRed' && styles.outlineRed}
      ${props.color === 'outlineYellow' && styles.outlineYellow}
      `
      }>
        {props.triangle && <div className={styles.triangle}></div>}
        {props.children}
    </div>
  )
}
export default MainSectionButton
MainSectionButton.defaultProps = {
  size: 'normal'
}
