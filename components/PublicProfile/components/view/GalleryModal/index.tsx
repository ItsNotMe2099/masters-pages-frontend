import Logo from "components/Logo";
import {modalClose} from "components/Modal/actions";
import {taskNegotiationFinish} from "components/TaskNegotiation/actions";
import Modal from "components/ui/Modal";
import {IProfileGalleryItem, IRootState} from "types";
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {getMediaPath} from 'utils/media'
import MainSliderArrowRight from 'components/svg/MainSliderArrowRight'
import MainSliderArrowLeft from 'components/svg/MainSliderArrowLeft'
import {
  createProfileGalleryLikeRequest,
  fetchProfileGalleryItemCommentList,
  fetchProfileGalleryList,
  setPageProfileGalleryCurrentItemCommentsPage,
  setProfileGalleryCurrentItemIndex
} from 'components/ProfileGallery/actions'
import GalleryNewComment from 'components/PublicProfile/components/view/GalleryModal/GalleryCommentForm'
import {setPageTaskUser} from 'components/TaskUser/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryItem from 'components/PublicProfile/components/view/CardGallery/components/GalleryItem'
import {default as React} from 'react'
import GalleryCommentItem from 'components/PublicProfile/components/view/GalleryModal/GalleryCommentItem'
import LikeIcon from 'components/svg/LikeIcon'
import {
  createNewsLikeRequest,
  fetchNewsItemCommentList, setNewsCurrentItemIndex,
  setPageNewsCurrentItemCommentsPage
} from 'components/News/actions'

interface Props {
  isOpen: boolean,
  isNews?: boolean
  onClose: () => void
}

export default function GalleryModal(props: Props) {
  const {isNews} = props;
  const dispatch = useDispatch();

  const model = useSelector((state: IRootState) => isNews ? state.news.currentItem : state.profileGallery.currentItem);
  const currentIndex = useSelector((state: IRootState) => isNews ? state.news.currentItemIndex : state.profileGallery.currentItemIndex)
  const total = useSelector((state: IRootState) => isNews ? state.news.total : state.profileGallery.total)
  const likeIsSending = useSelector((state: IRootState) => isNews ? state.news.likeIsSending : state.profileGallery.likeIsSending);
  const commentsList = useSelector((state: IRootState) => isNews ? state.news.currentItemCommentList : state.profileGallery.currentItemCommentList);
  const commentsLoading = useSelector((state: IRootState) => isNews ? state.news.currentItemCommentLoading : state.profileGallery.currentItemCommentLoading);
  const commentsTotal = useSelector((state: IRootState) => isNews ? state.news.currentItemCommentTotal : state.profileGallery.currentItemCommentTotal)
  const commentsPage = useSelector((state: IRootState) => isNews ? state.news.currentItemCommentPage : state.profileGallery.currentItemCommentPage)
  const commentLimit = 10;

  const handleScrollNext = () => {
    if(isNews){
      dispatch(setPageNewsCurrentItemCommentsPage(commentsPage + 1))
      dispatch(fetchNewsItemCommentList({
        type: 'gallery',
        profileGalleryId: model.id,
        page: commentsPage + 1,
        limit: commentLimit
      }));
    }else {
      dispatch(setPageProfileGalleryCurrentItemCommentsPage(commentsPage + 1))
      dispatch(fetchProfileGalleryItemCommentList({
        type: 'gallery',
        profileGalleryId: model.id,
        page: commentsPage + 1,
        limit: commentLimit
      }));
    }
  }

  const handleLike = () => {
    if(isNews) {
      dispatch(createNewsLikeRequest(model.id));
    }else{
      dispatch(createProfileGalleryLikeRequest(model.id));
    }
  }
  const handleClose = () => {
    props.onClose();
  }
  const handleNextClick = () => {
    if (currentIndex + 1 < total) {
      if(isNews){
        dispatch(setNewsCurrentItemIndex(currentIndex + 1))
      }else{
        dispatch(setProfileGalleryCurrentItemIndex(currentIndex + 1))
      }

    }
  }
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      if(isNews){
        dispatch(setNewsCurrentItemIndex(currentIndex - 1))
      }else{
        dispatch(setProfileGalleryCurrentItemIndex(currentIndex - 1))
      }

    }
  }

  return (
    <Modal{...props} className={styles.modal} loading={false} size="medium" closeClassName={styles.close}
          onRequestClose={handleClose}>
      <div className={styles.arrowLeft} onClick={handlePrevClick}>
        {currentIndex > 0 && <MainSliderArrowLeft/>}
      </div>
      <div className={styles.root}>
        <div className={styles.photo}>
          <img src={getMediaPath(model.photo)}/>
        </div>
        <div className={styles.details}>
          <div className={styles.detailsWrapper}>
            <div className={styles.title}>{model.title}</div>
            <div className={styles.description}>{model.description}</div>
            <div className={styles.comments}>
              <div className={styles.commentsWrapper} id={'gallery-item-comments'}>
              {(commentsLoading && total === 0) && <Loader/>}
              {total > 0 && <InfiniteScroll
                dataLength={commentsList.length} //This is important field to render the next data
                next={handleScrollNext}
                scrollableTarget={"gallery-item-comments"}
                className={styles.list}
                hasMore={commentsTotal > commentsList.length}
                loader={commentsLoading ? <Loader/> : null}>
                {commentsList.map((item, index) => <GalleryCommentItem model={item}/>)}
              </InfiniteScroll>}
            </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.stat}>
              <div className={styles.statItem}>{likeIsSending ? <div className={styles.likeLoader}><Loader/></div> : <><div onClick={handleLike}><LikeIcon className={styles.likeIcon}/></div>{model.likesCount}</>}</div>
              <div className={styles.statItem}><img src={'/img/icons/comments.svg'}/>{model.commentsCount}</div>
            </div>
            {model.commentsAllowed && <GalleryNewComment isNews={isNews}/>}
          </div>
        </div>
      </div>
      <div className={styles.arrowRight} onClick={handleNextClick}>
        {currentIndex + 1 < total && <MainSliderArrowRight/>}
      </div>
    </Modal>
  )
}