import { fetchChat, sendMessage } from "components/Chat/actions";
import ChatAttachFile from "components/Chat/ChatNewMessage/components/ChatAttachFile";
import CloseIcon from "components/svg/CloseIcon";
import TextArea from "components/ui/Inputs/TextArea";
import Loader from "components/ui/Loader";
import { default as React, useEffect, useState } from "react";
import { IChat, IChatMessage, IChatMessageType, IRootState } from "types";
import { isMediaImage } from "utils/media";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'i18n'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import FormError from 'components/ui/Form/FormError'
interface Props {

}

export default function ChatNewMessage(props: Props) {
  const dispatch = useDispatch()
  const {chat, messageSentError, messageIsSending, messageSentSuccess} = useSelector((state: IRootState) => state.chat)
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const {t} = useTranslation('common');
  const handleSendMessage = () => {
    if(files.length > 0 && isFileLoading(files[0])){
      setError(t('chat.newMessageFileError'));
      return;
    }
    if((message || files.length > 0) && chat) {
      setError(null);
      console.log("FilesSend", files);
      dispatch(sendMessage({ message, chatId: chat.id, files: files.map(file => file.fileKey) }))
    }
  }
  const handleFileUploaded = (result) => {
    setFiles([result]);
    setError(null);
  }
  const handleFileDrop = (file) => {
    setFiles([file]);
  }
  const handleChange = (e) => {
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
  const isFileLoading = (file) => {
    const srcValue = file?.preview ? file.preview : file.fileKey;
    if(!srcValue){
      return;
    }
    return srcValue.indexOf('blob:') === 0;
  }
  const handleFileProgress = (progress) => {
    console.log("HandlePRogress", progress);
    setProgress(progress)
  }
  const getImageSrc = (file) => {
    const srcValue = file?.preview ? file.preview : file.fileKey;
    if(!srcValue){
      return;
    }
    return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/${srcValue}`)}`
  }
  const renderFilePreview = (file) => {
    //const ext = filename.split('.').pop();
      return <div className={styles.preview}>
        <div className={styles.removeFile} onClick={handleDeleteFile}><CloseIcon color={'red'}/></div>
        {isMediaImage(file.rawFile?.name || file.fileKey) ? <img className={styles.previewImage} src={getImageSrc(file)}/> : <img className={styles.previewDocument} src={'/img/icons/file-document.svg'}/>}
        {isFileLoading(file) && <div className={styles.loaderFile}>
          <div className={styles.loaderFileProgress}>
            <div className={styles.loaderFileFill} style={{width: `${progress}%`}}/></div>
        </div>}
        </div>

  }
  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
   <div className={styles.root}>
     {(error || messageSentError) && <div className={styles.error}><FormError error={messageSentError || error}/></div>}
     {files.length > 0 ? renderFilePreview(files[0]) : <ChatAttachFile onProgress={handleFileProgress} onFileUploaded={handleFileUploaded} onFileDrop={handleFileDrop}/>}
    <form className={styles.form} onSubmit={handleSendMessage}>
     <div className={styles.message}>
       <TextArea
         label={t('event.enterMessage')}
         labelType={'placeholder'}
         meta={{}}
         input={{value: message, onChange: handleChange}}
         className={styles.messageField}
         onKeyDown={onEnterPress}
       />
     </div>
     {!messageIsSending ?    <div className={styles.button} onClick={handleSendMessage}>
       <img src={'/img/icons/new-message.svg'}/>
     </div> : <div className={styles.loader}><Loader/></div>}
    </form>
   </div>
  )
}
