import styles from './index.module.scss'
import Tab from 'components/PublicProfile/components/Tab'
interface  ITab{
  id: number,
  name: string
}
interface Props{
  tabs: ITab[]
}
const Tabs = (props: Props) => {
  return (
    <div className={`${styles.root}`}>
      {props.tabs.map(tab => <Tab title={tab.name}/>)}
    </div>
  )
}

export default Tabs
