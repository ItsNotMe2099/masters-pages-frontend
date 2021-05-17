import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'
import Tabs from 'components/ui/Tabs'
import SharePersonalLink from 'components/Share/PersonalLink'
import ShareByEmail from 'components/Share/ShareByEmail'
import ShareBySocialMedia from 'components/Share/ShareBySocialMedia'
import SharePersonalLabel from 'components/Share/PersonalLabel'
import {IRootState} from 'types'
import {formatSkillList} from 'utils/skills'
import {setCurrentSkill} from 'components/Profile/actions'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {fetchSkillList} from 'components/Skill/actions'
import Tab from 'components/PublicProfile/components/Tab'
import {getCategoryTranslation} from 'utils/translations'
import ShareByEmailForm from 'components/Share/ShareByEmail/Form'
import InviteForm from 'pages/Invite/Form'
import {inviteRequest} from 'components/Invite/actions'

const InvitePage = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch()
  const [activeSkill, setActiveSkill] = useState(null);
  const skills =  useSelector((state: IRootState) => state.skill.list) ;

  useEffect(() => {
    setActiveSkill(skills.find(skill => skill.subCategoryId))
  }, [skills])

  useEffect(() => {
    dispatch(fetchSkillList());
  }, [])

  const handleSubmit = (data) => {
    dispatch(inviteRequest(data));
  }

  return (
    <Layout>

      <div className={styles.container}>
        <div className={styles.skills}>
        {skills.map(skill => skill.subCategory ? <Tab isActive={activeSkill?.id === skill.id} title={getCategoryTranslation(skill.subCategory).name} onClick={() => setActiveSkill(skill)}/> : null)}
        </div>
        <div className={styles.content}>
          <InviteForm onSubmit={handleSubmit} subCategoryId={activeSkill?.id}/>
        </div>
      </div>

    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default InvitePage
