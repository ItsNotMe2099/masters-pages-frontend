
import * as React from 'react'

import {getAuthServerSide} from 'utils/auth'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {IRootState} from 'types'
import { useSelector } from 'react-redux'
interface Props {
}
const TabProjects = (props: Props) => {
  const router = useRouter()
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  useEffect(() => {
  router.replace( profile.role === 'client' ? '/projects/published' : '/projects/applied')
  }, [])
  return <></>
}
export default TabProjects
export const getServerSideProps = getAuthServerSide({redirect: true})
