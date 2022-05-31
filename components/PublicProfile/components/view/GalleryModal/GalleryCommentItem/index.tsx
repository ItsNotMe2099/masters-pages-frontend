import {default as React} from 'react'
import {IProfileGalleryComment} from 'types'
import styles from './index.module.scss'
import { useDispatch} from 'react-redux'
import {formatDistance} from 'date-fns'
import Avatar from 'components/ui/Avatar'

interface Props {
  model: IProfileGalleryComment
}

export default function GalleryCommentItem(props: Props) {
  const {model} = props
  const dispatch = useDispatch()


  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        <Avatar size={'exSmall'} image={model.profile.photo}/>
      </div>
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <div className={styles.title}>{model.profile.firstName} {model.profile.lastName}</div>
          <div className={styles.time}>{formatDistance(new Date(), new Date(model.createdAt))}</div>
        </div>
        <div className={styles.comment}>{model.content}</div>
      </div>
    </div>
  )
}
