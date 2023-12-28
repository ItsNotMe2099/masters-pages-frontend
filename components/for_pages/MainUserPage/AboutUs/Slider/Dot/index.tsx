import DotNewSvg from 'components/svg/DotNewSvg'
import styles from './index.module.scss'

interface Props {
  index?: number
  page?: number
  onClick?: () => void
}

const Dot = (props: Props) => {

  return (
    <div className={styles.dot} onClick={props.onClick}>
      {props.index + 1 === props.page ? <DotNewSvg color='#6D718C' /> : <DotNewSvg color='#6D718C' opacity='0.5' />}
    </div>
  )
}

export default Dot