
import { useRouter } from 'next/router'
import {getAuthServerSide} from 'utils/auth'

const PersonalAreaPageIndex = (props) => {
  const router = useRouter()
  const { mode } = router.query

  return (
    <>


    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide({redirect: true})(ctx as any)

  const profile = (res as any).props.currentProfile
  return {
    redirect: {
      permanent: false,
      destination: `/id${profile.id}`
    }
  }
}
export default PersonalAreaPageIndex
