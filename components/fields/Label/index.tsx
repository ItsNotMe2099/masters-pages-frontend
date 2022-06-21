import styles from './index.module.scss'
import cx from 'classnames'
import {LabelStyleType} from 'types/types'
interface Props {
  label?: string
  hasError?: boolean
  style?: LabelStyleType
}

export default function Label(props: Props) {
  const { label, hasError, style } = props
  if (!label) {
    return null
  }
  console.log("LabelStyle", style);
  return (
    <div
      className={cx(styles.root, {
        [styles.error]: hasError,
        [styles.cross]: style ===  LabelStyleType.Cross,
        [styles.static]: !style || style ===  LabelStyleType.Static,
      })}
    >
      {label}
    </div>
  )
}
Label.defaultProps = {
  style: LabelStyleType.Static,
}
