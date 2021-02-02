import TaskActionButton from 'components/Task/components/ActionButton'
import { format } from 'date-fns'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const Description = (props) => {

  const dispatch = useDispatch();
  const handleReadMore = () => {

  }
  const handleShare = () => {

  }
  const handleFavorite = () => {

  }

  return (
    <div className={styles.main}>
    <div className={styles.mainInfo}>
      <div className={styles.top}>
        <div className={styles.name}>
          <div className={styles.nameText}>Jenny Wilson</div>
          <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
        </div>
        <div className={styles.time}>
          <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
          <div className={styles.desc}>{format(new Date(), 'MM.dd.yyy hh:mm')}</div>
        </div>
      </div>
      <div>
      <div className={styles.taskTitle}>
          <div className={styles.title}>Looking for help</div>
        </div>
        <div className={styles.category}>Courier &rarr; Small delivery</div>
        <div className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum adipiscing habitasse at turpis erat tincidunt. Faucibus nisi, elit tellus, risus, viverra magna nisl. Amet fusce sit accumsan ac duis justo, id bibendum. Non gravida a, lectus nisi id. Ut adipiscing porttitor rhoncus adipiscing non felis commodo eros, risus. Non tellus condimentum mi enim faucibus commodo in. Amet, velit sodales purus aliquam facilisis consectetur egestas vitae pellentesque.
          Congue arcu sit nullam habitant egestas eget. Enim auctor elementum blandit ornare elit morbi leo ac. Nec adipiscing ut sit urna arcu ullamcorper. Velit egestas sit nec aliquet at eleifend quis. Id interdum parturient at nunc est integer morbi. Nulla sem nullam eget proin ornare lectus ornare in sapien. Laoreet euismod quam quis viverra. Pretium velit arcu nunc ut fusce eget. Convallis eget adipiscing ut sit felis quam enim in tempor. Habitasse adipiscing ut accumsan et tempus eleifend augue. Tellus ac eu, quam sagittis, est, bibendum convallis. Malesuada suspendisse suspendisse augue nisl, nisi id at leo.<br/><br/>

          Gravida diam eu ultricies blandit sit a dictum amet. Nulla consequat blandit quis duis pellentesque gravida condimentum at. Pharetra, volutpat viverra quam sit faucibus massa. Accumsan commodo lacus condimentum bibendum. At integer vulputate nunc fames. Aliquet in quis pharetra eget ut donec eu. Duis malesuada sollicitudin volutpat mus nisl bibendum. Erat viverra facilisi lobortis at et condimentum.<br/><br/>

          Dignissim risus quam in ut consequat. Egestas elementum porttitor quis dignissim ultricies dictumst nibh elit. Nec nec at pretium, mauris tincidunt viverra pulvinar mollis. Nec, sed sollicitudin libero adipiscing ipsum semper erat tincidunt magna. Et, molestie semper ultricies diam ante faucibus ipsum imperdiet. Ultrices maecenas velit rhoncus, egestas. Diam tempus condimentum tellus a sapien posuere. Eget consequat mattis egestas dui elementum vulputate habitant blandit sagittis.
        </div>
      </div>
    </div>
    <div className={styles.bottom}>
      <TaskActionButton title={'Read more'} icon={'down'} onClick={handleReadMore}/>
      <div className={styles.separatorLine}/>
      <TaskActionButton title={'Share'} icon={'share'} onClick={handleShare}/>
      <div className={styles.separatorLine}/>
      <TaskActionButton title={'Save'} icon={'favorite'} onClick={handleFavorite}/>
    </div>
  </div>
  )
}

export default Description
