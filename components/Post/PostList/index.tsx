import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import { default as React, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const SharePersonalLabel = dynamic(() => import('components/Share/PersonalLabel'), {
  ssr: false
})
import { IProfileGalleryItem, IRootState } from 'types'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  deleteProfileGallery,
  fetchProfileGalleryList,
  resetProfileGalleryList,
  setProfileGalleryCurrentItemIndex
} from 'components/ProfileGallery/actions'
import { setPageTaskUser } from 'components/TaskUser/actions'
import GalleryModal from 'components/PublicProfile/components/view/GalleryModal'
import { confirmOpen } from 'components/Modal/actions'
import GalleryItem from 'components/GalleryItem'
import { useAppContext } from 'context/state'
import PostsRepository from 'data/repositories/PostsRepository'
import { setNewsCurrentItemIndex } from 'components/News/actions'

interface Props {
  profileId?: number
  onEdit?: (item) => void
  allPosts?: boolean
  projectId?: number
}
const PostList = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()
  //const listLoading = useSelector((state: IRootState) => state.profileGallery.listLoading)
  const totalMyPosts = useSelector((state: IRootState) => state.profileGallery.total)
  const pageMyPosts = useSelector((state: IRootState) => state.profileGallery.page)
  const listMyPosts = useSelector((state: IRootState) => state.profileGallery.list)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [list, setList] = useState<IProfileGalleryItem[]>([])
  const [page, setPage] = useState<number>(1)
  const appContext = useAppContext();
  const profile = appContext.profile
  const isEdit = profile && (profile.id === props.profileId || !props.profileId)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentEditPost, setCurrentEditPost] = useState(null)
  const [model, setModel] = useState<IProfileGalleryItem | null>(null)

  const limit = 30

  const fetchAllPostsByProject = async () => {

    await PostsRepository.fetchAllPostsByProject(page, limit, props.projectId).then(i => {
      if (i) {
        setList(i.data)
        setTotal(i.total)
      }
    })
    
  }

  useEffect(() => {
    dispatch(resetProfileGalleryList())
    if (props.allPosts) {
      setLoading(true)
      fetchAllPostsByProject()
      setLoading(false)
    }

    else {
      setLoading(true)
      dispatch(fetchProfileGalleryList({
        profileId: props.profileId || profile.id,
        projectId: props.projectId,
        page: 1,
        limit
      }))
      setLoading(false)
    }
  }, [props.allPosts])
  const handleSortChange = (sort) => {

  }
  const handleScrollNext = () => {
    if (props.allPosts) {
      setPage(page + 1)
      PostsRepository.fetchAllPostsByProject(page, limit, props.projectId).then(i => {
        if (i) {
          setList(data => [...data, ...i.data])
        }
      })
    }
    else {
      dispatch(setPageTaskUser(pageMyPosts + 1))
      dispatch(fetchProfileGalleryList({
        profileId: props.profileId || profile.id,
        projectId: props.projectId,
        page: page + 1,
        limit
      }))
    }
  }
  const showGallery = (model, index, item: IProfileGalleryItem) => {
    dispatch(setProfileGalleryCurrentItemIndex(index))
    setModel(item)
    setIsGalleryOpen(true)
  }

  const handleDelete = (model: IProfileGalleryItem) => {
    dispatch(confirmOpen({
      description: t('post.areYouSureToDelete', { model }),
      onConfirm: () => {
        dispatch(deleteProfileGallery(model.id))
      }
    }))
  }
  const handleEdit = (item) => {
    if (props.onEdit) {
      props.onEdit(item)
    }
  }


  return (
    <div>
      {(loading && (props.allPosts ? total === 0 : totalMyPosts === 0)) && <Loader />}
      {(props.allPosts ? total > 0 : totalMyPosts > 0) && <InfiniteScroll

        dataLength={props.allPosts ? list.length : listMyPosts.length} //This is important field to render the next data
        next={handleScrollNext}
        scrollableTarget='scrollableDiv'
        className={styles.list}
        hasMore={props.allPosts ? total > list.length : totalMyPosts > listMyPosts.length}
        loader={loading ? <Loader /> : null}>
        {(props.allPosts ? list : listMyPosts).map((item, index) => <GalleryItem isEdit={isEdit && item.profileId === profile.id} model={item} onClick={(model) => showGallery(model, index, item)} onEdit={handleEdit} onDelete={handleDelete} />)}
      </InfiniteScroll>}
      {isGalleryOpen && <GalleryModal allPosts={props.allPosts} allPostsModel={model} isNews={false} isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />}


    </div>
  )
}
export default PostList
