import * as React from 'react'
import {getAuthServerSide} from 'utils/auth'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useAppContext} from 'context/state'

interface Props {
}

const TabProjects = (props: Props) => {
  const router = useRouter()
  const appContext = useAppContext();
  const profile = appContext.profile
  useEffect(() => {
  router.replace( profile.role === 'client' ? '/projects/published' : '/projects/applied')
  }, [])
  return <></>
}
export default TabProjects
export const getServerSideProps = getAuthServerSide({redirect: true})
