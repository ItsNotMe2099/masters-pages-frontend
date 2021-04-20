import React, { useEffect, ReactNode, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { Line, Circle } from 'rc-progress';
interface Props {
  className?: string
  progress?: number,
  loading?: boolean,
  onRemove: () => void
  file: any,
  isLast?:boolean
}

const FileInputPreview: FunctionComponent<Props> = props => {
  const {

        className,
        onRemove,
        progress,
    loading,
        file,
        ...rest
    } = props

  useEffect(() => {
    return () => {
      const preview = file && file.rawFile ? file.rawFile.preview : file.preview
      if (preview) {
        window.URL.revokeObjectURL(preview)
      }
    }
  }, [file])

  const getImageSrc = (file) => {

    const srcValue = file?.path || file.preview;
    if(!srcValue){
      return;
    }
    return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.REACT_APP_API_URL || 'https://masters-pages.dev.glob-com.ru'}/api/s3/uploads/${srcValue}`)}`
  }
  return (
        <div className={`${styles.root} ${props.isLast && styles.isLast}`}>

          <div className={styles.image}>
            <img
              src={getImageSrc(file)}
            />
            {loading && <div className={styles.loader}>
              <div className={styles.loaderFill} style={{width: `${loading ? progress: 100}%`}}></div>
            </div>}
          </div>
          <div className={styles.title}></div>
          <div className={styles.deleteButton} onClick={onRemove}>
            <img src="/img/icons/fileDelete.svg" alt=''/>
          </div>
       </div>
  )
}

FileInputPreview.propTypes = {
  className: PropTypes.string,
  file: PropTypes.any,
  onRemove: PropTypes.func.isRequired,
}

FileInputPreview.defaultProps = {
  file: undefined,
}

export default FileInputPreview
