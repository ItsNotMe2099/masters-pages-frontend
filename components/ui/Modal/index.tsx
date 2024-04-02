import Loader from 'components/ui/Loader'
import { ReactElement, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import ReactModal from 'react-modal'
import CloseIcon from 'components/svg/CloseIcon'
import { useAppContext } from 'context/state'


interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
  size?: 'normal' | 'large' | 'medium'
  title?: string,
  image?: string,
  children?: any,
  loading?: boolean,
  className?: string,
  closeClassName?: string,
  header?: ReactElement
  noRadius?: boolean
  blurOverlay?: boolean
}

export default function Modal(props: Props) {
  const bodyRef = useRef(null)
  const customStyles = {
    overlay: !props.blurOverlay ? {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      zIndex: '4',
    } : {
      display: 'flex',
      zIndex: '4',
      backdropFilter: 'blur(5px)'
    },
    content: {
      width: '100%',
      borderRadius: '21px',
      padding: '0',
      border: '0',
      margin: 'auto',
      position: 'static',
      inset: '0',
      overflow: 'hidden',
      background: 'none'

    },
  }
  useEffect(() => {

    if (!bodyRef.current) {
      return
    }

    if (props.loading) {
      bodyRef.current.style.visibility = 'hidden'
    } else {
      bodyRef.current.style.visibility = 'inherit'
    }
  }, [props.loading])
  useEffect(() => {
    if (props.isOpen) {
      ReactModal.setAppElement('body')
    }
  }, [props.isOpen])
  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return styles.rootLarge
      case 'medium':
        return styles.rootMedium
      case 'normal':
      default:
        return styles.rootNormal
    }
  }

  const appContext = useAppContext()

  return (
    <ReactModal
      style={customStyles}
      isOpen={props.isOpen}
      ariaHideApp={false}
      onRequestClose={props.onRequestClose}
    >
      <div className={classNames(styles.frame, { [styles.noOverflow]: appContext.isOverlayShown })} >
        <div className={styles.overlay} onClick={props.onRequestClose} />
        <div className={`${styles.root} ${getSizeClass(props.size)} ${props.className}`}>
          {props.onRequestClose && <div className={`${styles.close} ${props.closeClassName}`} onClick={props.onRequestClose}>
            <CloseIcon />
          </div>}
          <div className={styles.center} ref={bodyRef}>
            {(props.image && !props.loading) && <div className={styles.image}>
              <img src={props.image} />
            </div>}
            {(props.title && !props.loading) && <div className={styles.title}>
              {props.title}
            </div>}

            {props.children}
          </div>
          {props.loading && <div className={styles.loader}><Loader /></div>}
        </div>
      </div>
    </ReactModal>
  )
}
Modal.defaultProps = {
  size: 'normal'
}
