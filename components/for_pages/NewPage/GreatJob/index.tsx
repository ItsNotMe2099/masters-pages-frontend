import GreatJobSvg from 'components/svg/GreatJobSvg'
import styles from './index.module.scss'
import GreatJob2Svg from 'components/svg/GreatJob2Svg'
import Item from './Item'
//import DotsSvg from 'components/svg/DotsSvg'
//import Dots2Svg from 'components/svg/Dots2Svg'

interface Props {

}

export default function GreatJob(props: Props) {

  return (
    <div className={styles.root}>
      <GreatJobSvg className={styles.blue} />
      <GreatJob2Svg className={styles.white} />
      {/*<DotsSvg className={styles.dotsLeft} color='#147C9C' />*/}
      {/*<Dots2Svg className={styles.dotsRight} color='#147C9C' />*/}
      <div className={styles.content}>
        <div className={styles.text}>
          We are doing great job.<br />
          Our platform in numbers.
        </div>
        <div className={styles.stats}>
          <Item number='234' text='Volunteers' />
          <div className={styles.separator} />
          <Item number='173k' text='Hours logged' />
          <div className={styles.separator} />
          <Item number='832' text='Events opened' />
          <div className={styles.separator} />
          <Item number='88k' text='Reviews collected' />
        </div>
      </div>
    </div>
  )
}
