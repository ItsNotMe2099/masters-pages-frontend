import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Loader from "components/ui/Loader";
import { createRef, ReactElement, useEffect, useRef } from "react";
import styles from './index.module.scss'

import ReactModal from 'react-modal'
import { useDispatch } from 'react-redux'
import ModalHeader from "./Header";


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
}

export default function Modal(props: Props) {
  const bodyRef = useRef(null);
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      zIndex: '4',
    },
    content : {
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

    if(!  bodyRef.current){
      return;
    }
    if(props.loading){
      bodyRef.current.style.visibility = 'hidden'
    }else{
      bodyRef.current.style.visibility = 'inherit'
    }
  }, [props.loading])
  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return styles.rootLarge;
      case 'medium':
        return styles.rootMedium;
      case 'normal':
      default:
        return styles.rootNormal;
    }
  }
  return (
    <ReactModal
    style={customStyles}
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    >
      <div className={styles.frame} >
        <div className={styles.overlay} onClick={props.onRequestClose}/>
      <div className={`${styles.root} ${getSizeClass(props.size)} ${props.className}`}>
        {props.onRequestClose && <div className={`${styles.close} ${props.closeClassName}`}>
          <Button closeBtn onClick={props.onRequestClose}></Button>
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
        {props.loading && <div className={styles.loader}><Loader/></div>}
      </div>
</div>
    </ReactModal>
  )
}
Modal.defaultProps = {
  size: 'normal'
}
