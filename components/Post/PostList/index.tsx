import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
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
import {IProfileGalleryItem, IRootState} from 'types'
import {formatSkillList} from 'utils/skills'
import {setCurrentSkill} from 'components/Profile/actions'
import {fetchProfileTabList} from 'components/ProfileTab/actions'
import {fetchSkillList} from 'components/Skill/actions'
import Tab from 'components/PublicProfile/components/Tab'
import {getCategoryTranslation} from 'utils/translations'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryItem from 'components/PublicProfile/components/view/CardGallery/components/GalleryItem'
import {
  deleteProfileGallery,
  fetchProfileGalleryList,
  resetProfileGalleryList,
  setProfileGalleryCurrentItemIndex,
  setProfileGalleryTab
} from 'components/ProfileGallery/actions'
import {setPageTaskUser} from 'components/TaskUser/actions'
import {fetchPostList, resetPostList} from 'components/Post/actions'
import PostItem from 'components/Post/PostItem'
import GalleryModal from 'components/PublicProfile/components/view/GalleryModal'
import Card from 'components/PublicProfile/components/Card'
import PostModal from 'components/Post/PostModal'
import {confirmOpen, modalClose, postEditOpen} from 'components/Modal/actions'
import Button from 'components/ui/Button'
import Modals from 'components/layout/Modals'
interface Props{
  profileId?: number
  onEdit?: (item) => void
}
const PostList = (props: Props) => {
  const {t} = useTranslation('common')
  const router = useRouter();
  const dispatch = useDispatch()
  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const listLoading = useSelector((state: IRootState) => state.profileGallery.listLoading);
  const total = useSelector((state: IRootState) => state.profileGallery.total)
  const page = useSelector((state: IRootState) => state.profileGallery.page)
  const list = useSelector((state: IRootState) => state.profileGallery.list)
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const isEdit = currentProfile && currentProfile.id === props.profileId;
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState(null);

  const limit = 30;
  useEffect(() => {
    dispatch(resetProfileGalleryList())
    dispatch(fetchProfileGalleryList({
      profileId: props.profileId || profile.id,
      page: 1,
      limit
    }));

  }, []);
  const handleSortChange = (sort) => {

  }
  const handleScrollNext = () => {
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchProfileGalleryList({
      profileId: props.profileId || profile.id,
      page: page + 1,
      limit
    }));
  }
  const showGallery = (model, index) => {
    dispatch(setProfileGalleryCurrentItemIndex(index))
    setIsGalleryOpen(true)
  }

  const handleDelete = (model: IProfileGalleryItem) => {
    dispatch(confirmOpen({
      description: t('post.areYouSureToDelete', { model }),
      onConfirm: () => {
        dispatch(deleteProfileGallery(model.id));
      }
    }));
  }
  const handleEdit = (item) => {
    if(props.onEdit){
      props.onEdit(item);
    }
  }

  return (
    <div>
        {(listLoading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          hasMore={total > list.length}
          loader={listLoading ? <Loader/> : null}>
          {list.map((item, index) => <PostItem isEdit={isEdit} model={item} onClick={(model) => showGallery(model, index)} onEdit={handleEdit} onDelete={handleDelete}/>)}
        </InfiniteScroll>}
        {isGalleryOpen && <GalleryModal isNews={false} isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)}/>}


    </div>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default PostList
