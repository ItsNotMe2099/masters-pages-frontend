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
  amount?:number
  size?: string
  top?: string,
  right?: string
  border?: boolean
}

export default function NotificationBadge({size, amount, border, right, top}: Props) {

  return (
    <div className={`${styles.root} ${border && styles.border} ${size === 'small' && styles.small} ${size === 'normal' && styles.normal}`} style={{ ...(right ? {right} : {}), ...(top ? {top} : {}), }}>
      {amount || ''}
    </div>
  )
}
NotificationBadge.defaultProps = {
  size: 'normal',
  border: true
}
