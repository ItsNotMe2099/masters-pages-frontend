import styles from './index.module.scss'
import { IRootState, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {default as React} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostList from 'components/Post/PostList'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile,
  skill?: SkillData
}
const CardPosts = (props: Props) => {
  const { profile, skill} = props
  const dispatch = useDispatch()
  const total = useSelector((state: IRootState) => state.profileGallery.total)
  const {t} = useTranslation('common')

  return (
    <Card className={styles.root} title={total > 0 ? t('cardPost.totalPosts', `${total}`) : t('menu.posts')}>
      <PostList profileId={profile.id}/>
    </Card>
  )
}

export default CardPosts
