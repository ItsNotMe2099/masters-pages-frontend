
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRootState } from "types";
import {getAuthServerSide} from 'utils/auth'

import { useSelector, useDispatch } from 'react-redux'
import request from 'utils/request'
const PersonalAreaPageIndex = (props) => {
  const router = useRouter()
  const { mode } = router.query

  return (
    <>


    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide({redirect: true})(ctx as any);

  const profile = (res as any).props.currentProfile;
  return {
    redirect: {
      permanent: false,
      destination:  `/id${profile.id}`
    }
  }
};
export default PersonalAreaPageIndex
