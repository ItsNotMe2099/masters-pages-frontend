import { fetchChat, sendMessage } from "components/Chat/actions";
import CloseIcon from "components/svg/CloseIcon";
import TextArea from "components/ui/Inputs/TextArea";
import Loader from "components/ui/Loader";
import { default as React, useEffect, useState } from "react";
import { IChat, IChatMessage, IChatMessageType, IRootState } from "types";
import { isMediaImage } from "utils/media";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';
import NewMessage from 'components/svg/NewMessage'
import {createProfileGalleryComment} from 'components/ProfileGallery/actions'
import {createNewsComment} from 'components/News/actions'
interface Props {
  isNews?: boolean
}

export default function GalleryNewComment({isNews}: Props) {
  const dispatch = useDispatch()
  const { commentSentError, commentIsSending, commentSentSuccess} = useSelector((state: IRootState) => state.profileGallery)
  const galleryItem = useSelector((state: IRootState) =>  isNews ?  state.news.currentItem : state.profileGallery.currentItem)
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if(message && galleryItem) {
      if(isNews){
        dispatch(createNewsComment({ content: message, profileGalleryId: galleryItem.id }, () => setMessage('')))
      }else{
        dispatch(createProfileGalleryComment({ content: message, profileGalleryId: galleryItem.id }, () => setMessage('')))
      }
    }
  }

  const handleChange = (e) => {
    console.log("HandleChange", e.currentTarget.value)
    setMessage(e.currentTarget.value);
  }
  useEffect(() => {
    console.log("commentSentSuccess", commentSentSuccess);
    if(commentSentSuccess){
      setMessage('')
    }
  }, [commentSentSuccess])


  return (
   <div className={styles.root}>
    <form className={styles.form} onSubmit={handleSendMessage}>
     <div className={styles.message}>
       <TextArea
         label="Your comment here"
         labelType={'placeholder'}
         meta={{}}
         input={{value: message, onChange: handleChange}}
         className={styles.messageField}
       />
     </div>
     {!commentIsSending ?    <div className={styles.button} onClick={handleSendMessage}>
       <NewMessage/>
     </div> : <div className={styles.loader}><Loader/></div>}
    </form>
   </div>
  )
}
