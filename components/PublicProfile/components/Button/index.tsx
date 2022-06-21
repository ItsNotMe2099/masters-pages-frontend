import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'

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
  color?: 'white' | 'transparent' | 'green' | 'red' | 'grey'
  size?: 'normal' | 'small'
  like?: boolean
  projectBtn?: 'default' | 'red' | 'recycleBin' | 'green'
}

export default function Button(props: Props) {

  const getClassName = () => {
    return classNames(
      {
        [styles.sizeNormal]:props.size === 'normal',
        [styles.sizeSmall]: props.size === 'small',
        [styles.white]: props.color === 'white',
        [styles.green]: props.color === 'green',
        [styles.red]: props.color === 'red',
        [styles.transparent]: props.color === 'transparent',
        [styles.grey]: props.color === 'grey',
        [styles.deafaultProject]: props.projectBtn === 'default',
        [styles.redProject]: props.projectBtn === 'red',
        [styles.greenProject]: props.projectBtn === 'green',
        [styles.recycleBin]: props.projectBtn === 'recycleBin'
  }, props.className
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
