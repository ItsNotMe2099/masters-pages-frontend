import {default as React, ReactElement} from 'react'
import LayoutAuthorized from 'components/layout/Layout/LayoutAuthorized'
import LayoutGuest from 'components/layout/Layout/LayoutGuest'
import {useAppContext} from 'context/state'

interface Props {
  children?: ReactElement[] | ReactElement,
  title?: ReactElement | string
  showLeftMenu?: boolean
  isCurrentProfileOpened?: boolean
  isGuest?: boolean
}

export default function Layout(props: Props) {
  const appContext = useAppContext()
  const profile = appContext.profile
  console.log('CurrentProfileGuest', props.isGuest);
  return profile && !props.isGuest ? <LayoutAuthorized {...props}/> : <LayoutGuest {...props}/>
}
