import Button from "components/ui/Button";
import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import styles from './index.module.scss'

interface Props {
  altView?: boolean
}

const AddFileButton = (props: Props) => (
  <>
  {props.altView ?
      <a className={styles.alt}> <img src="/img/icons/staple.svg" alt=''/> attach photos</a>
    :
  <>
  <div className={styles.root}>
  <Button  type={'button'} grey={true} mediumFont={true} bold={true} size="8px 25px">  <img src="/img/icons/camera.svg" alt=''/> choose photo</Button>
  <div className={styles.desc}>
    Upload your photo, Format allowed PNG and JPEG
  </div>
  </div>

<div className={styles.root__mobile}>
<div className={styles.desc}>
  Upload your photo, Format allowed PNG and JPEG
</div>
<div className={styles.btnContainer}>
<Button  type={'button'} grey={true} mediumFont={true} bold={true} size="8px 25px">  <img src="/img/icons/camera.svg" alt=''/> choose photo</Button>
</div>
</div>
</>}</>
)

export default AddFileButton
