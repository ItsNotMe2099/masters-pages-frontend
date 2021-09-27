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

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portal}>
          <div className={styles.text}>
            Your personal business portal
          </div>
          <MainSectionButton onClick={() => dispatch(signUpOpen())}>{t('auth.signUp.title')}</MainSectionButton>
        </div>
        <div className={styles.image}>
          <img src='/img/Main/bg/first.svg' alt=''/>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide();
export default MainSectionFirst
