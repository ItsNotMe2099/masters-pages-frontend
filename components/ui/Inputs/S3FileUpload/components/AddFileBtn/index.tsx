import Button from "components/ui/Button";
import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import styles from './index.module.scss'

const AddFileButton = () => (
  <div className={styles.root}>
  <Button  type={'button'} grey={true} mediumFont={true} bold={true} size="8px 25px">  <img src="img/icons/camera.svg" alt=''/> choose photo</Button>
  <div className={styles.desc}>
    Upload your photo, Format allowed PNG and JPEG
  </div>
  </div>
)

export default AddFileButton
