import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'

import FileWrapper, { FileEntity } from './components/FileWrapper'
import React, {
  ReactElement, useState, useCallback, useEffect,
} from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './index.module.scss'
import Cookies from 'js-cookie'
import nextId from 'react-id-generator'
import { useDispatch} from 'react-redux'
import AddFileButton from './components/AddFileBtn'
import {useAppContext} from 'context/state'
import {useField} from 'formik'
import FieldError from 'components/ui/FieldError'
import {IField} from 'types/types'

const transformFile = file => {
  if (!(file instanceof File)) {
    return file
  }
  const preview = URL.createObjectURL(file)
  const transformedFile = {
    key: nextId('file'),
    rawFile: file,
    preview: preview,
  }
  return transformedFile
}
const formatValue = (value): FileEntity[]  => {
  return value ? (Array.isArray(value) ? value.map((file) => { return {path: file?.path as string || file as string}}) : [{path: value?.path as string || value as string}]) : []
}


export interface FileFieldProps<T>  extends IField<T>{
  accept?: string
  labelMultiple?: string
  labelSingle?: string
  maxSize?: number
  minSize?: number
  multiple?: boolean,
  addFileButton?: ReactElement
  maxAmount?: number
}


const DocField = (props: any & FileFieldProps<string | string[]>) => {

  const {
    accept,
    label,
    maxSize,
    minSize,
    multiple = false,
    maxAmount,
    ...rest
  } = props
  const dispatch = useDispatch()
  const [field, meta, helpers] = useField(props)
  const {value} = field;
  const token = Cookies.get('token')
  const appContext = useAppContext()
  const role = appContext.role
  const hasError = !!meta.error && meta.touched
  console.log('VALUEV', value)
  const FileWrapperUploadOptions = {
    signingUrlMethod: 'GET',
    accept: '*/*',
    uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
    signingUrlHeaders: { 'Authorization': `Bearer ${token}`, 'profile-role': role},
    signingUrlWithCredentials: false,
    signingUrlQueryParams: { uploadType: 'avatar' },
    autoUpload: true,
    signingUrl: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/sign`,
    s3path: 'uploads',
  }

  const [files, setFiles] = useState<FileEntity[]>(formatValue(value))
  console.log("Filtes111", value, files)
  useEffect(() => {
    const filtered = files.filter((file => !!file.path))
    if(multiple) {
      helpers.setValue(filtered.map(item => item.path))
    }else{
      console.log("SetFilesValue", filtered[0]?.path || null)
      helpers.setValue(filtered[0]?.path || null)
    }
  }, [files])
  useEffect(() => {
    if(props.filesFromDropZone && props.filesFromDropZone.length > 0){
      onDrop(props.filesFromDropZone)
    }
  }, [props.filesFromDropZone])
  const generateKey = () => {
    return nextId('file-')
  }
  const onUpload = (file: FileEntity) => {

    setFiles(oldFiles => oldFiles.map(item => {
      return {
        ...item,
        ...(item.rawFile?.name === file.rawFile.name ? {catalogId: file.catalogId, path: file.path, mediaId: file.mediaId} : {})
      }
    }))
  }
  const onChangeFileData = (file: FileEntity, data) => {
    setFiles(oldFiles => oldFiles.map(item => {
      return {
        ...item,
        ...( ( (file.path && item.path === file.path) || (!file.path && item.rawFile?.name === file.rawFile.name)) ? {data} : {})
      }
    }))
  }
  const onDrop = useCallback((newFiles) => {
    const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles]
    setFiles(updatedFiles.map(transformFile))
  }, [files])

  const onRemove =(file: FileEntity) => {
    setFiles(files => {
      const index = files.findIndex( item => (file.key && file.key === item.key) || (!file.key && item.path === file.path))
      const newFiles = [...files]
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    minSize,
    multiple,
    onDrop,
  })

  return (
    <div className={styles.root}>
      {files.length > 0 && <div className={styles.previewList}>
        {files.map((file, index) => (
          <FileWrapper
            key={file.key}
            uploadOptions={FileWrapperUploadOptions}
            file={file}
            onUpload={onUpload}
            onChangeFileData={onChangeFileData}
            onRemove={onRemove}
          />
        ))}
      </div>}
      {(files.length === 0 || multiple) &&<div
        data-testid="dropzone"
        className={styles.dropZone}
        {...getRootProps()}
      >
        {(!maxAmount || maxAmount !== value.length) && <div className={styles.add}>
          <div className={styles.image}>
            <img src='/img/DocField/plus.svg' alt=''/>
          </div>
          <div className={styles.text}>
            Add File
          </div>
          <div className={styles.only}>
            Format allowed PDF, DOC and TXT
          </div>
        </div>}
        <input
          {...getInputProps()}
        />

      </div>}
      <FieldError showError={hasError}>{meta.error}</FieldError>
    </div>
  )
}

DocField.defaultProps = {
  accept: ['text/plain', 'application/pdf', 'application/msword']
}

export default DocField
