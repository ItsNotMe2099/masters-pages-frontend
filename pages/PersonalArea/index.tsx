
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withAuthSync, withRestrictAuthSync } from 'utils/auth'

const PersonalAreaPageIndex = (props) => {
  const router = useRouter()
  const { mode } = router.query
  console.log("mode", mode);
  useEffect(() => {
      router.replace('/PersonalArea/client/info')
  }, [])

  return (
    <>


    </>
  )
}

export default withRestrictAuthSync(PersonalAreaPageIndex)
