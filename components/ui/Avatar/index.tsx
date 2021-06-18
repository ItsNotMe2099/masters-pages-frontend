import { signInSubmit } from "components/Auth/SignIn/actions";
import AvatarSvg from "components/svg/AvatarSvg";
import Button from 'components/ui/Button'
import Loader from "components/ui/Loader";
import { createRef, useEffect, useRef } from "react";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'

import ReactModal from 'react-modal'
import { useDispatch } from 'react-redux'


interface Props {
  size?: 'small' | 'normal' | 'large' | 'exSmall' | 'exExSmall' | 'square' | 'exSquare',
  image?: string
}

export default function Avatar({size, image}: Props) {

  return (
    <div className={`${styles.root} ${size === 'exSmall' && styles.exSmall} ${size === 'exExSmall' && styles.exExSmall}  ${size === 'square' && styles.square} ${size === 'exSquare' && styles.exSquare} ${size === 'small' && styles.small} ${size === 'normal' && styles.normal} ${size === 'large' && styles.large}`}>
      {image ? <img src={getMediaPath(image)}/> : <AvatarSvg/>}
    </div>
  )
}
Avatar.defaultProps = {
  size: 'large'
}
