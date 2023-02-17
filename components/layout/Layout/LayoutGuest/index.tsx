import styles from './index.module.scss'
import {useDispatch} from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import { useTranslation } from 'next-i18next'
import {default as React, ReactElement, useEffect, useState} from 'react'
import Logo from 'components/Logo'
import cx from 'classnames'
import {useRouter} from 'next/router'
import LogoSvg from 'components/svg/Logo'
import cookie from 'js-cookie'
import LangSelect  from 'components/LangSelect'
import {IUser} from 'data/intefaces/IUser'
import { signInOpen, signUpOpen } from 'components/Modal/actions'
import MainSectionButton from 'components/for_pages/Corporate/Button'
import Header from './mobile/Header'
import classNames from 'classnames'
import Routes from "pages/routes";

interface Props {
  children?: ReactElement[] | ReactElement,
  showLeftMenu?: boolean
  user?: IUser
  isCurrentProfileOpened?: boolean
}

export default function LayoutGuest(props: Props) {
  const {children, showLeftMenu, isCurrentProfileOpened} = props
  const {route: currentRoute} = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    setCollapsed(!!cookie.get('menu-collapsed'))
  }, [])

  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const item = [
    {title: t('menu.findCompanies'), icon: 'find-clients-black', link: '/FindCompanies', isSeparator: true},
  ]

  const itemsVolunteer = [
    {title: t('menu.findProjects'), icon: 'find-clients-blue', link: '/FindProjectsGuest'},
    {title: t('menu.findOrders'), icon: 'orders-blue', link: '/FindOrdersGuest',},
  ]

  const itemsMaster = [
    {title: t('menu.findProjects'), icon: 'find-clients-red', link: '/FindProjectsGuest'},
    {title: t('menu.findOrders'), icon: 'orders-red', link: '/FindOrdersGuest',},
  ]
  const itemsCompanies = [
    {title: t('menu.findVolunteer'), icon: 'find-clients-yellow', link: '/FindVolunteerGuest'},
    {title: t('menu.findMaster'), icon: 'find-clients-yellow', link: '/FindMasterGuest',},
  ]
  const handleCollapse = () => {
    if(!collapsed) {

      cookie.set('menu-collapsed', '1', {expires: 60 * 60* 24 * 365})
    }else{
      cookie.remove('menu-collapsed')
    }
    setCollapsed(!collapsed)
  }

  const [isScrollable, setIsScrollable] = useState(true)

  const logo = (<div className={styles.logo}>
    {collapsed && <LogoSvg className={styles.logoCollapsed}/>}
    {!collapsed && <Logo/>}
    <div className={styles.collapseMenu} onClick={handleCollapse}/>
  </div>)

  const router = useRouter()


  return (
    <div className={cx(styles.root, {[styles.collapsed]: collapsed, [styles.menuHidden]: !showLeftMenu, [styles.noScroll]: !isScrollable})} id='scrollableDiv'>
      {showLeftMenu && <div className={styles.leftMenu}>
        {logo}
        {item.map(item => <>{item.isSeparator && <div className={styles.menuSeparator}/>}<MenuItem
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/></>)}
        <div className={styles.volunteers}>
          <div className={styles.title}>
            {t('guestPage.forVolunteers')}
          </div>
          {itemsVolunteer.map(item =>
          <MenuItem
          className={styles.volunteersItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/>)}
        </div>
        <div className={styles.masters}>
          <div className={styles.title}>
          {t('guestPage.forMasters')}
          </div>
          {itemsMaster.map(item =>
          <MenuItem
          className={styles.mastersItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/>)}
        </div>
        <div className={styles.companies}>
          <div className={styles.title}>
          {t('guestPage.forCompanies')}
          </div>
          {itemsCompanies.map(item =>
          <MenuItem
          className={styles.companiesItem}
          isActive={(item.link && currentRoute.indexOf(`${item.link}`) >= 0)} title={item.title} icon={item.icon}
          link={item.link}/>)}
        </div>
      </div>}
      <div className={classNames(styles.header, {[styles.proj]: !showLeftMenu})}>
        <div className={styles.headerLeft}>
          {!showLeftMenu && logo}
          <div
            className={classNames(styles.hello, {[styles.none]: !showLeftMenu})}>Hello guest! Please register for <span onClick={() => router.push('/registration/user')}>FREE</span> to get full functionality.
          </div>
        </div>
        <div className={styles.btns}>
            <MainSectionButton size={'small'} color='yellow' href={Routes.organizationMain}>{t('newMainVolunteer.forCompanies')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineGreen' href='/'>{t('newMainVolunteer.forIndividuals')}</MainSectionButton>
            <MainSectionButton size={'small'} color='outlineRed' onClick={() => dispatch(signInOpen())}>{t('auth.signIn.title')}</MainSectionButton>
            <LangSelect isAuth={false}/>
            <MainSectionButton size={'small'} href='/registration/user'>{t('auth.signUp.title')}</MainSectionButton>
          </div>
      </div>
      <Header
      isCurrentProfileOpened={isCurrentProfileOpened}
      state={isScrollable}
      onClick={() => setIsScrollable(isScrollable ? false : true)}
      />
      <div className={cx(styles.container)}>
        {children}
      </div>
    </div>
  )
}
LayoutGuest.defaultProps = {
  showLeftMenu: true
}
