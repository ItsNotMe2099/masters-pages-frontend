import styles from './index.module.scss'


interface Props{
  name: string
}
const RewardsListItem = (props: Props) => {

  return (
    <div className={styles.root}>
      <div className={styles.icon}><img src={'/img/icons/star_reward.svg'}/></div>
      <div className={styles.name}>{props.name}</div>
    </div>
  )
}

export default RewardsListItem
