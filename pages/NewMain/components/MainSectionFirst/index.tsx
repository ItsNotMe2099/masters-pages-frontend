import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import {signUpOpen} from 'components/Modal/actions'
import {useTranslation} from "i18n";

const Label = ({label, index}: {label: string, index: number}) => {

  return (<div className={styles.label} style={{marginLeft:(index >= 3 ? 30 : 0) +  index * 18}}>
    <span className={styles.labelFirst}>{label[0]}</span>
    <span>{label.slice(1)}</span>
  </div>)
}
const Category = ({label}: {label: string}) => {
  return (<div className={styles.category}>
    <img src={'/img/Main/icons/mark.svg'}/> {label}
  </div>)
}
const MainSectionFirst = (props) => {
  const dispatch = useDispatch()
  const {t} = useTranslation('common')
  const renderLabel = (label, index) => {
    return (<div className={styles.label}>
      <span className={styles.labelFirst}>{label[0]}</span>
      <span>{label.slice(1)}</span>
    </div>)
  }
  return (
    <div className={styles.root}  style={{backgroundImage: `url(/img/Main/bg/first_${Math.floor(Math.random() * 6) + 1 }.png)`}}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
        <div className={styles.title}>{t('mainPage.modernBusiness')}</div>
          <div className={styles.categories}>
            <div className={styles.categoriesColumn}>
              <Category label={t('mainPage.categories.tutors')}/>
              <Category label={t('mainPage.categories.repairman')}/>
              <Category label={t('mainPage.categories.beautyMaster')}/>
            </div>
            <div className={styles.categoriesColumn}>
              <Category label={t('mainPage.categories.freelancers')}/>
              <Category label={t('mainPage.categories.accountants')}/>
              <Category label={t('mainPage.categories.lawyers')}/>

            </div>
            <div className={styles.categoriesColumn}>
              <Category label={t('mainPage.categories.atleticCoaches')}/>
              <Category label={t('mainPage.categories.artists')}/>
              <Category label={t('mainPage.categories.homeStaff')}/>
            </div>
            <div className={styles.categoriesColumn}>
              <Category label={t('mainPage.categories.veterinarians')}/>
              <Category label={t('mainPage.categories.drivingInstructors')}/>
              <Category label={t('mainPage.categories.doctors')}/>
            </div>
            <div className={styles.categoriesColumn}>
              <Category label={t('mainPage.categories.various')}/>

            </div>

            </div>
        <div className={styles.description}>
        {t('mainPage.organize')}
        </div>
        {/*<MainSectionButton>{t('mainPage.goLive')}</MainSectionButton>*/}
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
export const getServerSideProps = getAuthServerSide();
export default MainSectionFirst
