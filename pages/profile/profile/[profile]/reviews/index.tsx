import { SkillData} from 'types'
import PublicProfile from 'components/PublicProfile'
import {getProfilePageProps} from 'utils/profile'
import {IProfile} from 'data/intefaces/IProfile'
interface Props {
  profile: IProfile,
  skill: SkillData
  showType?: string
}

const ProfilePage = (props) => {
 return <PublicProfile {...props}/>
}
export const getServerSideProps = getProfilePageProps('profile')
export default ProfilePage
