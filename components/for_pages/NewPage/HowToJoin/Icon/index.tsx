import AppPromoSvg from 'components/svg/AppPromoSvg'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  color: string
  className?: string
}

export default function Icon(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)} style={{ backgroundColor: `${props.color}` }}>
      <AppPromoSvg color='#DC2626' />
    </div>
  )
}
