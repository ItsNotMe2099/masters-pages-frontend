
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRootState } from "types";
import {getAuthServerSide} from 'utils/auth'

import { useSelector, useDispatch } from 'react-redux'
const PersonalAreaPageIndex = (props) => {
  const router = useRouter()
  const { mode } = router.query
  const role = useSelector((state: IRootState) => state.profile.role)
  console.log("mode", mode);
  useEffect(() => {
      router.replace(`/PersonalArea/profile`)
  }, [])

  return (
    <>


    </>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default PersonalAreaPageIndex
