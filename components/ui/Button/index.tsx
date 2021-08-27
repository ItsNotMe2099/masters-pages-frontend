import styles from './index.module.scss'
import cx from 'classnames'
import Link from 'next/link';

interface Props {
  type?: "submit" | "button" | "reset"
  disabled?: boolean
  blue?: boolean
  red?: boolean
  green?: boolean
  black?: boolean
  grey?: boolean
  white?: boolean
  whiteRed?: boolean
  uppercase?: boolean
  borderGrey?: boolean
  borderLightGrey?: boolean
  borderRed?: boolean,
  borderC4?: boolean
  bold?: boolean
  closeBtn?: boolean
  smallFont?: boolean
  mediumFont?: boolean
  largeFont?: boolean
  transparent?: boolean
  size?: string
  href?: string
  children?: any
  className?: string
  fullWidth?: boolean
  target?: string
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {

  const getClasses = () => {
    return cx(styles.root, {
      [styles.disabled]: props.disabled,
      [styles.bold]: props.bold,
      [styles.blue]: props.blue,
      [styles.red]: props.red,
      [styles.green]: props.green,
      [styles.transparent]: props.transparent,
      [styles.grey]: props.grey,
      [styles.fullWidth]: props.fullWidth,
      [styles.white]: props.white,
      [styles.borderGrey]: props.borderGrey,
      [styles.borderLightGrey]: props.borderLightGrey,
      [styles.borderRed]: props.borderRed,
      [styles.borderC4]: props.borderC4,
      [styles.whiteRed]: props.whiteRed,
      [styles.uppercase]: props.uppercase,
      [styles.black]: props.black,
      [styles.closeBtn]: props.closeBtn,
      [styles.smallFont]: props.smallFont,
      [styles.mediumFont]: props.mediumFont,
      [styles.largeFont]: props.largeFont,

    }, props.className);
  }
  return (props.href ? <Link href={props.href}>
        <a href={props.href} target={props.target} className={getClasses()}
           style={{padding: props.size}}>{props.children}</a>
      </Link> :
      <button
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
        className={getClasses()}
        style={{padding: props.size}}
      >
        {props.children}
      </button>
  )
}
Button.defaultProps = {
  type: 'submit',
  target: '_blank',
}
