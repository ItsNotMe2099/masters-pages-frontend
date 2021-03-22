import Chat from "components/Chat";
import * as React from "react";
import styles from 'pages/PersonalArea/components/TabMessages/index.module.scss'
interface Props {

}
const TabMessages = (props: Props) => {

  return (
    <div className={styles.root}>
      <Chat/>
    </div>
  )
}

export default TabMessages
