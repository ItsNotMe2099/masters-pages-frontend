import AvatarAddFileBtn from "components/ui/AvatarInput/components/AvatarAddFileBtn";
import AvatarInputPreview from "components/ui/AvatarInput/components/AvatarInputPreview";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/FilesUploadInput/components/AddFileBtn";
import React, {
  FunctionComponent,
  Children,
  cloneElement,
  isValidElement,
  ReactElement, useState, useCallback, useRef,
} from 'react'
import PropTypes from 'prop-types'
import { shallowEqual } from 'recompose'
import Dropzone, {DropzoneOptions} from 'react-dropzone';
import S3Upload from 'react-s3-uploader/s3upload'
import styles from './index.module.scss'

import Cookies from 'js-cookie'
import {withTranslation} from "i18n";
import FormError from 'components/ui/Form/FormError'


export interface AvatarInputProps {
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

export interface AvatarInputOptions extends DropzoneOptions {
  inputProps?: any
  onRemove?: Function
}
const AvatarInput = (props: any & AvatarInputProps & AvatarInputOptions) => {
      const {
        accept,
        children,
        className,
        classes: classesOverride,
        format,
        helperText,
        handleChange,
        label,
        labelMultiple = 'ra.input.file.upload_several',
        labelSingle = 'ra.input.file.upload_single',
        infoTitle,
  infoFormatAllowed,
  infoRequirements,
  maxSize,
        minSize,
        multiple = false,
        uploadOptions,
        options: {
            inputProps: inputPropsOptions,
            ...options
        } = {} as AvatarInputOptions,
        parse,
        placeholder,
        resource,
        source,
        validate,
        t,
        input: {value, onChange},
        ...rest
    } = props
  const [error, setError] = useState(null);
  const dropZoneRef = useRef(null);

  const handleChangePhoto = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.open()
    }

  }
  const handleDeletePhoto = useCallback(() => {
        onChange(null)
    if(props.handleDeletePhoto){
      props.handleDeletePhoto();
    }

  }, [value, onChange])

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

        console.log('transformedFile', transformedFile)


        return transformedFile
      }

      const transformFiles = (files: any[]) => {
        console.log("TransformFile", files)
        if (!files) {
          return multiple ? [] : null
        }

        if (Array.isArray(files)) {
          return files.map(transformFile);
        }

        return transformFile(files)
      }



      const files = value ? (Array.isArray(value) ? value.map((file) => file?.path || file) : [value]) : []

      const [fileProgress, setFileProgress] = useState({})
      const onFileProgress = (percentage, status, rawFile) => {
        console.log('onFile progress', percentage)
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
        console.log('OnDrop', files)
        const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles]

        setError(null);
        if (multiple) {
          onChange(transformFiles(updatedFiles))
        } else {
          onChange(transformFiles(updatedFiles[0]))
        }
        const token = Cookies.get('token')

        console.log('OnDrop', files)
        const options = {
          files: newFiles,
          signingUrlMethod: 'GET',
          accept: '*/*',
          uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
          signingUrlHeaders: {'Authorization': `Bearer ${token}`},
          signingUrlWithCredentials: false,
          signingUrlQueryParams: { uploadType: 'avatar' },
          autoUpload: true,
          onFinishS3Put: onFinishFileUpload,
          onProgress: onFileProgress,
          onError: onFileUploadError,
          signingUrl: `${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/sign`,
          s3path: 'uploads',
          ...uploadOptions,
        }

        setTimeout(() => {
          new S3Upload(options)
        }, 300)

        // eslint-disable-line

        if (options.onDrop) {
          options.onDrop(newFiles, rejectedFiles, event)
        }
      }

      const onFileUploadError = (error) => {
        console.error('onFileUploadError', error)
          setError(error);
      }
      const onRemove = file => () => {
        if (multiple) {
          const filteredFiles = files.filter(
                stateFile => !shallowEqual(stateFile, file),
            )
          onChange(filteredFiles as any)
        } else {
          onChange(null)
        }

        if (options.onRemove) {
          options.onRemove(file)
        }
        setError(null);
      }
      const onFinishFileUpload = useCallback(
        (result, file) => {
          const newFile = result.fileKey
          let newFileList

          if (multiple) {
            const filteredFiles = files.filter(
                    stateFile => !shallowEqual(stateFile, file),
                )
            console.log('onFinishFileUpload', files, result.fileKey)

            newFileList = [...filteredFiles, newFile]
          } else {
            newFileList =  [newFile]
          }

          onChange(multiple ? newFileList : newFile)

          if(props.handleChangePhoto){
            props.handleChangePhoto(multiple ? newFileList : newFile);
          }
        },
        [value, onChange, files],
    )

  const onDropRejected = (error) => {
    if(error.length > 0 && error[0].errors.length > 0){
      console.log("onError", error[0].errors[0].message);
      setError(error[0].errors[0].message);
    }

  }



      const dopZoneProps = {
        ...options,
        maxSize,
        minSize,
        multiple,
        accept,
        onDrop,
        onDropRejected,
      }

      console.log('Files', files)
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
            <AvatarInputPreview
              key={index}
              file={file}
              loading={!!file.rawFile || props.loading}
              progress={file && file.rawFile ? fileProgress[file.rawFile.path] || 0 : ( props.loading ? 100 : 0)}
              onRemove={onRemove(file)}
            >
            </AvatarInputPreview>
          ))}
          {files.length > 0 && <div className={styles.backdrop}/>}
        </div>}
       </Dropzone>
        <div className={styles.info}>
          <div>{infoTitle || t('forms.avatarInput.uploadYourPhoto')}</div>
          <div>{infoFormatAllowed || t('forms.avatarInput.formatAllowed')}</div>
          <div>{infoRequirements || `${t('forms.avatarInput.minimalSize')}: 180×180 px.`}</div>
          <ErrorInput />
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

AvatarInput.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.element,
  classes: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  labelMultiple: PropTypes.string,
  labelSingle: PropTypes.string,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  placeholder: PropTypes.node,
}
AvatarInput.defaultProps = {
  maxSize: 5242880,
  accept: ["image/jpeg", "image/png"]
}

export default withTranslation('common')(AvatarInput)
