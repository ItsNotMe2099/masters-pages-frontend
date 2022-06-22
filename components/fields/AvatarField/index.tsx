import AvatarAddFileBtn from './components/AvatarAddFileBtn'
import AvatarFieldPreview from './components/AvatarInputPreview'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import React, { useState, useCallback, useRef,
} from 'react'
import PropTypes from 'prop-types'
import { shallowEqual } from 'recompose'
import Dropzone, {DropzoneOptions} from 'react-dropzone'
import S3Upload from 'utils/s3upload'
import styles from './index.module.scss'

import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useTranslation } from 'next-i18next'
import FormError from 'components/ui/Form/FormError'
import {IRootState} from 'types'
import {useAppContext} from 'context/state'
import {useField} from 'formik'
import FieldError from 'components/ui/FieldError'
import {IField} from 'types/types'


export interface AvatarFieldProps<T> extends IField<T>{
  className?: string
  accept?: string | string[]
  labelMultiple?: string
  labelSingle?: string
  maxSize?: number
  minSize?: number
  multiple?: boolean,
  error?: any,
  loading?: boolean
  handleChangePhoto?: (string) => {}
  handleDeletePhoto?: () => {},
  infoTitle?: string
  infoFormatAllowed?: string
  infoRequirements?: string
  t?: (string) => string,
}


