import styles from './index.module.scss'
import Tab from 'components/PublicProfile/components/Tab'
import ProfileTabComponent from 'components/PublicProfile/components/ProfileTab'
import {IProfileTab, IRootState, SkillData} from 'types'
import {createProfileTab, deleteProfileTab, updateProfileTab} from 'components/ProfileTab/actions'
import { useSelector, useDispatch } from 'react-redux'
import {confirmOpen} from 'components/Modal/actions'
import {deleteProfilePortfolio} from 'components/ProfilePortfolio/actions'
import {hideProfileForm} from 'components/Profile/actions'
interface  ITab{
  id: number,
  name: string,
}
interface Props{
  skill: SkillData,
  isEdit: boolean,
  type: 'gallery' | 'portfolio',
  onChangeTab: (tab) => void,
  onDeleteTab: (tab) => void
  currentTab: IProfileTab
}
const ProfileTabs = (props: Props) => {
  const {currentTab} = props;
  const dispatch = useDispatch();
  const tabs = useSelector((state: IRootState) => state.profileTab.list).filter(item => item.type === props.type);

  const handleNewSubmit = (title) => {
    if(!title && !title.trim()){
      dispatch(hideProfileForm(`profileTab_${props.type}New`));
    }else{
      dispatch(createProfileTab({type: props.type, categoryId: props.skill.categoryId, subCategoryId: props.skill.subCategoryId, title}, `profileTab_${props.type}New`));

    }


  }
  const handleEditSubmit = (tab, title) => {
    if(title){
      dispatch(updateProfileTab(tab.id, {title}, `profileTab_${props.type}${tab.id}`));

    }else{
      handleDelete(tab);
    }

  }
  const handleDelete = (tab) => {
    dispatch(confirmOpen({
      description: `Are you sure that you want to delete tab «${tab.title} and everything inside»?`,
      onConfirm: () => {
        dispatch(deleteProfileTab(tab.id, `profileTab_${props.type}${tab.id}`, () => props.onDeleteTab(tab)));
      }
    }));
  }
  const handleShowAdd = (tab, data) => {

  }
  const handleTabClick = (tab) => {
    props.onChangeTab(tab);
  }
  return (
    <div className={`${styles.root}`}>
      <ProfileTabComponent isActive={!currentTab} type={props.type} isAll={true} onClick={() => handleTabClick(null)}/>
      {tabs.map(tab => <ProfileTabComponent isActive={tab.id === currentTab?.id} onDelete={() => handleDelete(tab)} isEdit={props.isEdit} type={props.type} profileTab={tab}  onSubmit={(title) => handleEditSubmit(tab, title)} onClick={() => handleTabClick(tab)} />)}
      {props.isEdit && <ProfileTabComponent isEdit={props.isEdit} type={props.type}  isNew={true} onSubmit={handleNewSubmit}/>}
    </div>
  )
}

export default ProfileTabs
