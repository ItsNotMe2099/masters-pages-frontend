import styles from './index.module.scss'

import {IProfileTab, IRootState, ProfileWorkExperience, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import CardAdd from 'components/PublicProfile/components/CardAdd'
import {default as React, useEffect, useState} from 'react'
import { useTranslation } from 'next-i18next'
import {
  createProfileGallery,
  deleteProfileGallery,
  fetchProfileGalleryList,
  resetProfileGalleryList,
  setProfileGalleryCurrentItemIndex,
  setProfileGalleryTab,
  updateProfileGallery
} from 'components/ProfileGallery/actions'
import {hideProfileForm, resetPublicProfileForms, showProfileForm} from 'components/Profile/actions'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import ProfileTabs from 'components/PublicProfile/components/ProfileTabs'
import { useSelector, useDispatch } from 'react-redux'
import GalleryForm from 'components/PublicProfile/components/view/CardGallery/components/GalleryForm'
import { setPageTaskUser} from 'components/TaskUser/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryModal from 'components/PublicProfile/components/view/GalleryModal'
import {confirmOpen} from 'components/Modal/actions'
import GalleryItem from 'components/GalleryItem'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile,
  isEdit: boolean,
  skill: SkillData
}
const CardGallery = (props: Props) => {
  const { profile, skill, isEdit } = props
  const dispatch = useDispatch()

  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'gallery')
  const list = useSelector((state: IRootState) => state.profileGallery.list)
  const listLoading = useSelector((state: IRootState) => state.profileGallery.listLoading)
  const total = useSelector((state: IRootState) => state.profileGallery.total)
  const page = useSelector((state: IRootState) => state.profileGallery.page)
  const [currentEditModel, setCurrentEditModel] = useState(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const currentTab = useSelector((state: IRootState) => state.profileGallery.currentProfileTab)

  const limit = 20
  const { t } = useTranslation('common')
  const [sortType, setSortType] = useState('newFirst')
  const [currentSkillId, setCurrentSkillId] = useState(null)
  useEffect(() => {
    if(currentSkillId === skill?.id){
      return
    }
    dispatch(resetProfileGalleryList())
    dispatch(fetchProfileGalleryList({
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: 1,
      limit
    }))
    dispatch(setProfileGalleryTab(null))
    setCurrentSkillId(skill.id)

  }, [skill])
  const handleSortChange = (sort) => {

  }
  const handleChangeTab = (tab: IProfileTab) => {
    dispatch(resetPublicProfileForms())
    dispatch(resetProfileGalleryList())
    dispatch(fetchProfileGalleryList({
      ...(tab ? {profileTabId: tab.id} : {}),
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: 1,
      limit
    }))
    dispatch(setProfileGalleryTab(tab))
  }

  const handleCreateClick = () => {
    setCurrentEditModel(null)
    dispatch(showProfileForm( 'gallery'))

  }
  const handleSubmit = (data) => {
    if(!currentEditModel) {
      dispatch(createProfileGallery({
        categoryId: skill.categoryId,
        subCategoryId: skill.subCategoryId, ...data,
        state: 'published'
      }, 'gallery'))
    }else{
      dispatch(updateProfileGallery(currentEditModel.id, {...data
      }, 'gallery'))
    }
  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'gallery'))
  }
  const handleEdit = (model: ProfileWorkExperience) => {
    setCurrentEditModel(model)
    dispatch(showProfileForm( 'gallery'))
  }
  const handleDelete = (model: ProfileWorkExperience) => {
    dispatch(confirmOpen({
      description: t('post.areYouSureToDelete', { model }),
      onConfirm: () => {
        dispatch(deleteProfileGallery(model.id))
      }
    }))
  }

  const handleScrollNext = () => {
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchProfileGalleryList({
      ...(currentTab ? {profileTabId: currentTab.id} : {}),
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId,
      page: page + 1,
      limit
    }))
  }
  const showGallery = (model, index) => {
    dispatch(setProfileGalleryCurrentItemIndex(index))
    setIsGalleryOpen(true)
  }

  return (
    <Card isHidden={!isEdit && !listLoading && total === 0 && !currentTab}  className={styles.root} title={t('cardGallery.gallery')} toolbar={ isEdit ? [<FormActionButton type={'create'} title={t('add')} onClick={handleCreateClick}/>]: []}>
      {!showForm && <><div className={styles.panel}>
        <div className={styles.tabs}>
          <ProfileTabs onDeleteTab={() => handleChangeTab(null)} type={'gallery'} currentTab={currentTab} skill={skill} isEdit={isEdit} onChangeTab={handleChangeTab}/>
        </div>
        {/*<DropDown onChange={handleSortChange} value={sortType} options={[
          {value: 'newFirst',  label: t('sort.newFirst')},
          {value: 'highPrice', label: t('sort.highestPrice')},
          {value: 'lowPrice', label: t('sort.lowestPrice')}]}
                  item={(item) => <div>{item?.label}</div>}
        />*/}
      </div>
      <div className={styles.separator}/>

        {(listLoading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          hasMore={total > list.length}
          loader={listLoading ? <Loader/> : null}>
          {list.map((item, index) => <GalleryItem isEdit={isEdit} model={item} onClick={(model) => showGallery(model, index)}onEdit={handleEdit} onDelete={handleDelete}/>)}
        </InfiniteScroll>}
      </>}
      {(!showForm && isEdit && list.length === 0 && !listLoading) && <CardAdd title={t('cardGallery.addPhoto')} icon={'add_photo'}  onClick={handleCreateClick} /> }

      {showForm && <GalleryForm onSubmit={handleSubmit} onCancel={handleCancel} initialValues={currentEditModel ? currentEditModel : {...(currentTab ? {profileTabId: currentTab.id} : {})}}/>}
      {isGalleryOpen && <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)}/>}
    </Card>
  )
}

export default CardGallery
