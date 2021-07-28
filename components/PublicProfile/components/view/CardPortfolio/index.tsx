import styles from './index.module.scss'
import {IProfileTab, IRootState, ProfileData, ProfileWorkExperience, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import PortfolioListItem from 'components/PublicProfile/components/view/CardPortfolio/components/PortfolioListItem'
import Tabs from 'components/PublicProfile/components/Tabs'
import {DropDown} from 'components/ui/DropDown'
import {default as React, useEffect, useState} from 'react'
import {useTranslation} from 'i18n'
import {
  createProfileWorkExperience, deleteProfileWorkExperience,
  fetchProfileWorkExperienceList,
  updateProfileWorkExperience
} from 'components/ProfileWorkExpirience/actions'
import {useSelector, useDispatch} from 'react-redux'
import {fetchProfileTab, fetchProfileTabList} from 'components/ProfileTab/actions'
import ProfileTabs from 'components/PublicProfile/components/ProfileTabs'
import {
  createProfilePortfolio,
  deleteProfilePortfolio,
  fetchProfilePortfolioList,
  resetProfilePortfolioList,
  setPageProfilePortfolio,
  setProfilePortfolioTab,
  updateProfilePortfolio
} from 'components/ProfilePortfolio/actions'
import {hideProfileForm, showProfileForm} from 'components/Profile/actions'
import CardWorkExperienceListItem
  from 'components/PublicProfile/components/view/CardWorkExperience/components/CardWorkExperienceListItem'
import WorkExperienceForm
  from 'components/PublicProfile/components/view/CardWorkExperience/components/WorkExperienceForm'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import PortfolioForm from 'components/PublicProfile/components/view/CardPortfolio/components/PortfolioForm'
import CardAdd from 'components/PublicProfile/components/CardAdd'
import {setPageTaskUser} from 'components/TaskUser/actions'
import {fetchProfileGalleryList} from 'components/ProfileGallery/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryItem from 'components/PublicProfile/components/view/CardGallery/components/GalleryItem'
import {confirmOpen} from 'components/Modal/actions'

interface Props {
  profile: ProfileData,
  isEdit: boolean,
  skill: SkillData
}

const CardPortfolio = (props: Props) => {
  const {profile, skill, isEdit} = props;
  const dispatch = useDispatch();

  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'portfolio');
  const list = useSelector((state: IRootState) => state.profilePortfolio.list);
  const page = useSelector((state: IRootState) => state.profilePortfolio.page);
  const total = useSelector((state: IRootState) => state.profilePortfolio.total);
  const listLoading = useSelector((state: IRootState) => state.profilePortfolio.listLoading);
  const formLoading = useSelector((state: IRootState) => state.profilePortfolio.formLoading);
  const currentTab = useSelector((state: IRootState) => state.profilePortfolio.currentProfileTab);
  const [currentEditModel, setCurrentEditModel] = useState(null);

  const {t} = useTranslation('common');
  const [sortType, setSortType] = useState('newFirst');
  const limit = 10;
  useEffect(() => {
    dispatch(resetProfilePortfolioList());
    dispatch(fetchProfilePortfolioList({
      ...(currentTab ? {profileTabId: currentTab.id} : {}),
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: 1,
      sort: 'createdAt',
      sortOrder: sortType == 'newFirst' ? 'DESC' : 'ASC',
      limit
    }));
    dispatch(setProfilePortfolioTab(null));
  }, [skill]);
  const handleSortChange = (sort) => {
    setSortType(sort.value);
    dispatch(resetProfilePortfolioList());
    dispatch(fetchProfilePortfolioList({
      ...(currentTab ? {profileTabId: currentTab.id} : {}),
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: 1,
      sort: 'createdAt',
      sortOrder: sort.value === 'newFirst' ? 'DESC' : 'ASC',
      limit
    }));
  }
  const handleChangeTab = (tab: IProfileTab) => {
    dispatch(resetProfilePortfolioList());
    dispatch(setProfilePortfolioTab(tab));
    dispatch(fetchProfilePortfolioList({
      ...(tab ? {profileTabId: tab.id} : {}),
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: 1,
      sort: 'createdAt',
      sortOrder: sortType == 'newFirst' ? 'DESC' : 'ASC',
      limit
    }));
  }

  const handleCreateClick = () => {
    setCurrentEditModel(null);
    dispatch(showProfileForm('portfolio'));

  }
  const handleSubmit = (data) => {
    if (!currentEditModel) {
      dispatch(createProfilePortfolio({
        categoryId: skill.categoryId,
        subCategoryId: skill.subCategoryId, ...data
      }, 'portfolio'));
    } else {
      dispatch(updateProfilePortfolio(currentEditModel.id, {
        ...data
      }, 'portfolio'));
    }
  }
  const handleCancel = () => {
    dispatch(hideProfileForm('portfolio'));
  }
  const handleEdit = (model: ProfileWorkExperience) => {
    setCurrentEditModel(model);
    dispatch(showProfileForm('portfolio'));
  }
  const handleDelete = (model: ProfileWorkExperience) => {
    dispatch(confirmOpen({
      description: t("post.areYouSureToDelete", { model }),
      onConfirm: () => {
        dispatch(deleteProfilePortfolio(model.id));
      }
    }));
  }
  const handleScrollNext = () => {
    dispatch(setPageProfilePortfolio(page + 1))
    dispatch(fetchProfilePortfolioList({
      ...(currentTab ? {profileTabId: currentTab.id} : {}),
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: 1,
      limit
    }));
  }

  return (
    <Card  isHidden={!isEdit && !listLoading && total === 0 && !currentTab}  isLoading={formLoading} className={styles.root} title={t('portfolioLabel')}
          toolbar={isEdit ? [<FormActionButton type={'create'} title={t('add')} onClick={handleCreateClick}/>] : []}>
      {!showForm && <>
        <div className={styles.panel}>
          <div className={styles.tabs}>
            <ProfileTabs type={'portfolio'} currentTab={currentTab} skill={skill} isEdit={isEdit}
                         onChangeTab={handleChangeTab}/>
          </div>
          <DropDown onChange={handleSortChange} value={sortType} options={[
            {value: 'newFirst', label: t('sort.newFirst')},
            {value: 'oldFirst', label: t('sort.oldFirst')}]}
                    item={(item) => <div>{item?.label}</div>}
          />
        </div>
        <div className={styles.separator}/>
        <div className={styles.list}>

          {(listLoading && total === 0) && <Loader/>}
          {total > 0 && <InfiniteScroll
            dataLength={list.length} //This is important field to render the next data
            next={handleScrollNext}
            className={styles.list}
            hasMore={total > list.length}
            loader={listLoading ? <Loader/> : null}>
            {list.map((item, index) => <PortfolioListItem isEdit={isEdit} model={item} onEdit={handleEdit}
                                                          onDelete={handleDelete}/>)}
          </InfiniteScroll>}
        </div>
      </>
      }
      {(!showForm && isEdit && list.length === 0 && !listLoading) &&
      <CardAdd title={t('cardPortfolio.addWork')} icon={'add_work'} onClick={handleCreateClick}/>}
      {showForm && <PortfolioForm onSubmit={handleSubmit} onCancel={handleCancel}
                                  initialValues={currentEditModel ? currentEditModel : (currentTab ? {profileTabId: currentTab.id} : {})}/>}


    </Card>
  )
}

export default CardPortfolio
