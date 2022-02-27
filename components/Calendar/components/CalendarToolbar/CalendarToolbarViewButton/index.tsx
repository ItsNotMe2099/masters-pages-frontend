import styles from './index.module.scss'

interface Props {
  label: string,
  value: string,
  isActive: boolean
  onClick: () => void
}

export default function CalendarToolbarViewButton(props: Props) {

  const {label, value,onClick, isActive } = props

  return (
    <div className={`${styles.root} ${isActive && styles.active}`} onClick={onClick}>
      {label}
    </div>
  )
}
CalendarToolbarViewButton.defaultProps = {

}
