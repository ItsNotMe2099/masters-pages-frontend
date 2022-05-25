import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import { useTranslation } from 'next-i18next'
import {default as React, ReactElement, useEffect, useRef, useState} from 'react'
import {IRootState} from 'types'
import Logo from 'components/Logo'
import cx from 'classnames'
import {useRouter} from 'next/router'
import {logout} from 'components/Auth/actions'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import NotificationSelect from 'components/layout/Layout/components/NotificationSelect'
import LogoSvg from 'components/svg/Logo'
import cookie from 'js-cookie'
import {getProfileRoleByRoute} from 'utils/profileRole'
import Header from '../LayoutAuthorized/mobile/Header'
import LangSelect  from 'components/LangSelect'
import {ProfileRole} from 'data/intefaces/IProfile'
import {IUser} from 'data/intefaces/IUser'
import {useAppContext} from 'context/state'
import {useAuthContext} from 'context/auth_state'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import { signInOpen, signUpOpen } from 'components/Modal/actions'
import Button from 'components/ui/Button'

interface Props {
  children?: ReactElement[] | ReactElement,
  showLeftMenu?: boolean
  user?: IUser
}

export default function LayoutGuest(props: Props) {
  const {children, showLeftMenu} = props
  const {route: currentRoute} = useRouter()
  const appContext = useAppContext()
  const authContext = useAuthContext();
  const roleCurrent = appContext.role
  const role =  getProfileRoleByRoute(currentRoute)  || roleCurrent
  const profile = appContext.profile
  const intervalRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    setCollapsed(!!cookie.get('menu-collapsed'))
  }, [])
 /* useInterval(() => {
    dispatch(fetchProfile(profile.role));
  }, 10000)*/

  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const getModeClass = () => {
    switch (role) {
      case ProfileRole.Master:
        return styles.modeMaster
      case ProfileRole.Volunteer:
        return styles.modeVolunteer
      case ProfileRole.Corporate:
        return styles.modeCorporate
      case ProfileRole.Client:
      default:
        return styles.modeClient
    }
  }

  const item = [
    {title: 'Find companies', icon: 'find-clients-black', link: '/SearchVolunteerPage', isSeparator: true},
  ]

  const itemsVolunteer = [
    {title: t('menu.findVolunteer'), icon: 'find-clients-blue', link: '/SearchVolunteerPageGuest'},
    {title: t('menu.orders'), icon: 'orders-blue', link: '/orders',},
  ]

  const itemsMaster = [
    {title: t('menu.findVolunteer'), icon: 'find-clients-red', link: '/SearchVolunteerPage'},
    {title: t('menu.orders'), icon: 'orders-red', link: '/orders',},
  ]
  const itemsCompanies = [
    {title: t('menu.findVolunteer'), icon: 'find-clients-yellow', link: '/SearchVolunteerPage'},
    {title: t('menu.findCompanies'), icon: 'find-clients-yellow', link: '/orders',},
  ]
  const handleCollapse = () => {
    if(!collapsed) {

      cookie.set('menu-collapsed', '1', {expires: 60 * 60* 24 * 365})
    }else{
      cookie.remove('menu-collapsed')
    }
    setCollapsed(!collapsed)
  }


  return (
    <div className={cx(styles.root, getModeClass(), {[styles.collapsed]: collapsed, [styles.menuHidden]: !showLeftMenu})}>
      {showLeftMenu && <div className={styles.leftMenu}>
        <div className={styles.logo}>
          {collapsed && <LogoSvg className={styles.logoCollapsed}/>}
          {!collapsed && <Logo/>}
          <div className={styles.collapseMenu} onClick={handleCollapse}/>
        </div>
        {item.map(item => <>{item.isSeparator && <div className={styles.menuSeparator}/>}<MenuItem
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link} mode={role}/></>)}
        <div className={styles.volunteers}>
          <div className={styles.title}>
            For voulunteers
          </div>
          {itemsVolunteer.map(item => 
          <MenuItem
          className={styles.volunteersItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link} mode={role}/>)}
        </div>
        <div className={styles.masters}>
          <div className={styles.title}>
            For masters
          </div>
          {itemsMaster.map(item => 
          <MenuItem
          className={styles.mastersItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link} mode={role}/>)}
        </div>
        <div className={styles.companies}>
          <div className={styles.title}>
            For companies
          </div>
          {itemsCompanies.map(item => 
          <MenuItem
          className={styles.companiesItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link} mode={role}/>)}
        </div>
        <div className={styles.btnContainer}>
          <Button size="normal" className={styles.red} onClick={() => dispatch(signUpOpen())}>{t('newMainVolunteer.freeSignUp')}</Button>
          <Button size="normal" className={styles.signIn} onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</Button>
        </div>
      </div>}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div
            className={styles.hello}>Hello guest. Please register for FREE to get full functionality
          </div>
        </div>
        <LangSelect isAuth={false}/>
      </div>
      <div className={cx(styles.container)}>
        {children}
      </div>
    </div>
  )
}
LayoutGuest.defaultProps = {
  showLeftMenu: true
}
