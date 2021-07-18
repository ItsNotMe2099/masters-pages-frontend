import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Link from 'next/link'
import LangSelect from 'pages/NewMain/components/Header/components/LangSelect'
import MainSectionButton from 'pages/NewMain/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import {useTranslation} from "react-i18next";
interface Props{

}

const MainSectionHeader = (props: Props) => {
 const isProd =  false;
  const dispatch = useDispatch()
  const {t} = useTranslation('common');
  return (
    <div  className={styles.root}>
      <div  className={styles.container}>
        <div className={styles.logo}>
          <img src={'/img/Main/logo_red.svg'}/>
          <div className={styles.logoTitle}>Masters<span> Pages</span></div>
        </div>
        <div className={styles.menu}>
          {/* <div className={styles.menuItem}>
            <Link href={'menu'}>Home</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href={'menu'}>Benefits</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href={'menu'}>Contact us</Link>
          </div>*/}
        </div>
        <div className={styles.actions}>
          <div className={styles.actionsButtons}>
            {!isProd && <MainSectionButton size={'small'} outline={true} onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>}
            {!isProd && <MainSectionButton size={'small'} onClick={() => dispatch(signUpOpen())}>{t('auth.signUp.title')}</MainSectionButton>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainSectionHeader
