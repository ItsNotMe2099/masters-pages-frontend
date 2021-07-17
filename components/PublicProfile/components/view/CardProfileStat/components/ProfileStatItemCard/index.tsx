import styles from './index.module.scss'


interface Props{
  value: string | number,
  label: string,
  icon: string,
  children?: any
}
const ProfileStatItemCard = ({value, label, icon, children}: Props) => {

  return (
    <div className={styles.root}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>
        {children && children}
        {!children && <><img src={`/img/Profile/${icon}.svg`}/> {label}</>}
      </div>
    </div>
  )
}

export default ProfileStatItemCard