const AvatarField = (props: AvatarFieldProps<string>) => {
      const {
        accept,
        children,
        className,
        label,

        infoTitle,
        infoFormatAllowed,
        infoRequirements,
        maxSize,
        minSize,
        multiple = false,
        ...rest
    } = props
  const [field, meta, helpers] = useField(props)
  const {value} = field;
  const [error, setError] = useState(null)

  const hasError = !!meta.error && meta.touched
  const dropZoneRef = useRef(null)
  const appContext = useAppContext()
  const role = appContext.role
  const {t} = useTranslation('common')
  const handleChangePhoto = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.open()
    }

  }
  const handleDeletePhoto = useCallback(() => {
    helpers.setValue(null);
    if(props.handleDeletePhoto){
      props.handleDeletePhoto()
    }

  }, [field.value, helpers.setValue])

    // turn a browser dropped file structure into expected structure
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

      const transformFiles = (files: any[]) => {
        if (!files) {
          return multiple ? [] : null
        }

        if (Array.isArray(files)) {
          return files.map(transformFile)
        }

        return transformFile(files)
      }



      const files = value ? (Array.isArray(value) ? value.map((file) => file?.path || file) : [value]) : []

      const [fileProgress, setFileProgress] = useState({})
      const onFileProgress = (percentage, status, rawFile) => {
        const currentProgress = {}
        currentProgress[rawFile.path] = percentage
        setFileProgress({ ...fileProgress, ...currentProgress })

        return
        /*  if (percentage === 0) {
              setLoading(true)
          }
          if (percentage === 100) {
              setLoading(false)
          }
          setPercentage(percentage);*/
      }

      const onDrop = (newFiles, rejectedFiles, event) => {
        const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles]

        setError(null)
        if (multiple) {
          helpers.setValue(transformFiles(updatedFiles))
        } else {
          helpers.setValue(transformFiles(updatedFiles[0]))
        }
        const token = Cookies.get('token')
        const options = {
          files: newFiles,
          signingUrlMethod: 'GET',
          accept: '*/*',
          uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
          signingUrlHeaders: {'Authorization': `Bearer ${token}`, 'profile-role': role},
          signingUrlWithCredentials: false,
          signingUrlQueryParams: { uploadType: 'avatar' },
          autoUpload: true,
          onFinishS3Put: onFinishFileUpload,
          onProgress: onFileProgress,
          onError: onFileUploadError,
          signingUrl: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/sign`,
          s3path: 'uploads',
        }

        setTimeout(() => {
          new S3Upload(options)
        }, 300)

        // eslint-disable-line

      }

      const onFileUploadError = (error) => {
        console.error('onFileUploadError', error)
          setError(error)
      }
      const onRemove = file => () => {
        if (multiple) {
          const filteredFiles = files.filter(
                stateFile => !shallowEqual(stateFile, file),
            )
          helpers.setValue(filteredFiles as any)
        } else {
          helpers.setValue(null)
        }

        setError(null)
      }
      const onFinishFileUpload = useCallback(
        (result, file) => {
          const newFile = result.fileKey
          let newFileList

          if (multiple) {
            const filteredFiles = files.filter(
                    stateFile => !shallowEqual(stateFile, file),
                )

            newFileList = [...filteredFiles, newFile]
          } else {
            newFileList =  [newFile]
          }

          helpers.setValue(multiple ? newFileList : newFile)

          if(props.handleChangePhoto){
            props.handleChangePhoto(multiple ? newFileList : newFile)
          }
        },
        [value, helpers.setValue, files],
    )

  const onDropRejected = (error) => {
    if(error.length > 0 && error[0].errors.length > 0){
      setError(error[0].errors[0].message)
    }

  }



      const dopZoneProps = {
        maxSize,
        minSize,
        multiple,
        accept,
        onDrop,
        onDropRejected,
      }

      return (
        <>
      <div className={`${styles.root} ${!!(files.length > 0) && styles.hasBackDrop}`}>
        <Dropzone ref={dropZoneRef}   {...dopZoneProps}>
          {({getRootProps, getInputProps, acceptedFiles}) =>
            <div className={styles.preview}>

          <div
            data-testid="dropzone"
            className={styles.dropZone}

            {...getRootProps()}
          >
            <AvatarAddFileBtn isLoading={!!(files.length > 0 && files[0].rawFile)} hasImage={files.length > 0 && !files[0].rawFile}/>
            <input
              {...getInputProps()}
            />

          </div>
          {(Array.isArray(files) ? files : [files]).map((file, index) => (
            <AvatarFieldPreview
              key={index}
              file={file}
              loading={!!file.rawFile || props.loading}
              progress={file && file.rawFile ? fileProgress[file.rawFile.path] || 0 : ( props.loading ? 100 : 0)}
              onRemove={onRemove(file)}
            >
            </AvatarFieldPreview>
          ))}
          {files.length > 0 && <div className={styles.backdrop}/>}
        </div>}
       </Dropzone>
        <div className={styles.info}>
          <div>{infoTitle || t('forms.avatarInput.uploadYourPhoto')}</div>
          <div>{infoFormatAllowed || t('forms.avatarInput.formatAllowed')}</div>
          <div>{infoRequirements || `${t('forms.avatarInput.minimalSize')}: 180×180 px.`}</div>
          <FieldError showError={hasError}>{meta.error}</FieldError>
          {(error || props.error) && <FormError error={error || props.error}/>}
          <div className={styles.infoActions}>
            <div className={styles.infoActionItem} onClick={handleChangePhoto}>{t('forms.avatarInput.changePhoto')} <img src={'/img/icons/link-arrow-left.svg'} /></div>
            {files.length > 0 &&  <div className={styles.infoActionItem} onClick={handleDeletePhoto}>{t('forms.avatarInput.deletePhoto')} <img src={'/img/icons/link-cross.svg'} /></div>}
          </div>
        </div>

            </div>

            <div className={styles.infoActions__mobile}>
            <div className={styles.infoActionItem} onClick={handleChangePhoto}>{t('forms.avatarInput.changePhoto')} <img src={'/img/icons/link-arrow-left.svg'} /></div>
            {files.length > 0 &&  <div className={styles.infoActionItem} onClick={handleDeletePhoto}>{t('forms.avatarInput.deletePhoto')}  <img src={'/img/icons/link-cross.svg'} /></div>}
          </div>
          </>
      )
    }

AvatarField.defaultProps = {
  maxSize: 5242880,
  accept: ['image/jpeg', 'image/png', 'image/jpg']
}

export default AvatarField