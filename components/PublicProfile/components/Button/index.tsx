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

  target: string
  color?: 'white' | 'transparent' | 'green' | 'red'
  size?: 'normal' | 'small'
  like?: boolean
}

export default function Button(props: Props) {

  const getClassName = () => {
    return (
      `${props.size === 'normal' && styles.sizeNormal} ${props.size === 'small' && styles.sizeSmall}
      ${props.color === 'white' && styles.white} ${props.color === 'green' && styles.green} ${props.color === 'red' && styles.red} ${props.color === 'transparent' && styles.transparent}
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
          target={props.target}
          className={`${styles.link} ${getClassName()}`}
        >
          {props.children}
        </a>
        </Link>
        :
          <button onClick={props.onClick} type={props.type} disabled={props.disabled} className={`${styles.btn} ${getClassName()}`}>
            {props.children}
          </button>


  )
}

Button.defaultProps = {
  type: 'button',
  color: 'white',
  size: 'normal',
  target: '_blank'
}
