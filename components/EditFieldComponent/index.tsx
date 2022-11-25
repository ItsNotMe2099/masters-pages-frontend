import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  onClick: () => void
  className?: string
}

export default function EditFieldComponent(props: Props) {

  return (
    <div className={classNames(styles.edit, props.className)} onClick={props.onClick}>
      <img src='/img/Registration/new/user/edit.svg' alt=''/>
    </div>
  )
}
