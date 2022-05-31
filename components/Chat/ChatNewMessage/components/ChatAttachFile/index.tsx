import { sendMessage } from 'components/Chat/actions'
import { useEffect, useState } from 'react'
import S3Upload from 'utils/s3upload'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'
import { useDropzone } from 'react-dropzone'
import {useAppContext} from 'context/state'
interface Props {
  onFileUploaded: (file) => void
  onFileDrop: (file) => void
  onProgress: (progress) => void
}

export default function ChatAttachFile(props: Props) {
  const dispatch = useDispatch()
  const {chat, messageSentError, messageIsSending, messageSentSuccess} = useSelector((state: IRootState) => state.chat)
  const appContext = useAppContext()
  const role = appContext.role


  const [message, setMessage] = useState('')

  const transformFile = file => {
    if (!(file instanceof File)) {
      return file
    }


    const preview = URL.createObjectURL(file)
    const transformedFile = {
      rawFile: file,
      preview: preview,
    }


    return transformedFile
  }
  const onFinishFileUpload = (result) => {
    props.onFileUploaded(result)
  }

  const onFileUploadError = (error) => {
    console.error('onFileUploadError', error)
  }
  const onFileProgress = (progress) => {
    props.onProgress(progress)
  }

  const onDrop = (files, rejectedFiles, event) => {
    const token = Cookies.get('token')
    console.log('OnDropFile', files)
    const options = {
      signingUrlMethod: 'GET',
      accept: '*/*',
      uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
      signingUrlHeaders: { 'Authorization': `Bearer ${token}`, 'profile-role': role},
      signingUrlWithCredentials: false,
      signingUrlQueryParams: { uploadType: 'avatar' },
      autoUpload: true,
      onFinishS3Put: onFinishFileUpload,
      onProgress: onFileProgress,
      onError: onFileUploadError,
      signingUrl: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/sign`,
      s3path: 'uploads',
      files: files,
      ...{}
    }
    props.onFileDrop(transformFile(files[0]))
    new S3Upload(options as any)

  }

  const handleSendMessage = () => {
    if(message && chat) {
      dispatch(sendMessage({ message, chatId: chat.id }))
    }
  }
  const handleChange = (e) => {
    setMessage(e.currentTarget.value)
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
