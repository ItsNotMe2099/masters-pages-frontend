import styles from 'components/for_pages/MainUserPage/MainSectionFirst/index.module.scss'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { signUpOpen} from 'components/Modal/actions'
import MainSectionButton from 'components/for_pages/MainUserPage/Button'
import { useRouter } from 'next/dist/client/router'

interface Props {

}


const MainSectionFirst = (props: Props) => {

  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const router = useRouter()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.portal}>
          <div className={styles.text}>
            {t('mainPage.personalPortal')}
          </div>
          <MainSectionButton onClick={() => router.push('/registration/user')}>{t('auth.signUp.title')}</MainSectionButton>
        </div>
        <div className={styles.image}>
          <img src='/img/Main/bg/first.svg' alt=''/>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
export default MainSectionFirst
