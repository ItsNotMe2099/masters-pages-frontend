import styles from './index.module.scss'

interface Props{
  children?: any
  size?: 'normal' | 'small',
  outline?: boolean,
  onClick?: () => void
}

const MainSectionButton = (props: Props) => {
  return (
      <div onClick={props.onClick} className={`${styles.root} ${props.outline && styles.outline} ${props.size === 'normal' && styles.sizeNormal} ${props.size === 'small' && styles.sizeSmall}`}>
        {props.children}
    </div>
  )
}
export default MainSectionButton
MainSectionButton.defaultProps = {
  size: 'normal'
}
