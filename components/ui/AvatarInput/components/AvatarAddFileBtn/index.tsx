import Button from "components/ui/Button";
import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import styles from './index.module.scss'

const AvatarAddFileBtn = (props) => (
  <>
  <div className={`${styles.root} ${props.isLoading && styles.loading} ${props.hasImage && styles.hasImage}`}>
    <img src="/img/icons/avatar-upload.svg" alt=''/>

</div>
</>
)

export default AvatarAddFileBtn