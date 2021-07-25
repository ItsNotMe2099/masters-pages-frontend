import {ProfileData, SkillData} from 'types'
import PublicProfile from 'components/PublicProfile'
import {getProfilePageProps} from 'utils/profile'
interface Props {
  profile: ProfileData,
  skill: SkillData
  showType?: string
}

const ProfilePage = (props) => {
 return <PublicProfile {...props}/>
}
export const getServerSideProps = getProfilePageProps('skill')
export default ProfilePage
