import Avatar from "../../components/Avatar";
import * as React from "react";
import styles from './index.module.scss'
interface Props {

}
const Comment = (props: Props) => {
  return (
    <div className={styles.root}>
    <div className={styles.commentTop}>
      <div className={styles.top}>
        <Avatar/>
          <div className={styles.date}>
              10/11/20 15:32
          </div>
      </div>
      <div className={styles.taskText}>
        <div className={styles.title}>Task title</div>
        <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lobortis consequat quis pulvinar suspendisse. Sed eu amet, auctor fermentum posuere convallis. Fusce lectus morbi purus suscipit velit.</div>
        <div className={styles.images}>
          <img src="/img/icons/Rectangle 1134431.png" alt=""/>
          <img src="/img/icons/Rectangle 1134432.png" alt=""/>
          <div className={styles.number}><span>+15</span></div>
        </div>
      </div>
    </div>
        <div className={styles.commentBottom}>
          <div className={styles.comment}>
            <Avatar mini/>
            <div className={styles.textSection}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices risus a purus accumsan felis morbi ipsum, urna arcu. Gravida hac eget ullamcorper enim id justo, nec. Nunc at faucibus cras fusce. Et convallis risus, fames in id nibh. In volutpat consectetur risus metus massa venenatis. Bibendum.</div>
            <div className={styles.images}>
              <img src="/img/icons/Rectangle 1134431.png" alt=""/>
              <img src="/img/icons/Rectangle 1134432.png" alt=""/>
              <div className={styles.number}><span>+3</span></div>
          </div>
          </div>
          <img className={styles.arrow} src="/img/icons/commentArrow.svg" alt=""/>
        </div>
      </div>
  )
}

export default Comment
