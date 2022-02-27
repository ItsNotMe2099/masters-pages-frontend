import {useSelector} from 'react-redux'
import {default as React, ReactElement} from 'react'
import {IRootState} from 'types'

import LayoutAuthorized from 'components/layout/Layout/LayoutAuthorized'
import LayoutPublic from 'components/layout/Layout/LayoutPublic'

interface Props {
  children?: ReactElement[] | ReactElement,
  title?: ReactElement | string
  showLeftMenu?: boolean
  isCurrentProfileOpened?: boolean
}

export default function Layout(props: Props) {
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  return profile ? <LayoutAuthorized {...props}/> : <LayoutPublic {...props}/>
}
