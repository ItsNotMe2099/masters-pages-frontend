import styles from './index.module.scss'

interface Props {
  index?: number
  page?: number
  onClick?: () => void
}

const Dot = (props: Props) => {

  return (
    <div className={styles.dot} onClick={props.onClick}>
      <img src={props.index + 1 === props.page ? '/img/Reports/Volunteers/dot-active.svg' : '/img/Reports/Volunteers/dot.svg'} alt='' />
    </div>
  )
}

export default Dot