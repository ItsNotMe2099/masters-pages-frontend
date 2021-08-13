import Button from "components/ui/Button";
import React from 'react'
import styles from './index.module.scss'
import {useTranslation} from "i18n";

interface Props {
  altView?: boolean
}

const AddFileButton = (props: Props) => {
  const {t} = useTranslation('common');
  return (
  <>
  {props.altView ?
      <a className={styles.alt}> <img src="/img/icons/staple.svg" alt=''/> {t('fileInput.attachPhotos')}</a>
    :
  <>
  <div className={styles.root}>
  <Button  type={'button'} grey={true} mediumFont={true} bold={true} size="8px 25px">  <img src="/img/icons/camera.svg" alt=''/>  {t('forms.fileInput.title')}</Button>
  <div className={styles.desc}>
    {t('forms.fileInput.description')}
  </div>
  </div>

<div className={styles.root__mobile}>
<div className={styles.desc}>
  {t('forms.fileInput.description')}
</div>
<div className={styles.btnContainer}>
<Button  type={'button'} grey={true} mediumFont={true} bold={true} size="8px 25px">  <img src="/img/icons/camera.svg" alt=''/>  {t('forms.fileInput.title')}</Button>
</div>
</div>
</>}</>
)
}

export default AddFileButton
