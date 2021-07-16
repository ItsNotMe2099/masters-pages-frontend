import { fetchChat, sendMessage } from "components/Chat/actions";
import CloseIcon from "components/svg/CloseIcon";
import TextArea from "components/ui/Inputs/TextArea";
import Loader from "components/ui/Loader";
import { default as React, useEffect, useState } from "react";
import { IRootState } from "types";
import { isMediaImage } from "utils/media";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import EventChatAttachFile
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventChatNewMessage/components/ChatAttachFile'
import {useTranslation} from 'react-i18next'
interface Props {

}

export default function EventChatNewMessage(props: Props) {
  const dispatch = useDispatch()
  const {chat, messageSentError, messageIsSending, messageSentSuccess} = useSelector((state: IRootState) => state.chat)
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const {t} = useTranslation('common');
  const handleSendMessage = () => {
    if((message || files.length > 0) && chat) {
      dispatch(sendMessage({ message, chatId: chat.id, files: files.map(file => file.fileKey) }))
    }
  }
  const handleFileUploaded = (result) => {
    setFiles([result]);
  }
  const handleFileDrop = (file) => {
    setFiles([file]);
  }
  const handleChange = (e) => {
    console.log("HandleChange", e.currentTarget.value)
    setMessage(e.currentTarget.value);
  }
  useEffect(() => {
    if(messageSentSuccess){
      setMessage('')
      setFiles([]);
    }
  }, [messageSentSuccess])
  const handleDeleteFile = () => {
    setFiles([]);
  }
  const getImageSrc = (file) => {
    const srcValue = file?.preview ? file.preview : file.fileKey;
    if(!srcValue){
      return;
    }
    return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.REACT_APP_API_URL || 'https://masters-pages.dev.glob-com.ru'}/api/s3/uploads/${srcValue}`)}`
  }
  const renderFilePreview = (file) => {
    //const ext = filename.split('.').pop();
    console.log("File", file)
      return <div className={styles.preview}>
        <div className={styles.removeFile} onClick={handleDeleteFile}><CloseIcon color={'red'}/></div>
        {isMediaImage(file.rawFile?.name || file.fileKey) ? <img className={styles.previewImage} src={getImageSrc(file)}/> : <img className={styles.previewDocument} src={'/img/icons/file-document.svg'}/>}
        </div>

  }

  return (
   <div className={styles.root}>
     {files.length > 0 ? renderFilePreview(files[0]) : <EventChatAttachFile onFileUploaded={handleFileUploaded} onFileDrop={handleFileDrop}/>}
    <form className={styles.form} onSubmit={handleSendMessage}>
     <div className={styles.message}>
       <TextArea
         label={t('event.enterMessage')}
         labelType={'placeholder'}
         meta={{}}
         input={{value: message, onChange: handleChange}}
         className={styles.messageField}
       />
     </div>
     {!messageIsSending ?    <div className={styles.button} onClick={handleSendMessage}>
       <img src={'/img/icons/new-message.svg'}/>
     </div> : <div className={styles.loader}><Loader/></div>}
    </form>
   </div>
  )
}
