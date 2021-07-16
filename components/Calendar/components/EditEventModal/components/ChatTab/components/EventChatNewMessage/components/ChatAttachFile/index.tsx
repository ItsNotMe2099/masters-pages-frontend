import { attachPhoto, fetchChat, sendMessage } from "components/Chat/actions";
import TextArea from "components/ui/Inputs/TextArea";
import Loader from "components/ui/Loader";
import { useEffect, useState } from "react";
import S3Upload from "react-s3-uploader/s3upload";
import { IChat, IChatMessage, IChatMessageType, IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';

import Cookies from 'js-cookie'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
interface Props {
  onFileUploaded: (file) => void
  onFileDrop: (file) => void
}

export default function EventChatAttachFile(props: Props) {
  const dispatch = useDispatch()
  const {chat, messageSentError, messageIsSending, messageSentSuccess} = useSelector((state: IRootState) => state.chat)



  const [message, setMessage] = useState('');

  const transformFile = file => {
    if (!(file instanceof File)) {
      return file
    }


    const preview = URL.createObjectURL(file)
    const transformedFile = {
      rawFile: file,
      preview: preview,
    }

    console.log('transformedFile', transformedFile)


    return transformedFile
  }
  const onFinishFileUpload = (result) => {
    props.onFileUploaded(result);
  }

  const onFileUploadError = (error) => {
    console.error('onFileUploadError', error)
  }
  const onFileProgress = (progress) => {
    console.log("onProgress", progress)

  }

  const onDrop = (files, rejectedFiles, event) => {
    const token = Cookies.get('token')
    const options = {
      signingUrlMethod: 'GET',
      accept: '*/*',
      uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
      signingUrlHeaders: { 'Authorization': `Bearer ${token}`},
      signingUrlWithCredentials: false,
      signingUrlQueryParams: { uploadType: 'avatar' },
      autoUpload: true,
      onFinishS3Put: onFinishFileUpload,
      onProgress: onFileProgress,
      onError: onFileUploadError,
      signingUrl: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/sign`,
      s3path: 'masters-pages/files',
      files: files,
      ...{}
    }
    props.onFileDrop(transformFile(files[0]));
    new S3Upload(options as any)

  }

  const handleSendMessage = () => {
    if(message && chat) {
      dispatch(sendMessage({ message, chatId: chat.id }))
    }
  }
  const handleChange = (e) => {
    console.log("HandleChange", e.currentTarget.value)
    setMessage(e.currentTarget.value);
  }

  useEffect(() => {
    if(messageSentSuccess){
      setMessage('')
    }
  }, [messageSentSuccess])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop
  })
  return (
   <div className={styles.root}>
     <div
     data-testid="dropzone"
     className={styles.dropZone}
     {...getRootProps()}
     >
     <div className={styles.action}><img src={'/img/icons/camera_small.svg'}/></div>
       <input
         {...getInputProps()}
       />
     </div>
   </div>
  )
}
