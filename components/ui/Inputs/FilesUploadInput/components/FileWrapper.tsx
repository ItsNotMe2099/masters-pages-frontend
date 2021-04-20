import S3Upload from 'react-s3-uploader/s3upload'

import FileInputPreview from "components/ui/Inputs/FilesUploadInput/components/FileInputPreview";
import React, {
  useState, useCallback, useEffect, useRef,
} from 'react'
import Button from "../../../Button";
import {modalClose} from "../../../../Modal/actions";
export interface FileEntity {
  catalogId?: number
  key?: string
  rawFile?: File,
  preview?: string,
  path: string,
  mediaId?: number
}

interface Props {
  key: string,
  file: FileEntity,
  onUpload: (FileEntity) => void,
  onRemove: (FileEntity) => void,
  onChangeFileData: (FileEntity, data) => void
  uploadOptions: any
}

const FileWrapper = (props: Props) => {
  const {
    uploadOptions,
    onChangeFileData,
    onUpload,
    onRemove,
    file,
    key,
  } = props

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!file.rawFile);
  const [progress, setProgress] = useState(0);
  const fileUpload = useRef(null);
  const onFinishFileUpload = useCallback((result) => {
    onUpload({ ...file, catalogId: result.catalogId, path: result.fileKey, mediaId: result.mediaId })
    setIsLoaded(true);
  }, [props.onUpload])
  const onFileUploadError = (error) => {
    console.error('onFileUploadError', error)
    setIsLoaded(true);
  }
  const onProgress = (progress) => {
    console.log("onProgress", progress)
    setProgress(progress)
  }
  useEffect(() => {
    if (file.rawFile &&  !(file.rawFile as any)._uploading) {
      (file.rawFile as any)._uploading = true;
      const options = {
        ...uploadOptions,
        file: file.rawFile,
        onFinish: onFinishFileUpload,
        onProgress: onProgress,
        onError: onFileUploadError,
      }
      fileUpload.current = new S3Upload(options);

    }
  },[])
  const handleRemove = () => {
    if(  fileUpload.current  && file.rawFile){
      console.log("Cancel");
      fileUpload.current.cancel();
    }else{
      console.log("cantCancel", fileUpload.current, file.rawFile);
    }
    onRemove(file)
  }
  const handleConfirmRemove = () => {
    setConfirmRemove(true);
  }
  const handleCancelRemove = () => {
    setConfirmRemove(false);
  }


  return !confirmRemove ? <FileInputPreview
    file={file}
    loading={!isLoaded}
    progress={progress}
    onRemove={handleConfirmRemove}/> : <div>
    <Button white size="9px 16px" onClick={handleRemove} type="button">Удалить</Button>
    <Button transparent onClick={handleCancelRemove}   type="button">Отменить</Button>
  </div>
}


export default FileWrapper
