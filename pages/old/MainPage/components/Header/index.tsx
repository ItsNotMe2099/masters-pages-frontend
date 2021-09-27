import styles from './index.module.scss'
import MainSectionButton from 'pages/old//MainPage/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import {useTranslation} from 'i18n'


interface Props{

}

const MainSectionHeader = (props: Props) => {
 const isProd =  false;
  const dispatch = useDispatch()
  const trans = useTranslation('common');
  const {t} = trans;
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
          {/*<div className={styles.firstBtn}>
          <Button href='/SearchMasterPage' target='_self' red className={styles.findMaster}>{t('findMaster')}</Button>
        </div>
          <Button href='/SearchVolunteerPage' target='_self' blue className={styles.findMaster}>{t('findVolunteer')}</Button>*/}
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
