import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
import {useTranslation} from "i18n";
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
import {fetchNewsList, resetNewsList, setNewsCurrentItemIndex} from 'components/News/actions'

const NewsPage = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch()
  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const listLoading = useSelector((state: IRootState) => state.news.listLoading);
  const total = useSelector((state: IRootState) => state.news.total)
  const page = useSelector((state: IRootState) => state.news.page)
  const list = useSelector((state: IRootState) => state.news.list)

  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState(null);

  const limit = 30;
  useEffect(() => {
    dispatch(resetNewsList())
    dispatch(fetchNewsList({
      profileId: profile.id,
      page: 1,
      limit
    }));

  }, []);
  console.log("LoadListTotal", total);
  const handleSortChange = (sort) => {

  }
  const handleScrollNext = () => {
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchNewsList({
      profileId: profile.id,
      page: page + 1,
      limit
    }));
  }
  const showGallery = (model, index) => {
    dispatch(setNewsCurrentItemIndex(index))
    setIsGalleryOpen(true)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>


        </div>
        {(listLoading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          hasMore={total > list.length}
          loader={listLoading ? <Loader/> : null}>
          {list.map((item, index) => <PostItem isEdit={false} model={item} onClick={(model) => showGallery(model, index)} />)}
        </InfiniteScroll>}
        {isGalleryOpen && <GalleryModal isNews={true} isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)}/>}

      </div>
    <Modals/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default NewsPage
