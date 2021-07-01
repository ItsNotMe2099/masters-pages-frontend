import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'
import Tabs from 'components/ui/Tabs'
import SharePersonalLink from 'components/Share/PersonalLink'
import ShareByEmail from 'components/Share/ShareByEmail'
import ShareBySocialMedia from 'components/Share/ShareBySocialMedia'

const SharePersonalLabel = dynamic(() => import('components/Share/PersonalLabel'), {
  ssr: false
})
import {IRootState} from 'types'
import {formatSkillList} from 'utils/skills'
import {setCurrentSkill} from 'components/Profile/actions'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {fetchSkillList} from 'components/Skill/actions'
import Tab from 'components/PublicProfile/components/Tab'
import {getCategoryTranslation} from 'utils/translations'

const SharePage = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch()
  const [activeSkill, setActiveSkill] = useState(null);
  const [customLink, setCustomLink] = useState();
  const skills =  useSelector((state: IRootState) => state.skill.list) ;


  useEffect(() => {
    dispatch(fetchSkillList());
  }, [])
  const tabs = [

    { name: 'Share by email', key: 'shareByEmail' },
    { name: 'Profile link', key: 'personalLink' },
    { name: 'Share by Social media', key: 'shareBySocialMedia' },
    { name: 'Personal label', key: 'personalLabel' },
  ]
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const getTabContent = (activeTab) => {
    switch (activeTab){
      case 'personalLink':
        return <SharePersonalLink  customLink={customLink !== 'all' ? customLink : ''} subCategoryId={activeSkill?.id}/>
      case 'shareByEmail':
        return <ShareByEmail  customLink={customLink !== 'all' ? customLink : ''} subCategoryId={activeSkill?.id}/>
      case 'shareBySocialMedia':
        return <ShareBySocialMedia  customLink={customLink !== 'all' ? customLink : ''} subCategoryId={activeSkill?.id}/>
      case 'personalLabel':
        return <SharePersonalLabel  customLink={customLink !== 'all' ? customLink : ''} subCategoryId={activeSkill?.id} phone={props.user.phone}/>
    }
  }

  console.log("skills", skills);
  const handleSkillClick = (skill) => {
    setActiveSkill(skill);
    setCustomLink(null);
  }
  const handleCustomLinkClick = (type) => {
    setActiveSkill(null);
    setCustomLink(type);
  }
  return (
    <Layout>

      <div className={styles.container}>
        <div className={styles.skills}>
          <Tab isActive={!customLink && !activeSkill} title={`All`} onClick={() => handleCustomLinkClick(null)}/>
          <Tab isActive={customLink === 'news'} title={`News`} onClick={() => handleCustomLinkClick('news')}/>
        {skills.map((category) => category.skills.map(skill => skill.subCategory ? <Tab isActive={activeSkill?.id === skill.id} title={`${getCategoryTranslation(skill.category).name}/${getCategoryTranslation(skill.subCategory).name}`} onClick={() => handleSkillClick(skill)}/> : null))}
        </div>
        <Tabs style={'fullWidthRound'} tabs={tabs} activeTab={activeTab} onChange={(tab) => setActiveTab(tab.key)}/>
        <div className={styles.content}>{getTabContent(activeTab)}</div>
      </div>

    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default SharePage
