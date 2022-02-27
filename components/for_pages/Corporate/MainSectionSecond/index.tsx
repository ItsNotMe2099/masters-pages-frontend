
import styles from 'components/for_pages/Corporate/MainSectionSecond/index.module.scss'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { useDispatch } from 'react-redux'
import React from 'react'
import {signUpOpen} from 'components/Modal/actions'
import { useTranslation, Trans } from 'next-i18next'

const Label = ({label, index}: {label: string, index: number}) => {

  return (<div className={styles.label} style=
  {{marginLeft: (index >= 3 ? 60 : 30) +  index * 18}}>
    <span className={styles.labelFirst}>{label[0]}</span>
    <span className={styles.letters}>{label.slice(1)}</span>
  </div>)
}

const MainSectionSecond = (props) => {
  const dispatch = useDispatch()
  const {t} = useTranslation('common')

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
        <div className={styles.free}><img src='/img/MainVolunteer/icons/free.svg' alt=''/></div>
        <div className={styles.title}><Trans i18nKey="newMainVolunteer.corporatePlatform" className={styles.text}>"Corporate platform for <br/> projects with volunteers"</Trans></div>
        <div className={styles.btns}>
          <MainSectionButton size="normal" color="outlineYellow" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
          <MainSectionButton size="normal" color="yellow" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</MainSectionButton>
        </div>
        </div>
        <div className={styles.rightSide}>
          <Label label={t('mainPage.labels.advertise')} index={0}/>
          <Label label={t('mainPage.labels.communicate')} index={1}/>
          <Label label={t('mainPage.labels.timeManage')} index={2}/>
          <div className={styles.labelSeparator}/>
          <Label label={t('mainPage.labels.note')} index={3}/>
          <Label label={t('mainPage.labels.organize')} index={4}/>
          <Label label={t('mainPage.labels.wow')} index={5}/>
        </div>
      </div>
      <div className={styles.bgRect}></div>
    </div>
  )
}
export default MainSectionSecond
