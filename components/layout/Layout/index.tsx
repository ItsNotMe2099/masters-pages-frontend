import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import MenuItem from 'components/layout/Layout/components/MenuItem'
import {useTranslation} from 'i18n'
import {default as React, ReactElement} from 'react'
import {IRootState} from 'types'
import Logo from 'components/Logo'
import {LangSelect} from 'components/layout/Header/components/LangSelect'

import {useRouter} from 'next/router'
import {logout} from 'components/Auth/actions'
import ModeSelect from 'components/layout/Layout/components/ModeSelect'
import LayoutAuthorized from 'components/layout/Layout/LayoutAuthorized'
import LayoutPublic from 'components/layout/Layout/LayoutPublic'

interface Props {
  children?: ReactElement[] | ReactElement,
  title?: ReactElement | string
  showLeftMenu?: boolean
}

export default function Layout(props: Props) {
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  return profile ? <LayoutAuthorized {...props}/> : <LayoutPublic {...props}/>
}
