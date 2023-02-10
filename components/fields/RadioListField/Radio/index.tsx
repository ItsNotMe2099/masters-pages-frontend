import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from "classnames";
interface Props {
  value: string,
  isActive: boolean
  label?: string,
  className?: string
  children?: any
  onChange: (boolean) => void
  labelClassName?: string
}
export default function Radio(props: Props) {
  const [active, setActive] = useState(props.isActive)
  useEffect(() => {
    setActive(props.isActive)
  }, [props.isActive])
  const handleClick = () => {
    props.onChange(props.value)
  }
  return (
    <div className={`${styles.root} ${props.className || ''}`} onClick={handleClick}>
      {props.isActive ? <img src={'/img/icons/radio-active.svg'} /> : <img src={'/img/icons/radio.svg'} />}
      {props.children && props.children.length ? props.children : <div className={classNames(styles.label, props.labelClassName)}>{props.label}</div>}

    </div>
  )
}
