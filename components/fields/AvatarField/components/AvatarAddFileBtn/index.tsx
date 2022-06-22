import React from 'react'
import styles from './index.module.scss'

const AvatarAddFileBtn = (props) => (
  <>
  <div className={`${styles.root} ${props.isLoading && styles.loading} ${props.hasImage && styles.hasImage}`}>
    <img className={styles.dummy} src="/img/icons/avatar-upload.svg" alt=''/>

</div>
</>
)

export default AvatarAddFileBtn