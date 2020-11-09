import styles from './index.module.scss'

interface Props {}
export default function Loader(props: Props) {
  return (
    <div className={styles.root}>
      <img src={'img/loader/loader.gif'}/>
    </div>
  )
}
