
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/S3FileUpload/components/AddFileBtn";
import FileInputPreview from "components/ui/Inputs/S3FileUpload/components/FileInputPreview";
import React, {
    FunctionComponent,
    Children,
    cloneElement,
    isValidElement,
    ReactElement, useState, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import { shallowEqual } from 'recompose'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import S3Upload from 'react-s3-uploader/s3upload'
import styles from './index.module.scss'

import Cookies from 'js-cookie'


export interface FileInputProps {
  accept?: string
  labelMultiple?: string
  labelSingle?: string
  maxSize?: number
  minSize?: number
  multiple?: boolean
}

export interface FileInputOptions extends DropzoneOptions {
  inputProps?: any
  onRemove?: Function
}
const FileInput = (props: any & FileInputProps & FileInputOptions) => {
      const {
        accept,
        children,
        className,
        classes: classesOverride,
        format,
        helperText,
        label,
        labelMultiple = 'ra.input.file.upload_several',
        labelSingle = 'ra.input.file.upload_single',
        maxSize,
        minSize,
        multiple = false,
        uploadOptions,
        options: {
            inputProps: inputPropsOptions,
            ...options
        } = {} as FileInputOptions,
        parse,
        placeholder,
        resource,
        source,
        validate,
        input: {value, onChange},
        ...rest
    } = props


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
          signingUrl: `https://masters-pages.dev.glob-com.ru/api/s3/sign`,
          s3path: 'masters-pages/files',
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
        },
        [value, onChange, files],
    )



      const { getRootProps, getInputProps } = useDropzone({
        ...options,
        accept,
        maxSize,
        minSize,
        multiple,
        onDrop,
      })

      console.log('Files', files)
      return (
      <div className={styles.root}>
                <div
                    data-testid="dropzone"
                    className={styles.dropZone}
                    {...getRootProps()}
                >
                  <AddFileButton />
                    <input
                        {...getInputProps()}
                    />

                </div>
        <div className={styles.previewList}>
          {(Array.isArray(files) ? files : [files]).map((file, index) => (
            <FileInputPreview
              key={index}
              file={file}
              loading={!!file.rawFile}
              progress={file && file.rawFile ? fileProgress[file.rawFile.path] || 0 : 0}
              onRemove={onRemove(file)}
            >
            </FileInputPreview>
          ))}
        </div>
        <ErrorInput {...props}/>
            </div>
      )
    }

FileInput.propTypes = {
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

export default FileInput
