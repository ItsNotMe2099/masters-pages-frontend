import {useRouter} from 'next/router'
import {getAuthServerSide} from 'utils/auth'
import styles from 'pages/registration/user/index.module.scss'
import {IUser} from 'data/intefaces/IUser'
import {ProfileRole} from "data/intefaces/IProfile";
import ProfileRegistration from "components/for_pages/Registration/ProfileRegistration";
import React from "react";
import RegistrationLayout from "components/for_pages/Registration/RegistrationLayout";
interface Props {
  user?: IUser
}

const RegistrationPage = (props: Props) => {
  const router = useRouter()
  const role = router.query.role as ProfileRole
  return ( <RegistrationLayout>
    <div className={styles.root}>
      <ProfileRegistration role={role} />
    </div>
    </RegistrationLayout>
  )
}

export const getServerSideProps = getAuthServerSide({redirect: false})
export default RegistrationPage
