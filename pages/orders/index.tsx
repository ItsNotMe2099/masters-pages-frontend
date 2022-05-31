
import * as React from 'react'

import {getAuthServerSide} from 'utils/auth'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {IRootState} from 'types'
import { useSelector } from 'react-redux'
import {useAppContext} from 'context/state'
interface Props {
}
const TabOrders = (props: Props) => {
  const router = useRouter()
  const appContext = useAppContext();
  const profile = appContext.profile
  useEffect(() => {
  router.replace( profile.role === 'client' ? '/orders/published' : '/orders/negotiation')
  }, [])
  return <></>
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({redirect: true})
