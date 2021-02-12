import styles from './index.module.scss'

interface Props {}

export default function Backgrounds(props: Props) {
  return (
    <>
      <img src="/img/ComingSoon/bg1.svg" className={styles.bg1} alt=""/>
      <img src="/img/ComingSoon/bg2.svg" className={styles.bg2} alt=""/>
    </>
  )
}
