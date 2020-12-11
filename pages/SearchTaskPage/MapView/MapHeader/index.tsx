import Logo from "components/Logo";
import ArrowDown from "components/svg/ArrowDown";
import SearchTaskFilter from "pages/SearchTaskPage/Filter";
import { useState } from "react";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'

const MapHeader = (props) => {
  const [expanded, setExpanded] = useState(false)
  const handleMoreClick = () => {
    setExpanded(expanded => !expanded)
  }
  return (
      <div className={styles.root}>
        <div className={`${styles.container}`}>
          <div className={styles.logo}>
            <Logo color={'white'}/>
          </div>
          <div className={styles.form}>
            <SearchTaskFilter collapsed={!expanded}/>
          </div>

          <div className={styles.more} onClick={handleMoreClick}>More <ArrowDown color={'white'}/></div>
        </div>
      </div>

  )
}
export default withAuthSync(MapHeader)
