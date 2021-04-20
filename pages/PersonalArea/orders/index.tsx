
import * as React from "react";

import {getAuthServerSide} from 'utils/auth'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {IRootState} from 'types'
import { useSelector, useDispatch } from 'react-redux'
interface Props {
}
const TabOrders = (props: Props) => {
  const router = useRouter();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  useEffect(() => {
  router.replace( profile.role === 'client' ? '/PersonalArea/orders/published' : '/PersonalArea/orders/negotiation');
  }, []);
  return <></>
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({redirect: true});
