import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  children?: React.ReactNode
  fluid?: boolean
  disabled?: boolean
  href?: string
  className?: string
  type?: 'submit' | 'reset' | 'button'
  blank?: boolean
  onClick?: (e: any) => void

  color?: 'white' | 'transparent' | 'green'
  size?: 'normal' | 'small'
  like?: boolean
}

export default function Button(props: Props) {

  const getClassName = () => {
    return (
      `${props.size === 'normal' && styles.sizeNormal} ${props.size === 'small' && styles.sizeSmall}
      ${props.color === 'white' && styles.white} ${props.color === 'green' && styles.green} ${props.color === 'transparent' && styles.transparent}
      ${props.className && props.className}
          `
    )
  }

  return (

      props.href ?
        <Link href={props.href}>
        <a
          onClick={props.onClick}
          href={props.href}
          target='_blank'
          className={`${styles.link} ${getClassName()}`}
        >
          {props.children}
        </a>
        </Link>
        :
          <button onClick={props.onClick} className={`${styles.btn} ${getClassName()}`}>
            {props.children}
          </button>


  )
}

Button.defaultProps = {
  type: 'button',
  color: 'white',
  size: 'normal'
}
