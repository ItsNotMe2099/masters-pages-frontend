import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import React from 'react'
import {useTranslation} from "i18n";
import { useSelector, useDispatch } from 'react-redux'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import MainSectionButton from '../Button'

interface Props {

}


const MainSectionFirst = (props: Props) => {

  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const Category = ({label}: {label: string}) => {
    return (<div className={styles.category}>
      <div><img src={'/img/Main/icons/mark.svg'}/></div> {label}
    </div>)
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portal}>
          <div className={styles.text}>
            {t('newMainVolunteer.portal')}
          </div>
          <div className={styles.categories}>
            <Category label={t('newMainVolunteer.individualAssignments')}/>
            <Category label={t('newMainVolunteer.projects')}/>
          </div>
          <div className={styles.btns}>
            <MainSectionButton size="normal" color="outlineYellow" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.guestAccess')}</MainSectionButton>
            <MainSectionButton size="normal" color="yellow" onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</MainSectionButton>
          </div>
        </div>
        <div className={styles.image}>
          <img src='/img/MainVolunteer/bg/first.svg' alt=''/>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionFirst
