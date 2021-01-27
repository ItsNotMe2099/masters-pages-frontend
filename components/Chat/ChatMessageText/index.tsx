import { fetchChat } from "components/Chat/actions";
import CloseIcon from "components/svg/CloseIcon";
import MarkIcon from "components/svg/MarkIcon";
import Avatar from "components/ui/Avatar";
import AvatarRound from "components/ui/AvatarRound";
import Modal from "components/ui/Modal";
import { IChat, IChatMessage } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import formatDistance from 'date-fns/formatDistance'

interface Props {
  message: string
  suffixColor?: 'black' | 'green'
  suffixIcon?: 'accepted' | 'declined' | 'system'
  suffixText?: string
  large?: boolean
}

export default function ChatMessageText({message, suffixIcon, suffixColor, suffixText, large}: Props) {

  const getIcon = () => {
      switch (suffixIcon) {
        case 'accepted':
          return <MarkIcon color={'#27C60D'}/>
          break;
        case 'declined':
          return <CloseIcon color={'#000000'}/>
          break;
      }


  }
  return (
   <div className={`${styles.root} ${large && styles.rootLarge}`}>
     <div className={styles.message}>{message}</div>
     {suffixText && <div className={`${styles.suffixText} ${suffixColor === 'green' && styles.suffixTextGreen}`}>{suffixText}</div>}
     {suffixIcon && <div className={styles.suffixIcon}>{getIcon()}</div>}
   </div>
  )
}
