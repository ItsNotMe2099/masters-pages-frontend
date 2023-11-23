import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from 'react'
import { useTranslation } from 'next-i18next'
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'

const SharePersonalLabel = dynamic(() => import('components/Share/PersonalLabel'), {
  ssr: false
})
import { IRootState} from 'types'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {setPageTaskUser} from 'components/TaskUser/actions'
import GalleryModal from 'components/PublicProfile/components/view/GalleryModal'
import Modals from 'components/layout/Modals'
import {fetchNewsList, resetNewsList, setNewsCurrentItemIndex} from 'components/News/actions'
import GalleryItem from 'components/GalleryItem'
import {useAppContext} from 'context/state'

const NewsPage = (props) => {
  const {t} = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile
  const listLoading = useSelector((state: IRootState) => state.news.listLoading)
  const total = useSelector((state: IRootState) => state.news.total)
  const page = useSelector((state: IRootState) => state.news.page)
  const list = useSelector((state: IRootState) => state.news.list)

  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentEditPost, setCurrentEditPost] = useState(null)

  const limit = 30
  useEffect(() => {
    dispatch(resetNewsList())
    dispatch(fetchNewsList({
      profileId: profile.id,
      page: 1,
      limit
    }))

  }, [])
  const handleSortChange = (sort) => {

  }
  const handleScrollNext = () => {
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchNewsList({
      profileId: profile.id,
      page: page + 1,
      limit
    }))
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
        scrollableTarget='scrollableDiv'
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          hasMore={total > list.length}
          loader={listLoading ? <Loader/> : null}>
          {list.map((item, index) => <GalleryItem isEdit={false} model={item} onClick={(model) => showGallery(model, index)} />)}
        </InfiniteScroll>}
        {isGalleryOpen && <GalleryModal isNews={true} isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)}/>}

      </div>
    <Modals/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true})
export default NewsPage
