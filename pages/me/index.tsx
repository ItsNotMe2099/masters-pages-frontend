
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRootState } from "types";
import {getAuthServerSide} from 'utils/auth'

import { useSelector, useDispatch } from 'react-redux'
import {wrapper} from 'store'
import request from 'utils/request'
const PersonalAreaPageIndex = (props) => {
  const router = useRouter()
  const { mode } = router.query

  return (
    <>


    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide({redirect: true})(ctx as any);
  const profile = (res as any).props.profile;
  
  return {
    redirect: {
      permanent: true,
      destination:  `/id${profile.id}`
    }
  }
});
export default PersonalAreaPageIndex
