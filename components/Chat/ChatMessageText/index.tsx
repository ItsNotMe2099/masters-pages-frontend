import { fetchChat } from "components/Chat/actions";
import CloseIcon from "components/svg/CloseIcon";
import MarkIcon from "components/svg/MarkIcon";
import Avatar from "components/ui/Avatar";
import AvatarRound from "components/ui/AvatarRound";
import Modal from "components/ui/Modal";
import { useState } from "react";
import { IChat, IChatMessage } from "types";
import { getMediaPath, isMediaImage, isMediaVideo } from "utils/media";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import VideoThumbnail from 'react-video-thumbnail';
import formatDistance from 'date-fns/formatDistance'
import FsLightbox from 'fslightbox-react';
import ChatMessage from 'components/Chat/ChatMessage'
interface Props {
  message: string
  files?: any[]
  suffixColor?: 'black' | 'green'
  suffixIcon?: 'accepted' | 'declined' | 'system'
  suffixText?: string
  large?: boolean
  isRight?: boolean
  size: 'small' | 'normal'
}

export default function ChatMessageText({message, files, size, isRight, suffixIcon, suffixColor, suffixText, large}: Props) {

  const [showGallery, setShowGallery] = useState(false);
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
  const handleImageClick = () =>{
    setShowGallery(showGallery => !showGallery);
  }

  const renderFile = (file) => {

    if(isMediaImage(file)){
      return <div className={styles.image} onClick={handleImageClick}><img src={getMediaPath(file)}/></div>
    }
    if(isMediaVideo(file)){
      return <div className={styles.image} onClick={handleImageClick}>
        <VideoThumbnail
          videoUrl={getMediaPath(file)}
          snapshotAtTime={2}
          cors={true}
          width={150}
          height={150}
        />
      </div>
    }
    return  <div className={styles.file}><img src={'/img/icons/file-document.svg'}/><a href={getMediaPath(file)} target={'blank'}>{file.split('/').pop()}</a></div>
  }

  const mediaFiles = files ? files.filter(file => isMediaImage(file.urlS3) || isMediaVideo(file.urlS3)) : [];
  return (
   <div className={`${styles.root}  ${size === 'small' && styles.rootSmall} ${large && styles.rootLarge} ${isRight && styles.rootRight}`}>
     <div className={styles.messageWrapper}>
     {files && files.length > 0 && <div className={styles.files}>{files.map(file => renderFile(file.urlS3))}</div>}
     {files && files.filter(file => isMediaImage(file.urlS3) || isMediaVideo(file.urlS3)).length > 0 &&
     <FsLightbox
       toggler={ showGallery }
       types={mediaFiles.map(file => isMediaImage(file.urlS3) ? 'image' : isMediaVideo(file.urlS3) ? 'video' : null)}
       sources={mediaFiles.map(file => getMediaPath(file.urlS3)) }
     />}
       {files && files.length > 0 && message && <div className={styles.filesSpacer}/>}
     <div className={styles.message}>{message}</div>
     </div>
     {suffixText && <div className={`${styles.suffixText} ${suffixColor === 'green' && styles.suffixTextGreen}`}>{suffixText}</div>}
     {suffixIcon && <div className={styles.suffixIcon}>{getIcon()}</div>}
   </div>
  )
}

ChatMessageText.defaultProps = {
  size: 'normal'
}
