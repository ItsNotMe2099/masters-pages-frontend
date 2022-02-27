import Logo from 'components/Logo'
import styles from './index.module.scss'
import { useState } from 'react'
import { useTranslation, Trans } from 'next-i18next'

interface Props {
 jobDone?: boolean
 firstName?: string
 lastName?: string
 img?: string
 job?: string
}

export default function ModalHeader(props: Props) {

  const [show, setShowAll] = useState(false)
  const {t} = useTranslation('common')

  return (
    <div className={styles.root}>
    <div className={styles.job}>
      {props.jobDone ?
        <>
          <div className={styles.avatar}><img src={props.img} alt=""/></div>
          <div className={styles.name}>{props.firstName} {props.lastName}</div>
          <Trans i18nKey="modal.markedJob" className={styles.text}>marked job like a<span> done</span></Trans>
        </>
        :
        <>
          <div className={styles.logo}><Logo/></div>
          <div className={styles.text}>{t('modal.describeExperience')}</div>
        </>
      }
      </div>
      {props.job ?
      <div className={styles.top}>
        <div className={styles.work}>{props.job}</div>
          <a className={styles.details} onClick={() => show ? setShowAll(false) : setShowAll(true)}>
            {show ? <span>{t('hide')}</span> : <span>{t('seeDetails')}</span>}<img className={show ? styles.hide : null} src="/img/icons/arrowDetails.svg" alt=''/>
          </a>
      </div>
      : null}
    </div>
  )
}
