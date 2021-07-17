import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import {useTranslation} from 'react-i18next'
import {default as React, ReactElement} from 'react'
import {IRootState} from 'types'
import Logo from 'components/Logo'
import {LangSelect} from 'components/layout/Header/components/LangSelect'

import {useRouter} from 'next/router'
import {logout} from 'components/Auth/actions'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import MainSectionButton from 'pages/NewMain/components/Button'
import {signInOpen, signUpOpen} from 'components/Modal/actions'
import Button from 'components/PublicProfile/components/Button'

interface Props {
  children?: ReactElement[] | ReactElement
  title?: ReactElement | string
}

export default function LayoutPublic(props: Props) {
  const {children, title} = props;
  const {route: currentRoute} = useRouter();
  const role = useSelector((state: IRootState) => state.profile.role)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const {t} = useTranslation();
  const dispatch = useDispatch()

  return (
    <div className={`${styles.root}`}>
      <div  className={styles.header}>
          <div className={styles.logo}>
            <img src={'/img/Main/logo_red.svg'}/>
            <div className={styles.logoTitle}>Masters<span> Pages</span></div>
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.actions}>
            <LangSelect isAuth={false}/>
            <div className={styles.actionsButtons}>
              <Button className={styles.actionButton} size={'small'}  onClick={() => dispatch(signInOpen())}>Sign in</Button>
             <Button className={styles.actionButton} size={'small'} color={'red'} onClick={() => dispatch(signUpOpen())}>Sign up</Button>
            </div>
          </div>

      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
