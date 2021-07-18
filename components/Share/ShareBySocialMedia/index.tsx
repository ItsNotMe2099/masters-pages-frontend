import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  FacebookShareButton, LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
} from 'react-share'
import {IRootState} from 'types'
import {useTranslation} from "i18n";
interface Props {
  customLink?: string
  subCategoryId?: number
}

export default function ShareBySocialMedia({subCategoryId, customLink}: Props) {
  const dispatch = useDispatch()
  const profile = useSelector((state: IRootState) => state.profile.currentProfile);
  const {t} = useTranslation('common')

  const shareUrl = `${ typeof window !== 'undefined' ? window?.location.protocol + "//" + window?.location.host : '/'}/${subCategoryId ? `sk${subCategoryId}` : `id${profile.id}${customLink ? `/${customLink}` : ''}`}`;

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('shareBySocialMedia')}</div>
      <div className={styles.buttons}>
        <div className={styles.shareButton}>
      <LinkedinShareButton url={shareUrl}>
        <img src="/img/icons/socials/share_linkedin.svg" alt="" />
      </LinkedinShareButton>
        </div>
        <div className={styles.shareButton}>
        <FacebookShareButton url={shareUrl}>
        <img src="/img/icons/socials/share_fb.svg" alt="" />
      </FacebookShareButton>
        </div>
        <div className={styles.shareButton}>
      <TwitterShareButton url={shareUrl}>
        <img src="/img/icons/socials/share_twitter.svg" alt="" />
      </TwitterShareButton>
        </div>
      </div>
    </div>
  )
}
