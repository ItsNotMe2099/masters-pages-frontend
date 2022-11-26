import {getAuthServerSide} from 'utils/auth'
import {IUser} from 'data/intefaces/IUser'
import UserRegPage from "components/for_pages/UserRegistration";
interface Props {
  user?: IUser
}

const RegistrationPage = (props: Props) => {
  return <UserRegPage/>
}

export const getServerSideProps = getAuthServerSide({redirect: false})
export default RegistrationPage
