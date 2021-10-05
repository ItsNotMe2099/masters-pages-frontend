import styles from './index.module.scss'

const Card = ({icon, text}: {icon: string, text: string}) => {
  return (<div className={styles.card}>
    <div className={styles.cardWrapper}>
    <div className={styles.cardImage}><img src={`/img/Main/icons/${icon}`}/></div>
    <div className={styles.cardText}>{text}</div>
    </div>
  </div>)
}
interface IIcon{
  icon: string
  text: string
}
interface Props{
  index: number
  title: string
  description: string,
  icons: IIcon[]
}

const SlideWithCards= (props: Props) => {

  const titleFirst = props.title.split(' ')[0];
  const title = props.title.split(' ').slice(1).join(' ');


  return (
    <div className={styles.root}>

      <div className={styles.container}>
        <div className={styles.subTitle}><span className={styles.subTitleFirst}>{titleFirst}</span> {title}</div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.cards}>
          {props.icons.map(icon =>      <Card icon={icon.icon} text={icon.text}/>)}
        </div>
      </div>
    </div>
  )
}
export default SlideWithCards
